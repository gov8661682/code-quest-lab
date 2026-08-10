import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '..');

export function checkReleaseContracts(root = ROOT) {
  const failures = [];
  const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
  const has = (text, pattern, label) => {
    if (!pattern.test(text)) failures.push(label);
  };

  const html = read('index.html');
  const mirror = read('code-quest-lab-source.txt');
  if (html !== mirror) failures.push('code-quest-lab-source.txt is not an exact copy of index.html');

  has(html, /<meta\s+name="viewport"/i, 'viewport metadata is missing');
  has(html, /<link\s+rel="manifest"\s+href="manifest\.webmanifest"/i, 'manifest link is missing');
  has(html, /navigator\.serviceWorker\.register\(['"]\.\/service-worker\.js['"]\)/i, 'service-worker registration is missing');
  has(html, /id="characterSelectScreen"/, 'profile screen is missing');
  has(html, /id="gameCanvas"[^>]*tabindex="0"[^>]*role="application"/, 'game canvas is not keyboard-focusable');
  has(html, /canvas\.focus\(\)/, 'game canvas does not receive focus on pointer input');
  has(html, /id="pauseBtn"/, 'pause control is missing');
  for (const publicPath of ['./about/', './education/', './privacy/', './support/', './contact/', './schools/']) {
    if (!html.includes(`href="${publicPath}"`)) failures.push(`public information link is missing: ${publicPath}`);
  }
  for (const required of ['resumeSessionScreen', 'resumeSessionBtn', 'discardResumeSessionBtn', 'pauseMenuBtn', 'goFinishBtn', 'saveRunCheckpoint', 'loadRunCheckpoint', 'parseRunCheckpoint', 'entitlementScreen', 'mainUnlockBtn', 'FULL_UNLOCK_PRODUCT_ID', 'CHARACTER_SAVE_VERSION', 'parseCharacterSave', '__lastSaveRecovery', 'baseSkillData', 'function updatePlayerAttack', 'function performAttack', 'releaseJoysticksFromGlobal', 'DESKTOP_TAP_NUDGE_MS', 'function desktopKeyActive']) {
    if (!html.includes(required)) failures.push(`${required} recovery/stop contract is missing`);
  }
  has(html, /String\(result\.productId\|\|''\)!==FULL_UNLOCK_PRODUCT_ID/, 'entitlement product identity check is missing');
  if (!html.includes('initNativeEntitlementBridge') || !html.includes("registerPlugin('CodeQuestEntitlements')") || !html.includes("isPluginAvailable('CodeQuestEntitlements')")) failures.push('native entitlement bridge is missing');
  if (!html.includes('initNativeLifecycleBridge') || !html.includes("addListener('backButton'") || !html.includes("addListener('appStateChange'") || !html.includes("addListener('resume'")) failures.push('native lifecycle bridge is missing');
  has(html, /Fantasy Adventure[^<]*Optional Learning Support/i, 'adventure-first positioning is missing');
  has(html, /Optional play note/i, 'optional play support is missing');
  if (/>[^<]{0,120}Learning Mode[^<]{0,120}</i.test(html)) failures.push('release markup still uses lesson-first Learning Mode copy');
  if (/>[^<]{0,240}coming soon[^<]{0,240}</i.test(html)) failures.push('release markup still contains visible Coming soon copy');
  if (/id="forgeMenuSmelterBtn"/.test(html)) failures.push('unfinished Smelter remains in the Forge navigation');
  if (/https?:\/\/[^\s"']*(api[_-]?key|secret|token|password)/i.test(html)) failures.push('possible credential-like URL in index.html');

  let manifest;
  try {
    manifest = JSON.parse(read('manifest.webmanifest'));
  } catch (error) {
    failures.push(`manifest.webmanifest is not valid JSON: ${error.message}`);
  }
  if (manifest) {
    if (manifest.name !== 'Code Quest Lab') failures.push('manifest name is incorrect');
    if (manifest.start_url !== './') failures.push('manifest start_url must remain relative');
    if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) failures.push('manifest has no icon');
    for (const [src, sizes] of [['assets/icon-192.png', '192x192'], ['assets/icon-512.png', '512x512']]) {
      if (!manifest.icons.some((icon) => icon.src === src && icon.sizes === sizes && icon.type === 'image/png')) {
        failures.push(`manifest is missing the generated ${src} icon`);
      }
    }
  }

  const serviceWorker = read('service-worker.js');
  has(serviceWorker, /addEventListener\(['"]install['"]/, 'service worker install handler is missing');
  has(serviceWorker, /addEventListener\(['"]fetch['"]/, 'service worker fetch handler is missing');
  has(serviceWorker, /index\.html/, 'service worker does not cache the game shell');
  has(serviceWorker, /CACHE_NAME\s*=\s*['"]code-quest-lab-shell-v8['"]/, 'service worker cache version is not current');
  has(serviceWorker, /new URL\(event\.request\.url\)/, 'service worker does not parse request origins');
  has(serviceWorker, /requestUrl\.origin\s*!==\s*self\.location\.origin/, 'service worker does not enforce a same-origin boundary');
  has(serviceWorker, /event\.request\.mode\s*===\s*['"]navigate['"]/, 'service worker navigation fallback is not scoped to documents');
  has(serviceWorker, /Response\.error\(\)/, 'service worker does not fail non-navigation requests honestly while offline');
  for (const cachedPath of ['./site.css', './about/', './education/', './privacy/', './support/', './contact/', './schools/']) {
    if (!serviceWorker.includes(cachedPath)) failures.push(`service worker does not cache ${cachedPath}`);
  }

  const buildScript = read('scripts/build-static.mjs');
  for (const builtPath of ['site.css', 'build-info.json', 'about/index.html', 'education/index.html', 'privacy/index.html', 'support/index.html', 'contact/index.html', 'schools/index.html', 'assets/icon-192.png', 'assets/icon-512.png']) {
    if (!buildScript.includes(`'${builtPath}'`)) failures.push(`static build does not include ${builtPath}`);
  }
  if (!fs.existsSync(path.join(root, 'scripts', 'check-production.mjs'))) failures.push('production deployment checker is missing');

  for (const required of [
    'assets/icon.svg',
    'assets/icon-192.png',
    'assets/icon-512.png',
    'assets/logo.svg',
    'assets/loading.svg',
    'scripts/generate-native-assets.py'
  ]) {
    if (!fs.existsSync(path.join(root, required))) failures.push(`${required} is missing`);
  }

  const nativeRasterAssets = [
    'android/app/src/main/res/mipmap-mdpi/ic_launcher.png',
    'android/app/src/main/res/mipmap-mdpi/ic_launcher_foreground.png',
    'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',
    'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png',
    'android/app/src/main/res/drawable-land-mdpi/splash.png',
    'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png',
    'ios/App/App/Assets.xcassets/Splash.imageset/splash-2732x2732.png'
  ];
  for (const required of nativeRasterAssets) {
    const assetPath = path.join(root, required);
    if (!fs.existsSync(assetPath)) {
      failures.push(`${required} is missing`);
      continue;
    }
    const header = fs.readFileSync(assetPath).subarray(0, 8);
    if (!header.equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) failures.push(`${required} is not a PNG`);
  }

  const nativeFiles = [
    'capacitor.config.json',
    'android/app/src/main/AndroidManifest.xml',
    'android/app/build.gradle',
    'ios/App/App/Info.plist',
    'ios/App/App.xcodeproj/project.pbxproj'
  ];
  for (const nativeFile of nativeFiles) {
    if (!fs.existsSync(path.join(root, nativeFile))) failures.push(`${nativeFile} is missing`);
  }
  if (fs.existsSync(path.join(root, 'android/app/src/main/AndroidManifest.xml'))) {
    const androidManifest = read('android/app/src/main/AndroidManifest.xml');
    has(androidManifest, /android:screenOrientation="landscape"/, 'Android orientation is not landscape-first');
  }
  if (fs.existsSync(path.join(root, 'capacitor.config.json'))) {
    try {
      const capacitorConfig = JSON.parse(read('capacitor.config.json'));
      if (capacitorConfig.webDir !== 'dist') failures.push('Capacitor webDir must be dist');
      if (!capacitorConfig.plugins?.App?.disableBackButtonHandler) failures.push('Capacitor App back-button override is not configured');
    } catch (error) {
      failures.push(`capacitor.config.json is not valid JSON: ${error.message}`);
    }
  }
  if (fs.existsSync(path.join(root, 'ios/App/App/Info.plist'))) {
    const iosInfo = read('ios/App/App/Info.plist');
    if (!iosInfo.includes('UIInterfaceOrientationLandscapeLeft') || !iosInfo.includes('UIInterfaceOrientationLandscapeRight')) failures.push('iOS landscape orientations are missing');
    if (iosInfo.includes('UIInterfaceOrientationPortrait')) failures.push('iOS portrait orientation remains enabled');
  }

  for (const publicPage of ['about/index.html', 'education/index.html', 'privacy/index.html', 'support/index.html', 'contact/index.html', 'schools/index.html']) {
    const pagePath = path.join(root, publicPage);
    if (!fs.existsSync(pagePath)) {
      failures.push(`${publicPage} is missing`);
      continue;
    }
    const page = fs.readFileSync(pagePath, 'utf8');
    if (!/<title>[^<]+<\/title>/i.test(page) || !page.includes('../site.css')) failures.push(`${publicPage} is missing title or first-party stylesheet`);
    if (/<script\b/i.test(page)) failures.push(`${publicPage} must remain script-free for reviewability`);
  }
  if (!fs.existsSync(path.join(root, 'platform', 'ENTITLEMENT_CONTRACT.md'))) failures.push('platform entitlement contract is missing');
  if (!fs.existsSync(path.join(root, 'STORAGE_BOUNDARIES.md'))) failures.push('storage boundary record is missing');
  else {
    const storageBoundaries = read('STORAGE_BOUNDARIES.md');
    has(storageBoundaries, /origin-scoped|local browser profile/i, 'storage boundary record does not describe local web storage');
    has(storageBoundaries, /WebView/i, 'storage boundary record does not describe native WebView storage');
    has(storageBoundaries, /cross-device sync/i, 'storage boundary record does not state the cross-device sync boundary');
  }

  return failures;
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (invokedPath === path.resolve(fileURLToPath(import.meta.url))) {
  const failures = checkReleaseContracts();
  if (failures.length > 0) {
    console.error('Release contract check failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.log('Release contract check passed.');
  }
}
