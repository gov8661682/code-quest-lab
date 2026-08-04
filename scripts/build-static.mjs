import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const files = [
  'index.html',
  '_headers',
  'site.css',
  'manifest.webmanifest',
  'service-worker.js',
  'about/index.html',
  'education/index.html',
  'privacy/index.html',
  'support/index.html',
  'contact/index.html',
  'schools/index.html',
  'assets/icon.svg',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'assets/logo.svg',
  'assets/loading.svg'
];

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
for (const relative of files) {
  const source = path.join(ROOT, relative);
  const destination = path.join(DIST, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

const sourceSha256 = crypto
  .createHash('sha256')
  .update(fs.readFileSync(path.join(ROOT, 'index.html')))
  .digest('hex');
const buildInfo = {
  name: packageJson.name,
  version: packageJson.version,
  sourceSha256,
  shell: 'index.html'
};
fs.writeFileSync(path.join(DIST, 'build-info.json'), `${JSON.stringify(buildInfo, null, 2)}\n`);
console.log(`Static build complete: ${files.length + 1} files copied to ${path.relative(ROOT, DIST)}.`);
