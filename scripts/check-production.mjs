const baseUrl = (process.argv[2] || process.env.CODE_QUEST_PUBLIC_URL || 'https://code-quest-lab.gov8661682.com').replace(/\/+$/, '');
const failures = [];

if (!/^https:\/\//i.test(baseUrl)) failures.push('production URL must use HTTPS');

async function get(path) {
  try {
    const response = await fetch(`${baseUrl}${path}`, { redirect: 'follow' });
    const body = await response.text();
    return { response, body };
  } catch (error) {
    failures.push(`${path} request failed: ${error.message}`);
    return null;
  }
}

function requireResponse(path, result) {
  if (!result) return false;
  if (result.response.status !== 200) {
    failures.push(`${path} returned HTTP ${result.response.status}`);
    return false;
  }
  return true;
}

const root = await get('/');
if (requireResponse('/', root)) {
  for (const header of ['content-security-policy', 'x-content-type-options', 'referrer-policy', 'permissions-policy']) {
    if (!root.response.headers.get(header)) failures.push(`root is missing ${header} response header`);
  }
  if (!root.body.includes('manifest.webmanifest')) failures.push('root does not expose the PWA manifest link');
  if (!root.body.includes('CHARACTER_SAVE_VERSION')) failures.push('root is not the current release shell');
  if (!root.body.includes('Full Adventure Unlock')) failures.push('root is missing the current entitlement surface');
}

const manifest = await get('/manifest.webmanifest');
if (requireResponse('/manifest.webmanifest', manifest)) {
  const contentType = manifest.response.headers.get('content-type') || '';
  if (!/manifest\+json|application\/json/i.test(contentType)) failures.push(`/manifest.webmanifest has unexpected content type: ${contentType}`);
  try {
    const parsed = JSON.parse(manifest.body);
    if (parsed.name !== 'Code Quest Lab' || parsed.start_url !== './') failures.push('manifest metadata is incorrect');
  } catch (error) {
    failures.push(`manifest is not valid JSON: ${error.message}`);
  }
}

const serviceWorker = await get('/service-worker.js');
if (requireResponse('/service-worker.js', serviceWorker)) {
  const contentType = serviceWorker.response.headers.get('content-type') || '';
  if (!/javascript|ecmascript/i.test(contentType)) failures.push(`/service-worker.js has unexpected content type: ${contentType}`);
  if (!serviceWorker.body.includes("CACHE_NAME = 'code-quest-lab-shell-v6'")) failures.push('service worker is not the current v6 shell');
}

const buildInfo = await get('/build-info.json');
if (requireResponse('/build-info.json', buildInfo)) {
  const contentType = buildInfo.response.headers.get('content-type') || '';
  if (!/json/i.test(contentType)) failures.push(`/build-info.json has unexpected content type: ${contentType}`);
  try {
    const parsed = JSON.parse(buildInfo.body);
    if (parsed.name !== 'code-quest-lab' || parsed.shell !== 'index.html') failures.push('build identity metadata is incorrect');
    if (!/^\d+\.[0-9A-Za-z.-]+$/.test(String(parsed.version || ''))) failures.push('build identity version is missing or invalid');
    if (!/^[a-f0-9]{64}$/i.test(String(parsed.sourceSha256 || ''))) failures.push('build identity shell hash is missing or invalid');
  } catch (error) {
    failures.push(`build-info.json is not valid JSON: ${error.message}`);
  }
}

const expectedPages = {
  '/about/': 'About | Code Quest Lab',
  '/education/': 'Educational Purpose | Code Quest Lab',
  '/privacy/': 'Privacy | Code Quest Lab',
  '/support/': 'Support | Code Quest Lab',
  '/contact/': 'Contact | Code Quest Lab',
  '/schools/': 'School Review | Code Quest Lab'
};
for (const [path, title] of Object.entries(expectedPages)) {
  const page = await get(path);
  if (requireResponse(path, page) && !page.body.includes(`<title>${title}</title>`)) failures.push(`${path} is not the prepared public review page`);
}

const stylesheet = await get('/site.css');
if (requireResponse('/site.css', stylesheet) && !stylesheet.body.includes('--gold: #d8c08a')) failures.push('/site.css is not the prepared first-party stylesheet');

for (const asset of ['/assets/icon.svg', '/assets/logo.svg', '/assets/loading.svg']) {
  const result = await get(asset);
  if (requireResponse(asset, result) && !result.body.includes('<svg')) failures.push(`${asset} is not an SVG asset`);
}

for (const asset of ['/assets/icon-192.png', '/assets/icon-512.png']) {
  const result = await get(asset);
  if (requireResponse(asset, result)) {
    const contentType = result.response.headers.get('content-type') || '';
    if (!/image\/png/i.test(contentType)) failures.push(`${asset} has unexpected content type: ${contentType}`);
  }
}

if (failures.length > 0) {
  console.error(`Production check failed for ${baseUrl}:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Production check passed for ${baseUrl}.`);
}
