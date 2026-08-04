import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const PUBLIC_PAGES = ['about', 'education', 'privacy', 'support', 'contact', 'schools'];

function readPage(name) {
  return fs.readFileSync(path.join(ROOT, name, 'index.html'), 'utf8');
}

test('normal play remains account-free, local-first, and permission-light', () => {
  assert.doesNotMatch(SOURCE, /<form\b|type=["']email["']|password|sign[ -]?up|create an account/i);
  assert.doesNotMatch(SOURCE, /navigator\.(geolocation|contacts)|getUserMedia|mediaDevices|Notification\.requestPermission/i);
  assert.doesNotMatch(SOURCE, /<script[^>]+src=["']https?:\/\//i);
  assert.doesNotMatch(SOURCE, /<iframe\b|<object\b|<embed\b/i);
  assert.match(SOURCE, /navigator\.serviceWorker\.register\(['"]\.\/service-worker\.js['"]\)/i);
  assert.match(SOURCE, /localStorage/);
  assert.match(SOURCE, /No account|without.*login|optional learning support/i);
});

test('public review surfaces keep educational claims bounded and consistent', () => {
  const pages = PUBLIC_PAGES.map((name) => [name, readPage(name)]);
  for (const [name, page] of pages) {
    assert.match(page, /<title>[^<]+<\/title>/i, `${name} has a title`);
    assert.match(page, /href="\.\.\/site\.css"/, `${name} uses the first-party stylesheet`);
    assert.doesNotMatch(page, /<script\b/i, `${name} remains script-free`);
  }

  const education = readPage('education');
  assert.match(education, /optional computational-thinking support/i);
  assert.match(education, /does not claim to teach programming, improve grades, replace instruction/i);
  assert.match(education, /Learning Support is optional and never blocks/i);

  const privacy = readPage('privacy');
  assert.match(privacy, /No account, login, email address, real name/i);
  assert.match(privacy, /camera, microphone, precise location, contacts/i);
});

test('normal play keeps public navigation same-origin and reviewable', () => {
  for (const publicPath of ['./about/', './education/', './privacy/', './support/', './contact/', './schools/']) {
    assert.match(SOURCE, new RegExp(`href="${publicPath.replaceAll('/', '\\/')}"`));
  }
  assert.doesNotMatch(SOURCE, /window\.open\(|location\.href\s*=\s*["']https?:/i);
});
