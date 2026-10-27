#!/usr/bin/env node
// Read-only, dependency-free translation audit. No network or Git mutations.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const rootSources = ['README.md', 'README_OLD.md', 'CONTRIBUTING.md', 'SECURITY.md', 'MAINTAINERS.md', 'install.md', 'CHANGELOG.md', 'openspec-parallel-merge-plan.md'];
export const extraSources = ['scripts/README.md', 'skills/README.md', 'website/README.md', '.changeset/README.md', '.devcontainer/README.md', '.github/workflows/README.md'];
export const excludedAreas = {
  'AGENTS.md': 'Машинные инструкции', '.agents/': 'Инструкции навыков', '.codex/': 'Конфигурация агента',
  'skills/openspec-*/': 'Устанавливаемые инструкции навыков', 'schemas/': 'Машинные шаблоны',
  '.github/PULL_REQUEST_TEMPLATE.md': 'Рабочий шаблон PR', 'openspec/': 'Спецификации и история изменений',
  'src/': 'Исходный код', 'test/': 'Тестовые фикстуры', 'website/content/': 'Сгенерированные страницы',
  'docs/ru/': 'Переводы не являются источниками',
};
export function git(root, args, options = {}) {
  return execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, ...options });
}
export function discoverSources(root) {
  return git(root, ['ls-files', '-z']).split('\0').filter(p => p.endsWith('.md') &&
    ((p.startsWith('docs/') && !p.startsWith('docs/ru/')) || p.startsWith('docs-lab/') || rootSources.includes(p) || extraSources.includes(p))).sort();
}
export function translationPath(source) {
  return path.posix.join('docs/ru', rootSources.includes(source) ? 'project' : '', source);
}
export function canonical(source, text) {
  let result = text.replace(/\r\n/g, '\n');
  if (source === 'README.md') result = result.replace(/<!-- russian-docs:start -->\n[\s\S]*?<!-- russian-docs:end -->\n\n?/g, '');
  return result;
}
function safeFile(root, name) {
  if (typeof name !== 'string' || name.includes('\\') || name.includes('\0') || path.posix.isAbsolute(name) || name.split('/').some(p => !p || p === '.' || p === '..')) throw new Error(`Недопустимый путь: ${name}`);
  let cursor = fs.realpathSync(root);
  for (const part of name.split('/')) {
    if (!fs.existsSync(cursor)) break;
    const actual = fs.readdirSync(cursor);
    if (!actual.includes(part)) {
      if (actual.some(p => p.toLowerCase() === part.toLowerCase())) throw new Error(`Неверный регистр пути: ${name}`);
      return path.resolve(root, ...name.split('/'));
    }
    cursor = path.join(cursor, part);
    if (fs.lstatSync(cursor).isSymbolicLink()) throw new Error(`Символическая ссылка в пути: ${name}`);
  }
  return path.resolve(root, ...name.split('/'));
}
export function headingIds(text) {
  const ids = new Set();
  const counts = new Map();
  let fence = null;
  for (const line of text.split(/\r?\n/)) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) { if (!fence) fence = marker[1][0]; else if (fence === marker[1][0]) fence = null; continue; }
    if (fence) continue;
    for (const match of line.matchAll(/<(?:a|h[1-6])\b[^>]*\b(?:id|name)=["']([^"']+)["']/g)) ids.add(match[1]);
    const heading = line.match(/^ {0,3}#{1,6}\s+(.+?)\s*#*\s*$/);
    if (!heading) continue;
    let id = heading[1].replace(/<[^>]*>/g, '').replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').toLowerCase().replace(/[^\p{L}\p{N}\p{M}\s_-]/gu, '').replace(/\s/g, '-');
    const count = counts.get(id) ?? 0;
    counts.set(id, count + 1);
    if (count) id += `-${count}`;
    ids.add(id);
  }
  return ids;
}
export function localLinks(text) {
  const body = text.replace(/^\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1\s*$/gm, '').replace(/<!--[^]*?-->/g, '').replace(/(?<!`)(`+)(?!`)[\s\S]*?\1(?!`)/g, '');
  const links = [];
  for (const match of body.matchAll(/!?\[[^\]]*\]\((<[^>]+>|[^\s)]+)(?:\s+["'][^]*?["'])?\)|\b(?:href|src)=["']([^"']+)["']/g)) links.push((match[1] ?? match[2]).replace(/^<|>$/g, ''));
  for (const match of body.matchAll(/^\s*\[[^\]]+\]:\s*(\S+)/gm)) links.push(match[1].replace(/^<|>$/g, ''));
  return links;
}
export function checkRussianDocs(root) {
  const findings = [];
  const add = (type, source, detail) => findings.push({ type, source, detail });
  let manifest;
  try { manifest = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'ru', 'translation-manifest.json'), 'utf8')); }
  catch (error) { add('invalid-manifest', '', error.message); return { entries: 0, findings }; }
  if (manifest.version !== 1 || !Array.isArray(manifest.entries)) {
    add('invalid-manifest', '', 'Ожидаются version: 1 и entries: []'); return { entries: 0, findings };
  }
  const sources = new Set(discoverSources(root));
  const seenSources = new Set();
  const seenTranslations = new Set();
  const entriesBySource = new Map(manifest.entries.filter(e => e && typeof e === 'object').map(e => [e.source, e]));
  const translationFiles = new Set(['docs/ru/README.md', 'docs/ru/TRANSLATION_RULES.md', 'docs/ru/UPSTREAM_SYNC.md', 'docs/ru/GLOSSARY.md', 'docs/ru/VALIDATION.md', 'docs/ru/EXAMPLE_NOTES.md']);
  for (const entry of manifest.entries) {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      add('invalid-manifest', '', 'Запись перевода должна быть объектом'); continue;
    }
    const { source, translation, sourceCommit, sourceBlob, status } = entry;
    try {
      if (seenSources.has(source) || seenTranslations.has(translation?.toLowerCase())) throw new Error('Повторяющийся оригинал или перевод');
      seenSources.add(source); seenTranslations.add(translation?.toLowerCase());
      if (translation !== translationPath(source)) throw new Error(`Ожидаемый путь перевода: ${translationPath(source)}`);
      const originalFile = safeFile(root, source);
      const translatedFile = safeFile(root, translation);
      translationFiles.add(translation);
      if (!sources.has(source) || !fs.existsSync(originalFile)) { add('missing-source', source, translation); continue; }
      if (!fs.existsSync(translatedFile)) add('missing-translation', source, translation);
      else {
        const translatedLinks = new Set(localLinks(fs.readFileSync(translatedFile, 'utf8')));
        for (const href of localLinks(canonical(source, fs.readFileSync(originalFile, 'utf8')))) {
          if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) continue;
          const [name, fragment] = href.split('#');
          const targetSource = name ? path.posix.normalize(path.posix.join(path.posix.dirname(source), name)) : source;
          const targetEntry = entriesBySource.get(targetSource);
          if (!targetEntry || !fs.existsSync(safeFile(root, targetEntry.translation))) continue;
          const expected = (name ? path.posix.relative(path.posix.dirname(translation), targetEntry.translation) : '') + (fragment ? `#${fragment}` : '');
          if (!translatedLinks.has(expected)) add('untranslated-link', source, `Ожидается русский переход: ${expected}`);
        }
      }
      if (!['pending', 'draft', 'reviewed', 'source-incomplete'].includes(status)) throw new Error(`Неизвестное состояние: ${status}`);
      if (status !== 'reviewed') add(status, source, translation);
      if (!sourceCommit || !sourceBlob) {
        if (status === 'reviewed' || status === 'source-incomplete') throw new Error('Нет проверенной версии оригинала');
        continue;
      }
      if (!/^[a-f0-9]{40}$/.test(sourceCommit) || !/^[a-f0-9]{40}$/.test(sourceBlob)) throw new Error('SHA должен содержать 40 строчных шестнадцатеричных символов');
      let verified;
      try {
        const actualBlob = git(root, ['rev-parse', `${sourceCommit}:${source}`]).trim();
        if (actualBlob !== sourceBlob) throw new Error('Blob не соответствует коммиту');
        verified = git(root, ['show', `${sourceCommit}:${source}`]);
      } catch (error) { throw new Error(`Не удаётся проверить версию оригинала: ${error.message}`); }
      if (canonical(source, fs.readFileSync(originalFile, 'utf8')) !== canonical(source, verified)) add('stale', source, translation);
    } catch (error) { add('invalid-manifest', source ?? '', error.message); }
  }
  for (const source of sources) if (!seenSources.has(source)) add('uncovered', source, 'Новый оригинал отсутствует в реестре');
  for (const name of translationFiles) {
    let file;
    try { file = safeFile(root, name); } catch (error) { add('invalid-path', name, error.message); continue; }
    if (!fs.existsSync(file)) continue;
    for (const href of localLinks(fs.readFileSync(file, 'utf8'))) {
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) continue;
      try {
        const parsed = new URL(href, 'https://local.invalid/');
        const relativeTarget = href.split(/[?#]/)[0];
        if (relativeTarget.startsWith('/')) throw new Error(`Абсолютная локальная ссылка: ${href}`);
        const target = relativeTarget ? path.resolve(path.dirname(file), decodeURIComponent(relativeTarget)) : file;
        const rel = path.relative(root, target).split(path.sep).join('/');
        if (rel.startsWith('../')) throw new Error(`Ссылка вне репозитория: ${href}`);
        safeFile(root, rel);
        if (!fs.existsSync(target)) throw new Error(`Отсутствует цель: ${href}`);
        if (parsed.hash && path.extname(target) === '.md' && !headingIds(fs.readFileSync(target, 'utf8')).has(decodeURIComponent(parsed.hash.slice(1)))) throw new Error(`Отсутствует якорь: ${href}`);
      } catch (error) { add('broken-link', name, error.message); }
    }
  }
  return { entries: manifest.entries.length, findings };
}
const direct = process.argv[1] && fs.existsSync(process.argv[1]) && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url));
if (direct) {
  const args = process.argv.slice(2);
  const unknown = args.filter(a => !['--strict', '--json'].includes(a));
  if (unknown.length) { console.error(`Неизвестные параметры: ${unknown.join(', ')}`); process.exitCode = 2; }
  else {
    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
    const report = checkRussianDocs(root);
    if (args.includes('--json')) console.log(JSON.stringify(report, null, 2));
    else {
      console.log(`Документов в реестре: ${report.entries}. Замечаний: ${report.findings.length}.`);
      for (const item of report.findings) console.log(`[${item.type}] ${item.source}: ${item.detail}`);
    }
    if (args.includes('--strict') && report.findings.length) process.exitCode = 1;
    if (report.findings.some(f => f.type === 'invalid-manifest')) process.exitCode = 1;
  }
}
