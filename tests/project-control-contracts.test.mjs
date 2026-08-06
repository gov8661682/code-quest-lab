import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (name) => fs.readFileSync(path.join(ROOT, name), 'utf8');

test('autonomous work has bounded retries and requires real progress', () => {
  const protocol = read('AUTORUN.md');

  assert.match(protocol, /Every cycle must produce at least one concrete progress delta:/);
  assert.match(protocol, /After \*\*3 materially identical technical failures\*\*/);
  assert.match(protocol, /Never exceed \*\*5 materially identical gameplay or manual attempts\*\*/);
  assert.match(protocol, /Trivial input, command, URL, viewport, or wording variations do not/);
  assert.match(protocol, /A blocker applies only to the affected work/);
});

test('main checkpoint percentages match the weighted evidence table', () => {
  const checkpoint = read('CURRENT_CHECKPOINT.md');
  const block = checkpoint.match(
    /<!-- checkpoint-progress:start -->([\s\S]*?)<!-- checkpoint-progress:end -->/
  );
  assert.ok(block, 'checkpoint progress block is present');

  const active = Number(block[1].match(/Active checkpoint completion: \*\*(\d+)%\*\*/)?.[1]);
  const overall = Number(block[1].match(/Overall project completion: \*\*(\d+)%\*\*/)?.[1]);
  const rows = [...block[1].matchAll(/^\| (?!Acceptance lane|---)(.*?) \| (\d+) \| (\d+) \|/gm)];

  assert.equal(rows.length, 6, 'all six Checkpoint 1 acceptance lanes are scored');
  const weights = rows.map((row) => Number(row[2]));
  const earned = rows.map((row) => Number(row[3]));
  assert.equal(weights.reduce((sum, value) => sum + value, 0), 100);
  earned.forEach((value, index) => {
    assert.ok(value >= 0 && value <= weights[index], `${rows[index][1]} has a valid score`);
  });

  const earnedTotal = earned.reduce((sum, value) => sum + value, 0);
  assert.equal(active, earnedTotal);

  const checkpoints = read('CHECKPOINTS.md');
  const checkpointCount = [...checkpoints.matchAll(/^## Checkpoint \d+ -/gm)].length;
  const completedCount = [...checkpoints.matchAll(/^Status: \*\*Complete\*\*$/gm)].length;
  assert.equal(checkpointCount, 10);
  assert.equal(overall, Math.round(((completedCount + active / 100) / checkpointCount) * 100));
});

test('status and progress report mirror the canonical percentages', () => {
  for (const name of ['STATUS.md', 'PROJECT_PROGRESS.md']) {
    const document = read(name);
    assert.match(document, /59%/);
    assert.match(document, /16%/);
  }
});
