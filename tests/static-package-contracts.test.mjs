import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkStaticPackage, PACKAGE_FILES } from '../scripts/check-static-package.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function copyBuiltPackageToTemp() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'code-quest-lab-package-'));
  fs.cpSync(path.join(ROOT, 'dist'), path.join(tempRoot, 'dist'), { recursive: true });
  for (const nativeRoot of ['android/app/src/main/assets/public', 'ios/App/App/public']) {
    fs.cpSync(path.join(ROOT, nativeRoot), path.join(tempRoot, nativeRoot), { recursive: true });
  }
  return tempRoot;
}

test('the built static package is exact, reviewable, and self-contained', () => {
  assert.equal(PACKAGE_FILES.length, 17);
  assert.deepEqual(checkStaticPackage(), []);
  assert.equal(fs.existsSync(path.join(ROOT, 'dist', 'platform', 'dev-entitlement-adapter.mjs')), false);
  assert.doesNotMatch(fs.readFileSync(path.join(ROOT, 'dist', 'index.html'), 'utf8'), /createDevelopmentEntitlementAdapter/);
});

test('the static package audit rejects stale generated files', () => {
  const tempRoot = copyBuiltPackageToTemp();
  try {
    fs.writeFileSync(path.join(tempRoot, 'dist', 'old-debug.js'), 'console.log("stale");');
    assert.match(checkStaticPackage(tempRoot).join('\n'), /unexpected file: old-debug\.js/);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('the static package audit rejects external runtime resources', () => {
  const tempRoot = copyBuiltPackageToTemp();
  try {
    const page = path.join(tempRoot, 'dist', 'about', 'index.html');
    fs.appendFileSync(page, '<script src="https://example.invalid/track.js"></script>');
    assert.match(checkStaticPackage(tempRoot).join('\n'), /unexpected external URL|external or packaged script/);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});
