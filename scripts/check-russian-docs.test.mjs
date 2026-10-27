import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { checkRussianDocs, git, headingIds, localLinks } from './check-russian-docs.mjs';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'russian docs '));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  git(root, ['init', '-b', 'main']);
  git(root, ['config', 'user.name', 'Documentation test']);
  git(root, ['config', 'user.email', 'docs@example.invalid']);
  git(root, ['config', 'commit.gpgsign', 'false']);
  git(root, ['config', 'core.autocrlf', 'false']);
  const write = (name, body) => { const target = path.join(root, ...name.split('/')); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, body); };
  write('docs/guide.md', '# Guide\n\nHello.\n');
  git(root, ['add', '.']); git(root, ['commit', '-m', 'Original']);
  const commit = git(root, ['rev-parse', 'HEAD']).trim();
  const entry = { source: 'docs/guide.md', translation: 'docs/ru/docs/guide.md', sourceCommit: commit, sourceBlob: git(root, ['rev-parse', 'HEAD:docs/guide.md']).trim(), status: 'reviewed' };
  write(entry.translation, '# Руководство\n\nПривет.\n');
  const save = entries => write('docs/ru/translation-manifest.json', JSON.stringify({ version: 1, entries }));
  save([entry]);
  return { root, write, entry, save, check: () => checkRussianDocs(root).findings, commit };
}
test('complete matching translation passes in path containing spaces', t => {
  const f = fixture(t); assert.deepEqual(f.check(), []);
});
test('reports changed, new, absent and renamed originals without mutating translations', t => {
  const f = fixture(t);
  f.write('docs/guide.md', '# Guide\n\nChanged.\n');
  assert.equal(f.check()[0].type, 'stale');
  f.write('docs/new.md', '# New\n'); git(f.root, ['add', 'docs/new.md']);
  assert.ok(f.check().some(i => i.type === 'uncovered'));
  fs.renameSync(path.join(f.root, 'docs', 'guide.md'), path.join(f.root, 'docs', 'renamed.md'));
  git(f.root, ['add', '-A', 'docs/guide.md', 'docs/renamed.md']);
  assert.ok(f.check().some(i => i.type === 'missing-source'));
  assert.ok(f.check().some(i => i.source === 'docs/renamed.md' && i.type === 'uncovered'));
  assert.ok(fs.existsSync(path.join(f.root, ...f.entry.translation.split('/'))));
});
test('missing, draft and source-incomplete translations remain visible', t => {
  const f = fixture(t);
  fs.unlinkSync(path.join(f.root, ...f.entry.translation.split('/')));
  assert.ok(f.check().some(i => i.type === 'missing-translation'));
  for (const status of ['pending', 'draft', 'source-incomplete']) {
    f.save([{ ...f.entry, status }]); assert.ok(f.check().some(i => i.type === status));
  }
});
test('validates duplicate pairs, SHA provenance and traversal paths', t => {
  const f = fixture(t);
  f.save([f.entry, f.entry]); assert.ok(f.check().some(i => i.type === 'invalid-manifest'));
  f.save([null]); assert.ok(f.check().some(i => i.type === 'invalid-manifest'));
  for (const patch of [{ sourceCommit: 'bad' }, { sourceBlob: '0'.repeat(40) }, { translation: '../escape.md' }, { source: '../escape.md' }]) {
    f.save([{ ...f.entry, ...patch }]); assert.ok(f.check().some(i => i.type === 'invalid-manifest'));
  }
});
test('checks real targets, case and fragments; ignores examples in fenced blocks', t => {
  const f = fixture(t);
  f.write(f.entry.translation, '# Руководство\n\n[Раздел](#руководство)\n\n```md\n[Пример](missing.md)\n```\n');
  assert.deepEqual(f.check(), []);
  for (const href of ['missing.md', '#missing', 'Guide.md']) {
    f.write(f.entry.translation, `# Руководство\n\n[Ссылка](${href})\n`);
    assert.ok(f.check().some(i => i.type === 'broken-link'));
  }
});
test('CRLF and README entry block do not cause false staleness', t => {
  const f = fixture(t);
  f.write('docs/guide.md', '# Guide\r\n\r\nHello.\r\n');
  assert.deepEqual(f.check(), []);
  f.write('README.md', '# Original\n\nText.\n'); git(f.root, ['add', 'README.md']); git(f.root, ['commit', '-m', 'README']);
  const sourceCommit = git(f.root, ['rev-parse', 'HEAD']).trim();
  f.write('docs/ru/project/README.md', '# Оригинал\n\nТекст.\n');
  f.save([f.entry, { source: 'README.md', translation: 'docs/ru/project/README.md', sourceCommit, sourceBlob: git(f.root, ['rev-parse', 'HEAD:README.md']).trim(), status: 'reviewed' }]);
  f.write('README.md', '# Original\n\n<!-- russian-docs:start -->\nbutton\n<!-- russian-docs:end -->\n\nText.\n');
  assert.deepEqual(f.check(), []);
  f.write('README.md', '# Original\n\nChanged English text.\n');
  assert.ok(f.check().some(i => i.type === 'stale' && i.source === 'README.md'));
});
test('preserves unicode, explicit and duplicate heading ids', () => {
  const ids = headingIds('# Привет: `мир`\n\n# Привет: `мир`\n<a id="original-heading"></a>\n');
  assert.ok(ids.has('привет-мир')); assert.ok(ids.has('привет-мир-1')); assert.ok(ids.has('original-heading'));
  assert.deepEqual(localLinks('```md\n[example](missing.md)\n```\n[real](real.md)'), ['real.md']);
  assert.deepEqual(localLinks('Пример: `- [Doc](missing.md)`. [Настоящая ссылка](real.md)'), ['real.md']);
  assert.deepEqual(localLinks('Пример: `команда\n[Doc](missing.md)`. [Ссылка](real.md)'), ['real.md']);
});
test('requires source navigation to use an existing Russian counterpart', t => {
  const f = fixture(t);
  f.write('docs/guide.md', '# Guide\n\n[Self](guide.md#guide)\n');
  f.write(f.entry.translation, '<a id="guide"></a>\n# Руководство\n\n[Ссылка](../../../docs/guide.md#guide)\n');
  assert.ok(f.check().some(i => i.type === 'untranslated-link'));
  f.write(f.entry.translation, '<a id="guide"></a>\n# Руководство\n\n[Ссылка](guide.md#guide)\n');
  assert.ok(!f.check().some(i => i.type === 'untranslated-link'));
});
test('ordinary upstream merge keeps both histories and detects affected translations', t => {
  const f = fixture(t);
  f.write('docs/old.md', '# Old source\n');
  f.write('docs/stable.md', '# Stable source\n');
  git(f.root, ['add', 'docs/old.md', 'docs/stable.md']); git(f.root, ['commit', '-m', 'More originals']);
  const originalCommit = git(f.root, ['rev-parse', 'HEAD']).trim();
  const additional = ['old', 'stable'].map(name => ({ source: `docs/${name}.md`, translation: `docs/ru/docs/${name}.md`, sourceCommit: originalCommit, sourceBlob: git(f.root, ['rev-parse', `HEAD:docs/${name}.md`]).trim(), status: 'reviewed' }));
  for (const entry of additional) f.write(entry.translation, '# Перевод\n');
  f.save([f.entry, ...additional]);
  f.write('README.md', '# Original\n\nEntry.\n'); git(f.root, ['add', '.']); git(f.root, ['commit', '-m', 'Fork baseline']);
  const baseline = git(f.root, ['rev-parse', 'HEAD']).trim();
  git(f.root, ['switch', '-c', 'simulated-upstream']);
  f.write('docs/guide.md', '# Guide\n\nUpstream update.\n');
  f.write('docs/new.md', '# New source\n');
  git(f.root, ['mv', 'docs/old.md', 'docs/renamed.md']);
  f.write('README.md', '# Upstream\n\nNew English entry.\n');
  git(f.root, ['add', '.']); git(f.root, ['commit', '-m', 'Upstream update']);
  const upstream = git(f.root, ['rev-parse', 'HEAD']).trim();
  git(f.root, ['switch', 'main']);
  f.write('README.md', '# Fork\n\n<!-- russian-docs:start -->\nRussian entry\n<!-- russian-docs:end -->\n');
  git(f.root, ['add', 'README.md']); git(f.root, ['commit', '-m', 'Russian entry']);
  assert.throws(() => git(f.root, ['merge', 'simulated-upstream']));
  f.write('README.md', '# Upstream\n\nNew English entry.\n\n<!-- russian-docs:start -->\nRussian entry\n<!-- russian-docs:end -->\n');
  git(f.root, ['add', 'README.md']); git(f.root, ['commit', '-m', 'Merge preserving Russian entry']);
  git(f.root, ['merge-base', '--is-ancestor', baseline, 'HEAD']); git(f.root, ['merge-base', '--is-ancestor', upstream, 'HEAD']);
  assert.ok(f.check().some(i => i.type === 'stale'));
  assert.ok(f.check().some(i => i.type === 'uncovered'));
  assert.ok(f.check().some(i => i.type === 'missing-source' && i.source === 'docs/old.md'));
  assert.ok(!f.check().some(i => i.source === 'docs/stable.md'));
  assert.ok(fs.readFileSync(path.join(f.root, 'README.md'), 'utf8').includes('russian-docs:start'));
});
test('CLI report is advisory, strict fails, and neither writes files', t => {
  const f = fixture(t);
  const script = fileURLToPath(new URL('./check-russian-docs.mjs', import.meta.url));
  const copy = path.join(f.root, 'scripts', 'check-russian-docs.mjs');
  fs.mkdirSync(path.dirname(copy), { recursive: true }); fs.copyFileSync(script, copy);
  const filename = path.join(f.root, ...f.entry.translation.split('/'));
  const before = fs.readFileSync(filename, 'utf8');
  f.save([{ ...f.entry, status: 'draft' }]);
  const result = JSON.parse(execFileSync(process.execPath, [copy, '--json'], { encoding: 'utf8' }));
  assert.ok(result.findings.some(i => i.type === 'draft'));
  assert.throws(() => execFileSync(process.execPath, [copy, '--strict'], { stdio: 'pipe' }), e => e.status === 1);
  assert.equal(fs.readFileSync(filename, 'utf8'), before);
});
