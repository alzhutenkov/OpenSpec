#!/usr/bin/env node
// Offline, read-only validation of the separately maintained Russian docs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

export const rootSources = ['README.md', 'README_OLD.md', 'CONTRIBUTING.md', 'SECURITY.md', 'MAINTAINERS.md', 'install.md', 'CHANGELOG.md', 'openspec-parallel-merge-plan.md'];
export const extraSources = ['scripts/README.md', 'skills/README.md', 'website/README.md', '.changeset/README.md', '.devcontainer/README.md', '.github/workflows/README.md'];
export const excludedAreas = {
  'AGENTS.md': 'Машинные инструкции агента, не руководство пользователя.',
  '.agents/': 'Установленные машинные навыки и их служебные файлы.',
  '.codex/': 'Конфигурация агента.',
  'skills/openspec-*/': 'Исполняемые инструкции навыков; перевод меняет входные данные агента.',
  'schemas/': 'Машинные схемы и шаблоны генерации.',
  '.github/pull_request_template.md': 'Рабочий шаблон внешнего upstream, не отдельное руководство.',
  'src/ и test/': 'Код, тесты и фикстуры.',
  'openspec/': 'Спецификации и история разработки; локальный SDD уже написан по-русски.',
  'website/content/': 'Сгенерированные страницы сайта; источник в docs-lab/.',
  'docs/ru/': 'Сам перевод, не набор английских источников.',
};
export function git(root, args) {
  return execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
}
export function discoverSources(root) {
  return git(root, ['ls-files', '-z']).split('\0').filter(s => s.endsWith('.md') && (
    s.startsWith('docs-lab/') || (s.startsWith('docs/') && !s.startsWith('docs/ru/')) || rootSources.includes(s) || extraSources.includes(s)
  )).sort();
}
export function translationPath(source) {
  return path.posix.join('docs/ru', rootSources.includes(source) ? 'project' : '', source);
}
export function canonical(source, text) {
  const normalized = text.replace(/\r\n/g, '\n');
  return source === 'README.md' ? normalized.replace(/<!-- russian-docs:start -->\n[\s\S]*?<!-- russian-docs:end -->\n\n?/, '') : normalized;
}
export function safeFile(root, name) {
  if (typeof name !== 'string' || /[\\\0]/.test(name) || path.posix.isAbsolute(name) || /^[a-z]:/i.test(name) || name.split('/').some(s => !s || s === '.' || s === '..')) return null;
  let current = root;
  try {
    for (const part of name.split('/')) {
      if (!fs.readdirSync(current).includes(part)) return null;
      current = path.join(current, part);
      if (fs.lstatSync(current).isSymbolicLink()) return null;
    }
    return current;
  } catch { return null; }
}
function withoutFences(text) {
  let fence = null;
  return text.split('\n').map(line => {
    const m = line.match(/^\s*(`{3,}|~{3,})/);
    if (m) {
      if (!fence) fence = m[1];
      else if (m[1][0] === fence[0] && m[1].length >= fence.length) fence = null;
      return '';
    }
    return fence ? '' : line;
  }).join('\n');
}
function hasSourceIncompleteNotice(text) {
  const visible = withoutFences(text.replace(/\r\n/g, '\n')).replace(/<!--[\s\S]*?-->/g, '');
  return /^>\s+Оригинал этой страницы ещё не завершён\./m.test(visible);
}
export function headingIds(text) {
  const ids = new Set(), seen = new Map();
  for (const line of withoutFences(text).split('\n')) {
    for (const m of line.matchAll(/<(?:a|h[1-6])\b[^>]*\b(?:id|name)=["']([^"']+)["']/gi)) ids.add(m[1]);
    const h = line.match(/^ {0,3}#{1,6}\s+(.+?)(?:\s+#+)?\s*$/);
    if (!h) continue;
    const slug = h[1].replace(/<[^>]+>/g, '').replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
      .toLowerCase().replace(/[^\p{L}\p{N}\p{M}_\-\s]/gu, '').replace(/\s/g, '-');
    let id = slug, n = seen.get(slug) ?? 0;
    while (ids.has(id)) id = `${slug}-${++n}`;
    seen.set(slug, n); ids.add(id);
  }
  return ids;
}
export function localLinks(text) {
  const clean = withoutFences(text).replace(/<!--[\s\S]*?-->/g, '')
    .replace(/(?<!`)(`+)(?!`)[\s\S]*?\1(?!`)/g, '');
  const links = [];
  for (const m of clean.matchAll(/!?\[[^\]\n]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+["'][^\n]*?["'])?\s*\)/g)) links.push(m[1] ?? m[2]);
  for (const m of clean.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) links.push(m[1]);
  for (const m of clean.matchAll(/^\s{0,3}\[[^\]]+\]:\s*<?([^\s>]+)>?/gm)) links.push(m[1]);
  return links;
}
const isExternal = href => /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href);
function resolveLink(owner, href) {
  const hash = href.indexOf('#');
  const name = (hash < 0 ? href : href.slice(0, hash)).split('?')[0];
  const fragment = hash < 0 ? '' : decodeURIComponent(href.slice(hash + 1));
  const decoded = decodeURIComponent(name);
  if (decoded.startsWith('/') || decoded.includes('\\')) throw new Error('Недопустимый локальный URL');
  const target = name ? path.posix.normalize(path.posix.join(path.posix.dirname(owner), decoded)) : owner;
  return { target, fragment, name };
}
export function checkRussianDocs(root) {
  const findings = [];
  const add = (type, source, detail, severity) => findings.push({ type, source, detail, ...(severity ? { severity } : {}) });
  let manifest;
  try { manifest = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'ru', 'translation-manifest.json'), 'utf8')); }
  catch (error) { return { entries: 0, findings: [{ type: 'invalid-manifest', source: 'translation-manifest.json', detail: error.message }] }; }
  if (!manifest || manifest.version !== 1 || !Array.isArray(manifest.entries)) return { entries: 0, findings: [{ type: 'invalid-manifest', source: 'translation-manifest.json', detail: 'Ожидается version: 1 и массив entries.' }] };
  const sources = new Set(discoverSources(root)), registered = new Map(), targets = new Set();
  const docs = new Set();
  for (const name of ['README.md', 'TRANSLATION_RULES.md', 'UPSTREAM_SYNC.md', 'GLOSSARY.md', 'VALIDATION.md', 'EXAMPLE_NOTES.md']) {
    const doc = path.posix.join('docs/ru', name);
    if (safeFile(root, doc)) docs.add(doc);
  }
  for (const entry of manifest.entries) {
    if (!entry || typeof entry !== 'object' || typeof entry.source !== 'string' || typeof entry.translation !== 'string') { add('invalid-manifest', '', 'Запись должна содержать строковые source и translation.'); continue; }
    const { source, translation, status, sourceCommit, sourceBlob } = entry;
    if (registered.has(source)) add('invalid-manifest', source, 'Дублирующийся источник.');
    registered.set(source, entry);
    if (targets.has(translation.toLowerCase())) add('invalid-manifest', source, 'Дублирующийся путь перевода, включая регистр.');
    targets.add(translation.toLowerCase());
    const translationFile = safeFile(root, translation);
    if (translation !== translationPath(source) || !translationFile) {
      if (translation !== translationPath(source)) add('invalid-manifest', source, 'Путь перевода не соответствует структуре комплекта.');
      if (!translationFile) add('missing-translation', source, translation);
    } else docs.add(translation);
    if (!['pending', 'draft', 'reviewed', 'source-incomplete'].includes(status)) add('invalid-manifest', source, 'Неизвестное состояние.');
    else if (status === 'source-incomplete') {
      add('source-incomplete', source, translation, 'warning');
      if (translationFile && !hasSourceIncompleteNotice(fs.readFileSync(translationFile, 'utf8'))) {
        add('missing-source-notice', source, 'Добавьте видимую пометку: > Оригинал этой страницы ещё не завершён.');
      }
    } else if (status !== 'reviewed') add(status, source, translation);
    const file = safeFile(root, source);
    if (!sources.has(source) || !file) { add('missing-source', source, 'Оригинал исчез или вышел за согласованную область; перевод сохранён.'); continue; }
    const current = canonical(source, fs.readFileSync(file, 'utf8'));
    if (/<!--\s*(?:Skeleton|Partial draft|WIP|PARKED)|TODO: this page is being rewritten/i.test(current) && status !== 'source-incomplete') add('unmarked-source-incomplete', source, 'Укажите source-incomplete в реестре и добавьте видимую пометку на русской странице.');
    if ((status === 'pending' || status === 'draft') && sourceCommit == null && sourceBlob == null) continue;
    if (!/^[0-9a-f]{40}$/.test(sourceCommit ?? '') || !/^[0-9a-f]{40}$/.test(sourceBlob ?? '')) { add('invalid-manifest', source, 'Нужны полные SHA коммита и blob.'); continue; }
    try {
      const actual = git(root, ['rev-parse', `${sourceCommit}:${source}`]).trim();
      if (actual !== sourceBlob) { add('invalid-manifest', source, 'sourceBlob не соответствует sourceCommit:source.'); continue; }
      const snapshot = git(root, ['show', `${sourceCommit}:${source}`]);
      if (current !== canonical(source, snapshot)) add('stale', source, `Сверьте перевод с ${sourceCommit}.`);
    } catch { add('invalid-manifest', source, 'Git не содержит проверенной версии источника. Получите полную историю.'); }
  }
  for (const source of sources) if (!registered.has(source)) add('uncovered', source, 'Новый источник без записи реестра.');
  for (const entry of registered.values()) {
    const sourceFile = safeFile(root, entry.source), translatedFile = safeFile(root, entry.translation);
    if (!sourceFile || !translatedFile) continue;
    const translatedLinks = new Set(localLinks(fs.readFileSync(translatedFile, 'utf8')));
    for (const href of localLinks(canonical(entry.source, fs.readFileSync(sourceFile, 'utf8')))) {
      if (isExternal(href)) continue;
      try {
        const { target, fragment, name } = resolveLink(entry.source, href);
        const destination = registered.get(target);
        if (!destination || !safeFile(root, destination.translation)) continue;
        const expected = (name ? path.posix.relative(path.posix.dirname(entry.translation), destination.translation) : '') + (fragment ? `#${fragment}` : '');
        if (!translatedLinks.has(expected)) add('untranslated-link', entry.source, `Отсутствует русский переход ${expected}.`);
      } catch { /* Invalid original links are reported on the translated page. */ }
    }
  }
  for (const doc of docs) {
    for (const href of localLinks(fs.readFileSync(safeFile(root, doc), 'utf8'))) {
      if (isExternal(href)) continue;
      try {
        const { target, fragment } = resolveLink(doc, href);
        const file = safeFile(root, target);
        if (!file) { add('broken-link', doc, href); continue; }
        if (fragment && target.endsWith('.md') && !headingIds(fs.readFileSync(file, 'utf8')).has(fragment)) add('broken-anchor', doc, href);
      } catch { add('broken-link', doc, href); }
    }
  }
  return { entries: manifest.entries.length, findings };
}
export function blockingFindings(report) {
  return report.findings.filter(finding => finding.severity !== 'warning');
}
const invoked = process.argv[1] && fs.existsSync(process.argv[1]) && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url));
if (invoked) {
  const flags = process.argv.slice(2);
  if (flags.some(flag => !['--strict', '--json'].includes(flag))) { console.error('Usage: node scripts/check-russian-docs.mjs [--strict] [--json]'); process.exitCode = 2; }
  else {
    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
    const report = checkRussianDocs(root);
    const errors = blockingFindings(report);
    if (flags.includes('--json')) console.log(JSON.stringify(report, null, 2));
    else {
      console.log(`Документов в реестре: ${report.entries}; ошибок: ${errors.length}; предупреждений: ${report.findings.length - errors.length}`);
      for (const f of report.findings) console.log(`${f.severity === 'warning' ? '[предупреждение] ' : ''}${f.type}: ${f.source}: ${f.detail}`);
    }
    if ((flags.includes('--strict') && errors.length) || errors.some(f => f.type === 'invalid-manifest')) process.exitCode = 1;
  }
}
