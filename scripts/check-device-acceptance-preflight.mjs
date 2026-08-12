import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];

function read(relativePath) {
  const absolutePath = path.join(ROOT, relativePath);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`missing ${relativePath}`);
    return '';
  }
  return fs.readFileSync(absolutePath, 'utf8');
}

function sha256(relativePath) {
  return crypto
    .createHash('sha256')
    .update(fs.readFileSync(path.join(ROOT, relativePath)))
    .digest('hex');
}

const source = read('index.html');
const mirror = read('code-quest-lab-source.txt');
const runbook = read('DEVICE_ACCEPTANCE_RUNBOOK.md');
const serviceWorker = read('service-worker.js');

const localSourceSha256 = sha256('index.html');
const mirrorSha256 = sha256('code-quest-lab-source.txt');
const deployedSourceSha256 = runbook.match(/^- Source SHA-256:\s*\r?\n\s*`([^`]+)`/m)?.[1] || '';
const deployedRuntime = runbook.match(/^- Runtime snapshot: `([^`]+)`/m)?.[1] || '';
const deployedPrimary = runbook.match(/^- Primary: `([^`]+)`/m)?.[1] || '';
const rawPreview = runbook.match(/^- Deployment preview: `([^`]+)`/m)?.[1] || '';
const deployedPreview = rawPreview && /^https:\/\//i.test(rawPreview) ? rawPreview : rawPreview ? `https://${rawPreview}` : '';
const deployedPwaShell = runbook.match(/PWA shell:\s*\*\*([^*]+)\*\*/)?.[1] || '';

if (!source) failures.push('index.html is empty');
if (!mirror) failures.push('code-quest-lab-source.txt is empty');
if (localSourceSha256 !== mirrorSha256) {
  failures.push(`source mirror mismatch: index.html=${localSourceSha256}, code-quest-lab-source.txt=${mirrorSha256}`);
}
if (!/^[a-f0-9]{64}$/i.test(deployedSourceSha256)) {
  failures.push('runbook is missing a valid tested deployed source SHA-256');
} else if (localSourceSha256.toLowerCase() !== deployedSourceSha256.toLowerCase()) {
  failures.push(`local source does not match tested deployment: local=${localSourceSha256}, deployed=${deployedSourceSha256}`);
}
if (!deployedRuntime) failures.push('runbook is missing the tested runtime snapshot');
if (!/^https:\/\//i.test(deployedPrimary)) failures.push('runbook primary must use HTTPS');
if (!/^https:\/\//i.test(deployedPreview)) failures.push('runbook preview must use HTTPS');
if (!deployedPwaShell) failures.push('runbook is missing the tested PWA shell');
const shellVersion = deployedPwaShell.match(/v\d+/i)?.[0];
if (shellVersion && !serviceWorker.includes(`code-quest-lab-shell-${shellVersion.toLowerCase()}`)) {
  failures.push(`service worker does not contain the runbook PWA shell ${shellVersion}`);
}

if (failures.length > 0) {
  console.error('Device acceptance preflight failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('Device acceptance preflight passed.');
  console.log(`Tested runtime: ${deployedRuntime}`);
  console.log(`Primary: ${deployedPrimary}`);
  console.log(`Preview: ${deployedPreview}`);
  console.log(`Source SHA-256: ${localSourceSha256}`);
  console.log(`PWA shell: ${deployedPwaShell}`);
  console.log('This local check does not replace the live production check or physical-device evidence.');
}
