import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { checkRussianDocs, blockingFindings, canonical, headingIds, localLinks, translationPath, manifestPath } from './check-russian-docs.mjs';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'russian docs '));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const write = (name, text) => { const file = path.join(root, ...name.split('/')); fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text); };
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  git('init', '-b', 'main');
  git('config', 'user.name', 'Docs fixture'); git('config', 'user.email', 'docs@example.invalid');
  git('config', 'commit.gpgsign', 'false'); git('config', 'core.autocrlf', 'false');
  write('docs/guide.md', '# Guide\n\nHello.\n');
  git('add', '.'); git('commit', '-m', 'Source baseline');
  const entry = (source) => ({ source, translation: translationPath(source), status: 'reviewed', sourceCommit: git('rev-parse', 'HEAD'), sourceBlob: git('rev-parse', `HEAD:${source}`) });
  const manifest = { version: 1, entries: [entry('docs/guide.md')] };
  write('docs/ru/docs/guide.md', '<a id="guide"></a>\n# Руководство\n\nПривет.\n');
  const save = () => write(manifestPath, JSON.stringify(manifest));
  save();
  return { root, write, git, manifest, entry, save, check: () => checkRussianDocs(root) };
}
const types = report => report.findings.map(f => f.type);

test('matching versions work inside a path with spaces', t => {
  const f = fixture(t);
  assert.deepEqual(f.check(), { entries: 1, findings: [] });
});
test('root and nested translations mirror source paths without a project prefix', () => {
  assert.equal(translationPath('README.md'), 'docs/ru/README.md');
  assert.equal(translationPath('CONTRIBUTING.md'), 'docs/ru/CONTRIBUTING.md');
  assert.equal(translationPath('docs/README.md'), 'docs/ru/docs/README.md');
  assert.equal(translationPath('.github/workflows/README.md'), 'docs/ru/.github/workflows/README.md');
});
test('changes, additions, renames and deletions remain visible without deleting translations', t => {
  const f = fixture(t);
  f.write('docs/guide.md', '# Guide\n\nChanged.\n');
  assert.ok(types(f.check()).includes('stale'));
  f.write('docs/new.md', '# New\n'); f.git('add', 'docs/new.md');
  assert.ok(types(f.check()).includes('uncovered'));
  f.git('mv', 'docs/guide.md', 'docs/renamed.md');
  const report = f.check();
  assert.ok(report.findings.some(v => v.type === 'missing-source' && v.source === 'docs/guide.md'));
  assert.ok(report.findings.some(v => v.type === 'uncovered' && v.source === 'docs/renamed.md'));
  fs.unlinkSync(path.join(f.root, 'docs', 'renamed.md')); f.git('add', '-u');
  assert.ok(types(f.check()).includes('missing-source'));
  assert.ok(fs.existsSync(path.join(f.root, 'docs', 'ru', 'docs', 'guide.md')));
});
test('missing translations, drafts, pending and unmarked incomplete originals block readiness', t => {
  const f = fixture(t);
  for (const status of ['pending', 'draft', 'source-incomplete']) {
    f.manifest.entries[0].status = status; f.save();
    assert.ok(types(f.check()).includes(status));
  }
  fs.unlinkSync(path.join(f.root, 'docs', 'ru', 'docs', 'guide.md'));
  assert.ok(types(f.check()).includes('missing-translation'));
  f.write('docs/guide.md', '# Guide\n<!-- Skeleton -->\n');
  f.manifest.entries[0].status = 'reviewed'; f.save();
  assert.ok(types(f.check()).includes('unmarked-source-incomplete'));
});
test('an explicitly marked incomplete source passes strict mode and remains visible as a warning', t => {
  const f = fixture(t);
  f.write('docs/guide.md', '# Guide\n<!-- Skeleton -->\n');
  f.git('add', 'docs/guide.md'); f.git('commit', '-m', 'Incomplete original');
  f.manifest.entries[0] = { ...f.entry('docs/guide.md'), status: 'source-incomplete' }; f.save();
  f.write('docs/ru/docs/guide.md', '> Оригинал этой страницы ещё не завершён.\r\n\r\n# Руководство\r\n');
  const report = f.check();
  assert.deepEqual(blockingFindings(report), []);
  assert.equal(report.findings.length, 1);
  assert.equal(report.findings[0].type, 'source-incomplete');
  assert.equal(report.findings[0].severity, 'warning');
  const source = fileURLToPath(new URL('./check-russian-docs.mjs', import.meta.url));
  const script = path.join(f.root, 'scripts', 'check-russian-docs.mjs'); fs.mkdirSync(path.dirname(script)); fs.copyFileSync(source, script);
  const before = f.git('status', '--porcelain');
  for (const flags of [['--strict', '--json'], ['--strict'], []]) {
    const run = spawnSync(process.execPath, [script, ...flags], { encoding: 'utf8' });
    assert.equal(run.status, 0, run.stderr);
    if (flags.includes('--json')) assert.equal(JSON.parse(run.stdout).findings[0].severity, 'warning');
    else assert.match(run.stdout, /ошибок: 0; предупреждений: 1/);
  }
  assert.equal(f.git('status', '--porcelain'), before);
});
test('missing or hidden notices and other errors still block an incomplete source', t => {
  const f = fixture(t);
  f.write('docs/guide.md', '# Guide\n<!-- Skeleton -->\n');
  f.git('add', 'docs/guide.md'); f.git('commit', '-m', 'Incomplete original');
  const entry = { ...f.entry('docs/guide.md'), status: 'source-incomplete' };
  f.manifest.entries[0] = { ...entry }; f.save();
  const notice = '> Оригинал этой страницы ещё не завершён.';
  for (const text of ['# Руководство\n', `<!-- ${notice} -->\n# Руководство\n`, ['```text', notice, '```', '# Руководство', ''].join('\n')]) {
    f.write('docs/ru/docs/guide.md', text);
    assert.ok(blockingFindings(f.check()).some(finding => finding.type === 'missing-source-notice'));
  }
  f.write('docs/ru/docs/guide.md', `${notice}\n\n# Руководство\n`);
  assert.deepEqual(blockingFindings(f.check()), []);
  f.manifest.entries[0].status = 'reviewed'; f.save();
  assert.ok(types(f.check()).includes('unmarked-source-incomplete'));
  f.manifest.entries[0] = { ...entry }; f.save();
  f.write('docs/ru/docs/guide.md', `${notice}\n\n# Руководство\n[Ссылка](missing.md)\n`);
  assert.ok(blockingFindings(f.check()).some(finding => finding.type === 'broken-link'));
  f.write('docs/ru/docs/guide.md', `${notice}\n\n# Руководство\n`);
  f.write('docs/guide.md', '# Guide\n<!-- Skeleton -->\nNew upstream text.\n');
  assert.ok(blockingFindings(f.check()).some(finding => finding.type === 'stale'));
  f.manifest.entries[0].sourceBlob = '0'.repeat(40); f.save();
  assert.ok(blockingFindings(f.check()).some(finding => finding.type === 'invalid-manifest'));
});
test('invalid records, duplicate paths, SHA mismatch and unsafe paths are rejected', t => {
  const f = fixture(t), original = { ...f.manifest.entries[0] };
  for (const mutate of [
    () => f.manifest.entries.push({ ...original }),
    () => f.manifest.entries.push(null),
    () => { f.manifest.entries[0].sourceCommit = 'abc'; },
    () => { f.manifest.entries[0].sourceBlob = '0'.repeat(40); },
    () => { f.manifest.entries[0].translation = '../outside.md'; },
  ]) {
    f.manifest.entries = [{ ...original }]; mutate(); f.save();
    assert.ok(types(f.check()).includes('invalid-manifest'));
  }
});
test('links, images, anchors and exact filename case are checked; code examples are ignored', t => {
  const f = fixture(t);
  f.write('docs/ru/docs/guide.md', '# Русский\n[Код](#русский)\n```md\n[Example](absent.md)\n```\n`[Example](absent.md)`\n');
  assert.deepEqual(f.check().findings, []);
  for (const link of ['[x](absent.md)', '![x](missing.png)', '[x](#absent)', '[x](Guide.md)']) {
    f.write('docs/ru/docs/guide.md', `# Русский\n${link}\n`);
    assert.ok(f.check().findings.some(v => ['broken-link', 'broken-anchor'].includes(v.type)));
  }
});
test('CRLF and the marked README button do not make English content stale', t => {
  const f = fixture(t);
  f.write('docs/guide.md', '# Guide\r\n\r\nHello.\r\n');
  assert.deepEqual(f.check().findings, []);
  f.write('README.md', '# Project\n\nEnglish.\n'); f.git('add', 'README.md'); f.git('commit', '-m', 'Add README');
  f.manifest.entries.push(f.entry('README.md')); f.write('docs/ru/README.md', '# Проект\n'); f.save();
  const withButton = '# Project\n\n<!-- russian-docs:start -->\n[Русский](docs/ru/README.md)\n<!-- russian-docs:end -->\n\nEnglish.\n';
  f.write('README.md', withButton.replace(/\n/g, '\r\n'));
  assert.deepEqual(f.check().findings, []);
  assert.equal(canonical('README.md', withButton), '# Project\n\nEnglish.\n');
  f.write('README.md', withButton.replace('English.', 'New English.'));
  assert.ok(types(f.check()).includes('stale'));
});
test('Unicode, duplicate and explicit heading IDs; inline and multiline code masks', () => {
  assert.deepEqual([...headingIds('# Привет!\n# Привет!\n<a id="old"></a>\n## New\n')], ['привет', 'привет-1', 'old', 'new']);
  assert.deepEqual(localLinks('[`x`](real.md)\n`[x](fake.md)`\n``multiline\n[x](fake.md)``\n```md\n[x](fake.md)\n```'), ['real.md']);
});
test('an English destination is reported even if the original file exists', t => {
  const f = fixture(t);
  f.write('docs/guide.md', '# Guide\n\n[Self](guide.md#guide)\n');
  f.git('add', 'docs/guide.md'); f.git('commit', '-m', 'Add link'); f.manifest.entries[0] = f.entry('docs/guide.md'); f.save();
  f.write('docs/ru/docs/guide.md', '# Руководство\n[Оригинал](../../guide.md#guide)\n');
  assert.ok(types(f.check()).includes('untranslated-link'));
  f.write('docs/ru/docs/guide.md', '<a id="guide"></a>\n# Руководство\n[Здесь](guide.md#guide)\n');
  assert.deepEqual(f.check().findings, []);
});
test('a real upstream merge preserves both histories and reports only affected docs', t => {
  const f = fixture(t);
  for (const name of ['old', 'stable']) f.write(`docs/${name}.md`, `# ${name}\n`);
  f.write('README.md', '# Project\n\nIntro\n\nFooter\n'); f.git('add', '.'); f.git('commit', '-m', 'Source set');
  for (const source of ['docs/old.md', 'docs/stable.md', 'README.md']) {
    f.manifest.entries.push(f.entry(source)); f.write(translationPath(source), '# Перевод\n');
  }
  f.manifest.entries[0] = f.entry('docs/guide.md'); f.save();
  const baseline = f.git('rev-parse', 'HEAD');
  f.git('add', '.'); f.git('commit', '-m', 'Translations');
  f.git('checkout', '-b', 'simulated-upstream', baseline);
  f.write('docs/guide.md', '# Guide\n\nUpdated upstream.\n'); f.write('docs/new.md', '# New\n');
  f.git('mv', 'docs/old.md', 'docs/renamed.md');
  f.write('README.md', '# Project\n\nUpstream intro\n\nFooter\n'); f.git('add', '.'); f.git('commit', '-m', 'Upstream docs');
  const upstream = f.git('rev-parse', 'HEAD'); f.git('checkout', 'main');
  const block = '<!-- russian-docs:start -->\nРусская кнопка\n<!-- russian-docs:end -->\n';
  f.write('README.md', `# Project\n\n${block}\nIntro\n\nFooter\n`); f.git('add', 'README.md'); f.git('commit', '-m', 'Russian entry');
  assert.throws(() => f.git('merge', 'simulated-upstream'));
  f.write('README.md', `# Project\n\n${block}\nUpstream intro\n\nFooter\n`);
  f.git('add', 'README.md'); f.git('commit', '-m', 'Resolve README preserving upstream and Russian entry');
  f.git('merge-base', '--is-ancestor', baseline, 'HEAD'); f.git('merge-base', '--is-ancestor', upstream, 'HEAD');
  const report = f.check();
  for (const [type, source] of [['stale', 'docs/guide.md'], ['stale', 'README.md'], ['uncovered', 'docs/new.md'], ['uncovered', 'docs/renamed.md'], ['missing-source', 'docs/old.md']]) assert.ok(report.findings.some(v => v.type === type && v.source === source), `${type}: ${source}`);
  assert.ok(!report.findings.some(v => v.source === 'docs/stable.md'));
  assert.ok(fs.readFileSync(path.join(f.root, 'README.md'), 'utf8').includes(block));
});
test('CLI is read-only and strict mode has a failing exit status for unfinished docs', t => {
  const f = fixture(t);
  f.manifest.entries[0].status = 'draft'; f.save();
  const source = fileURLToPath(new URL('./check-russian-docs.mjs', import.meta.url));
  const script = path.join(f.root, 'scripts', 'check-russian-docs.mjs'); fs.mkdirSync(path.dirname(script)); fs.copyFileSync(source, script);
  const before = f.git('status', '--porcelain');
  const advisory = spawnSync(process.execPath, [script, '--json'], { encoding: 'utf8' });
  const strict = spawnSync(process.execPath, [script, '--strict', '--json'], { encoding: 'utf8' });
  assert.equal(advisory.status, 0); assert.equal(strict.status, 1);
  assert.equal(JSON.parse(strict.stdout).findings[0].type, 'draft');
  assert.equal(f.git('status', '--porcelain'), before);
});
