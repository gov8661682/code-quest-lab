import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
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

test('project learning uses one bounded rolling memory instead of stacked logs', () => {
  const protocol = read('AUTORUN.md');
  const memory = read('PROJECT_MEMORY.md');

  assert.match(protocol, /Read `PROJECT_MEMORY\.md`/);
  assert.match(protocol, /single rolling learning record/);
  assert.match(protocol, /Never create per-cycle memory files or append a\s+chronological transcript/);
  assert.match(memory, /Replace and consolidate; never append a chronological work log/);
  assert.match(memory, /Do not retry the same blocked surface without a material state change/);
  assert.match(memory, /Keep this file under 120 lines/);
  assert.ok(memory.split(/\r?\n/).length <= 120, 'rolling memory stays bounded');
});

test('device acceptance handoff keeps owner evidence distinct from developer QA', () => {
  const runbook = read('DEVICE_ACCEPTANCE_RUNBOOK.md');

  assert.match(runbook, /## Run A - clean-player V1 route/);
  assert.match(runbook, /## Run B - 10-30 minute touch-first session/);
  assert.match(runbook, /## Run C - device and release-readiness checks/);
  assert.match(runbook, /no developer controls/);
  assert.match(runbook, /safe-area/);
  assert.match(runbook, /forced-close/);
  assert.match(runbook, /\.txt.*profile export and import/);
  assert.match(runbook, /Do not publish a new build merely to collect this evidence/);
});

test('device acceptance report generator seeds the current build identity safely', () => {
  const packageJson = JSON.parse(read('package.json'));
  const generator = read('scripts/create-device-acceptance-report.mjs');

  assert.equal(packageJson.scripts['acceptance:report'], 'node scripts/create-device-acceptance-report.mjs');
  assert.match(generator, /cql-device-\$\{date\}\.md/);
  assert.match(generator, /sha256/);
  assert.match(generator, /rev-parse/);
  assert.match(generator, /Refusing to overwrite existing report/);
  assert.match(generator, /do not include personal data/);
  assert.match(generator, /Run A - clean-player V1 route/);
  assert.match(generator, /Run B - 10-30 minute touch-first session/);
  assert.match(generator, /Run C - device and release-readiness checks/);
});

test('device acceptance report generator refuses accidental overwrite', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cql-acceptance-'));
  const outputPath = path.join(tempRoot, 'report.md');
  const scriptPath = path.join(ROOT, 'scripts', 'create-device-acceptance-report.mjs');

  try {
  const first = spawnSync(process.execPath, [scriptPath, '--output', outputPath], {
      cwd: ROOT,
      encoding: 'utf8'
    });
    assert.equal(first.status, 0, first.stderr);
    const report = fs.readFileSync(outputPath, 'utf8');
    assert.match(report, /Repository control commit \| [0-9a-f]+ \|/);
    assert.match(report, /Tested deployed runtime \| [0-9a-f]+ \|/);
    assert.match(report, /Local source SHA-256 \| [0-9a-f]{64} \|/);
    assert.match(report, /Tested deployed source SHA-256 \| [0-9a-fA-F]{64} \|/);
    assert.match(report, /Tested deployment \| https:\/\/code-quest-lab\.gov8661682\.com/);
    assert.match(report, /Status: DRAFT/);

    const second = spawnSync(process.execPath, [scriptPath, '--output', outputPath], {
      cwd: ROOT,
      encoding: 'utf8'
    });
    assert.equal(second.status, 1);
    assert.match(second.stderr, /Refusing to overwrite existing report/);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('release verification prepares generated web and native assets before tests', () => {
  const packageJson = JSON.parse(read('package.json'));
  assert.match(
    packageJson.scripts['release:verify'],
    /^npm run check && npm run native:sync && npm test && npm run package:check$/,
    'release:verify must refresh generated assets before static-package tests'
  );
  assert.match(
    packageJson.scripts['native:sync'],
    /^node scripts\/native-sync\.mjs$/,
    'native:sync must use the repository-root-safe Capacitor wrapper'
  );
  assert.match(
    packageJson.scripts['native:android:build'],
    /^node scripts\/native-android-build\.mjs$/,
    'native:android:build must use the repository-root-safe Capacitor wrapper'
  );
  for (const script of ['scripts/native-sync.mjs', 'scripts/native-android-build.mjs']) {
    const wrapper = read(script);
    assert.match(wrapper, /fs\.realpathSync\(/, `${script} must resolve junctions to the real repository path`);
    assert.match(wrapper, /cwd: ROOT/, `${script} must run child commands from the real repository path`);
    assert.match(wrapper, /run\('npm', \['run', 'build'\]\)/, `${script} must build before native work`);
  }
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
  const checkpoint = read('CURRENT_CHECKPOINT.md');
  const block = checkpoint.match(
    /<!-- checkpoint-progress:start -->([\s\S]*?)<!-- checkpoint-progress:end -->/
  );
  assert.ok(block, 'checkpoint progress block is present');
  const active = Number(block[1].match(/Active checkpoint completion: \*\*(\d+)%\*\*/)?.[1]);
  const overall = Number(block[1].match(/Overall project completion: \*\*(\d+)%\*\*/)?.[1]);
  assert.ok(Number.isInteger(active) && Number.isInteger(overall), 'canonical percentages are numeric');
  for (const name of ['STATUS.md', 'PROJECT_PROGRESS.md']) {
    const document = read(name);
    assert.match(document, new RegExp(`\\*\\*${active}%\\*\\*`), `${name} mirrors active checkpoint percentage`);
    assert.match(document, new RegExp(`\\*\\*${overall}%\\*\\*`), `${name} mirrors overall percentage`);
  }
});
