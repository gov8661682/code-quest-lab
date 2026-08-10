import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '..');

export const PACKAGE_FILES = Object.freeze([
  'index.html',
  'build-info.json',
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
]);

const TEXT_FILE_RE = /(?:\.html|\.css|\.js|\.json|\.webmanifest|\.svg|_headers)$/i;
const ALLOWED_STATIC_URLS = new Set([
  'http://www.w3.org/2000/svg',
  'https://code-quest-lab.gov8661682.com/'
]);

function walkFiles(directory, prefix = '') {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(fullPath, relative));
    else files.push(relative.replaceAll('\\', '/'));
  }
  return files;
}

function readUtf8(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function addUnexpectedExternalUrls(failures, relative, text) {
  for (const match of text.matchAll(/https?:\/\/[^\s"'<>`)]+/gi)) {
    const url = match[0].replace(/[.,;:!?]+$/, '');
    if (!ALLOWED_STATIC_URLS.has(url) && !url.startsWith('https://code-quest-lab.gov8661682.com/')) {
      failures.push(`${relative} contains an unexpected external URL: ${url}`);
    }
  }
}

export function checkStaticPackage(root = ROOT) {
  const failures = [];
  const dist = path.join(root, 'dist');
  if (!fs.existsSync(dist)) return ['dist directory is missing; run npm run build first'];

  const expected = new Set(PACKAGE_FILES);
  const actual = walkFiles(dist);
  for (const relative of PACKAGE_FILES) {
    if (!fs.existsSync(path.join(dist, relative))) failures.push(`dist is missing ${relative}`);
  }
  for (const relative of actual) {
    if (!expected.has(relative)) failures.push(`dist contains an unexpected file: ${relative}`);
  }

  for (const relative of PACKAGE_FILES) {
    const sourcePath = path.join(root, relative);
    const packagePath = path.join(dist, relative);
    if (!fs.existsSync(sourcePath) || !fs.existsSync(packagePath)) continue;
    if (!fs.readFileSync(sourcePath).equals(fs.readFileSync(packagePath))) {
      failures.push(`dist/${relative} does not match the canonical source`);
    }
  }

  for (const nativePublicRoot of [
    'android/app/src/main/assets/public',
    'ios/App/App/public'
  ]) {
    for (const relative of PACKAGE_FILES) {
      const distPath = path.join(dist, relative);
      const nativePath = path.join(root, nativePublicRoot, relative);
      if (!fs.existsSync(distPath)) continue;
      if (!fs.existsSync(nativePath)) {
        failures.push(`${nativePublicRoot} is missing ${relative}`);
        continue;
      }
      if (!fs.readFileSync(distPath).equals(fs.readFileSync(nativePath))) {
        failures.push(`${nativePublicRoot}/${relative} does not match dist/${relative}`);
      }
    }
  }

  for (const relative of actual.filter((file) => TEXT_FILE_RE.test(file))) {
    const filePath = path.join(dist, relative);
    const text = readUtf8(filePath);
    addUnexpectedExternalUrls(failures, relative, text);
    if (/sourceMappingURL/i.test(text)) failures.push(`${relative} contains a source-map reference`);
    if (/<script\b[^>]*\bsrc\s*=/i.test(text)) failures.push(`${relative} loads an external or packaged script file`);
    if (/<(?:iframe|frame|object|embed|img|audio|video)\b[^>]*(?:src|data)\s*=\s*["']https?:\/\//i.test(text)) {
      failures.push(`${relative} embeds an external resource`);
    }
    if (/<link\b[^>]*\brel\s*=\s*["'][^"']*(?:stylesheet|modulepreload|preload|icon)[^"']*["'][^>]*(?:href|src)\s*=\s*["']https?:\/\//i.test(text)) {
      failures.push(`${relative} references an external stylesheet or script`);
    }
    if (/(?:api[_-]?key|client[_-]?secret|access[_-]?token|private[_-]?key|password\s*[:=])/i.test(text)) {
      failures.push(`${relative} contains a credential-like string`);
    }
  }

  const manifestPath = path.join(dist, 'manifest.webmanifest');
  try {
    const manifest = JSON.parse(readUtf8(manifestPath));
    if (manifest.name !== 'Code Quest Lab') failures.push('dist manifest name is incorrect');
    if (manifest.start_url !== './') failures.push('dist manifest start_url must remain relative');
    if (!Array.isArray(manifest.icons) || manifest.icons.length < 2) failures.push('dist manifest is missing install icons');
  } catch (error) {
    failures.push(`dist manifest is not valid JSON: ${error.message}`);
  }

  try {
    const packageJson = JSON.parse(readUtf8(path.join(root, 'package.json')));
    const buildInfo = JSON.parse(readUtf8(path.join(dist, 'build-info.json')));
    const sourceHash = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, 'index.html'))).digest('hex');
    if (buildInfo.name !== packageJson.name || buildInfo.version !== packageJson.version) failures.push('dist build identity does not match package metadata');
    if (buildInfo.shell !== 'index.html') failures.push('dist build identity names an unexpected shell');
    if (buildInfo.sourceSha256 !== sourceHash) failures.push('dist build identity does not match the canonical shell hash');
  } catch (error) {
    failures.push(`dist build-info.json is invalid: ${error.message}`);
  }

  const serviceWorker = readUtf8(path.join(dist, 'service-worker.js'));
  if (!serviceWorker.includes("CACHE_NAME = 'code-quest-lab-shell-v8'")) failures.push('dist service worker is not the current v8 shell');
  if (!serviceWorker.includes("requestUrl.origin !== self.location.origin")) failures.push('dist service worker lacks same-origin isolation');
  if (!serviceWorker.includes("event.request.mode === 'navigate'")) failures.push('dist service worker fallback is not navigation-only');

  const expectedTitles = {
    'about/index.html': 'About | Code Quest Lab',
    'education/index.html': 'Educational Purpose | Code Quest Lab',
    'privacy/index.html': 'Privacy | Code Quest Lab',
    'support/index.html': 'Support | Code Quest Lab',
    'contact/index.html': 'Contact | Code Quest Lab',
    'schools/index.html': 'School Review | Code Quest Lab'
  };
  for (const [relative, title] of Object.entries(expectedTitles)) {
    const page = readUtf8(path.join(dist, relative));
    if (!page.includes(`<title>${title}</title>`)) failures.push(`dist/${relative} has inaccurate or missing title metadata`);
    if (!page.includes('../site.css')) failures.push(`dist/${relative} does not use the first-party stylesheet`);
    if (/<script\b/i.test(page)) failures.push(`dist/${relative} must remain script-free for school review`);
  }

  return failures;
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (invokedPath === path.resolve(fileURLToPath(import.meta.url))) {
  const failures = checkStaticPackage();
  if (failures.length > 0) {
    console.error('Static package check failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.log(`Static package check passed: ${PACKAGE_FILES.length} expected files, no unexpected runtime resources.`);
  }
}
