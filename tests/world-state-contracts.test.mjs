import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function extractBetween(startMarker, endMarker, label) {
  const start = SOURCE.indexOf(startMarker);
  const end = SOURCE.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(start, -1, `${label} start is present`);
  assert.notEqual(end, -1, `${label} end is present`);
  return SOURCE.slice(start, end);
}

function loadWorldStateApi() {
  const start = SOURCE.indexOf('var WORLD_STATE_VERSION=');
  const end = SOURCE.indexOf('function charDataKey', start);
  assert.notEqual(start, -1, 'world-state contract start is present');
  assert.notEqual(end, -1, 'world-state contract end is present');
  const context = {};
  vm.runInNewContext(`${SOURCE.slice(start, end)}\nthis.__worldStateApi={defaultWorldState,normalizeWorldState,getWorldStateConnectionId,isSafeWorldStateKey};`, context, {
    filename: 'index.html#world-state-contract'
  });
  return context.__worldStateApi;
}

function loadWorldRegistryApi() {
  const stateStart = SOURCE.indexOf('var WORLD_STATE_VERSION=');
  const stateEnd = SOURCE.indexOf('function charDataKey', stateStart);
  const regionStart = SOURCE.indexOf('var REGION_ORDER=');
  const regionEnd = SOURCE.indexOf('function isEntranceZone', regionStart);
  assert.notEqual(stateStart, -1, 'world-state helpers are present');
  assert.notEqual(regionStart, -1, 'world-region registry is present');
  const releaseIds = ['dungeon1', 'dungeon2', 'dungeon4', 'dungeon5', 'dungeon6', 'dungeon7', 'dungeon8', 'dungeon9', 'dungeon10', 'dungeon11', 'dungeon12'];
  const DUNGEON_DEFS = Object.fromEntries(releaseIds.map((id) => [id, {
    name: id === 'dungeon1' ? 'Forgotten Depths' : id,
    icon: '◇',
    objective: `Explore ${id}`,
    unlockHint: 'Complete the previous region'
  }]));
  const context = { DUNGEON_DEFS };
  vm.runInNewContext(
    `${SOURCE.slice(stateStart, stateEnd)}\n${SOURCE.slice(regionStart, regionEnd)}\nthis.__worldRegistryApi={REGION_ORDER,getWorldRegionDefinition,getWorldRegionList,getWorldConnectionDefinition,isReleaseDungeon};`,
    context,
    { filename: 'index.html#world-registry-contract' }
  );
  return context.__worldRegistryApi;
}

test('world state has a bounded, backward-compatible save shape', () => {
  const api = loadWorldStateApi();
  assert.deepEqual(JSON.parse(JSON.stringify(api.defaultWorldState())), {
    version: 1,
    discoveredRegions: { town: true },
    openedConnections: {},
    clearedLandmarks: {}
  });

  const migrated = api.normalizeWorldState(
    undefined,
    { unlocked: { dungeon1: true, dungeon2: false, dungeon13: true } },
    { type: 'entrance', dungeonId: 'dungeon1' }
  );
  assert.equal(migrated.discoveredRegions.town, true);
  assert.equal(migrated.discoveredRegions.dungeon1, true);
  assert.equal(migrated.discoveredRegions.dungeon13, true, 'future progress is not silently destroyed during migration');
  assert.equal(migrated.openedConnections['town>dungeon1'], true);
  assert.equal(migrated.openedConnections['town>dungeon2'], undefined);
});

test('world state sanitizes flags and never accepts prototype keys', () => {
  const api = loadWorldStateApi();
  const normalized = api.normalizeWorldState({
    version: 99,
    discoveredRegions: { town: true, dungeon1: true, '<script>': true, __proto__: true },
    openedConnections: { 'town>dungeon1': true, 'bad key': true },
    clearedLandmarks: { 'town:old-well': true }
  }, { unlocked: {} }, { type: 'town' });

  assert.equal(normalized.version, 1);
  assert.equal(normalized.discoveredRegions.dungeon1, true);
  assert.equal(normalized.discoveredRegions['<script>'], undefined);
  assert.equal(normalized.openedConnections['town>dungeon1'], true);
  assert.equal(normalized.openedConnections['bad key'], undefined);
  assert.equal(normalized.clearedLandmarks['town:old-well'], true);
  assert.equal(Object.prototype.polluted, undefined);
  assert.equal(api.isSafeWorldStateKey('__proto__'), false);
  assert.equal(api.getWorldStateConnectionId('town', 'dungeon1'), 'town>dungeon1');
});

test('world registry is data-driven, release-bounded, and connection-ready', () => {
  const api = loadWorldRegistryApi();
  const regions = api.getWorldRegionList();
  assert.deepEqual(Array.from(api.REGION_ORDER), ['dungeon1', 'dungeon2', 'dungeon4', 'dungeon5', 'dungeon6', 'dungeon7', 'dungeon8', 'dungeon9', 'dungeon10', 'dungeon11', 'dungeon12']);
  assert.equal(regions[0].id, 'town');
  assert.deepEqual(JSON.parse(JSON.stringify(regions.slice(1).map((region) => region.id))), Array.from(api.REGION_ORDER));
  assert.equal(api.getWorldRegionDefinition('dungeon13'), null);
  assert.equal(api.isReleaseDungeon('dungeon13'), false);
  assert.deepEqual(JSON.parse(JSON.stringify(api.getWorldConnectionDefinition('town', 'dungeon1'))), {
    id: 'town>dungeon1',
    from: 'town',
    to: 'dungeon1',
    label: 'Northern road →',
    kind: 'charted-route'
  });
  assert.equal(api.getWorldConnectionDefinition('dungeon1', 'dungeon2'), null);
});

test('world state is persisted and the atlas consumes the shared registry', () => {
  assert.match(SOURCE, /worldState:defaultWorldState\(\)/, 'new profiles receive world state');
  assert.match(SOURCE, /merged\.worldState=normalizeWorldState\(parsed\.worldState,merged\.dungeons,merged\.worldLocation\)/, 'legacy profiles migrate on load');
  assert.match(SOURCE, /permanentData\.worldState=normalizeWorldState\(permanentData\.worldState,permanentData\.dungeons,permanentData\.worldLocation\)/, 'save writes normalized state');
  assert.match(SOURCE, /worldState:permanentData\.worldState\|\|defaultWorldState\(\)/, 'profile export data includes world state');
  const atlas = extractBetween('function renderWorldAtlas(){', 'function openWorldAtlasScreen(){', 'world atlas registry consumer');
  assert.match(atlas, /getWorldRegionList\(\)/);
  assert.match(atlas, /getWorldConnectionDefinition\(home\.id,did\)/);
  assert.match(atlas, /getWorldAtlasDiscoveredRouteCount\(\)/);
  assert.match(SOURCE, /if\(!getWorldRegionDefinition\(dungeonId\)\|\|!isReleaseDungeon\(dungeonId\)\)return;/, 'atlas actions retain the V1 route guard');
});
