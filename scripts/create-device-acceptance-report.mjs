import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function readOption(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

if (process.argv.includes('--help')) {
  console.log('Usage: npm.cmd run acceptance:report -- [--output <path>]');
  console.log('Creates a non-personal, dated Device Acceptance Report template.');
  process.exit(0);
}

const date = new Date().toISOString().slice(0, 10);
const outputOption = readOption('--output');
const outputPath = path.resolve(
  ROOT,
  outputOption || path.join('device-acceptance-reports', `cql-device-${date}.md`)
);
const sourceSha256 = crypto
  .createHash('sha256')
  .update(fs.readFileSync(path.join(ROOT, 'index.html')))
  .digest('hex');

let commit = 'unknown';
try {
  commit = execFileSync('git', ['rev-parse', '--short', 'HEAD'], {
    cwd: ROOT,
    encoding: 'utf8'
  }).trim() || commit;
} catch {
  // A copied package can still produce a useful report without Git metadata.
}

if (fs.existsSync(outputPath)) {
  console.error(`Refusing to overwrite existing report: ${path.relative(ROOT, outputPath)}`);
  process.exit(1);
}

const report = `# Code Quest Lab Device Acceptance Report

Status: DRAFT - complete on the representative device; do not include personal data.

## Build and test metadata

| Field | Value |
|---|---|
| Report date | ${date} |
| Runtime commit | ${commit} |
| Source SHA-256 | ${sourceSha256} |
| Deployment URL or package | |
| Date/time and timezone of device run | |
| Device model and OS | |
| Browser/app version | |
| Orientation and viewport | |
| Network state at start | |
| Audio state at start | |

## Run A - clean-player V1 route

Result: [ ] Pass  [ ] Partial  [ ] Fail

- [ ] Fresh profile and supported class
- [ ] No developer controls or developer encounter aids
- [ ] Town guide follows the character and points to the gate
- [ ] D1-D12 rooms, rewards, bosses, final portal, and intended ending/session summary
- [ ] No lost progress, P0/P1 defect, or browser/runtime diagnostic

First failing room/system or final handoff:

## Run B - 10-30 minute touch-first session

Result: [ ] Pass  [ ] Partial  [ ] Fail

- [ ] Clear objective and meaningful room/checkpoint
- [ ] Touch movement and attack/target selection without keyboard or mouse
- [ ] Pause/background or suspension, resume, and deliberate Finish For Now
- [ ] Session summary, next step, and restored progress

Approximate duration and observations:

## Run C - device and release-readiness checks

Result: [ ] Pass  [ ] Partial  [ ] Fail

- [ ] Landscape layout, safe areas, readable text, and unobstructed touch targets
- [ ] Movement/attack joysticks, skills, pause, menus, gate, guides, and portal
- [ ] Muted/unmuted/headphone audio behavior
- [ ] Reload/background/forced-close recovery without lost profile or checkpoint
- [ ] Offline or temporarily unavailable-network behavior after initial load
- [ ] Optional second-device .txt transfer, only if cross-device support is claimed

Issues and reproduction notes:

## Evidence files

List only sanitized screenshots/logs and their filenames. Do not include
credentials, tokens, school identifiers, or personal information.

-

## Handoff

Report path:

Owner/device reviewer:

Recommended next action:

The report is not release evidence until the completed packet is reviewed and
recorded in CURRENT_CHECKPOINT.md, PROJECT_PROGRESS.md, and BLOCKERS.md.
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, report, 'utf8');
console.log(`Created ${path.relative(ROOT, outputPath)}`);
console.log(`Runtime ${commit}; source SHA-256 ${sourceSha256}`);
