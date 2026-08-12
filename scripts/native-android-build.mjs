import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Keep Android build-time Capacitor generation rooted at the real repository
// path when the project is opened through the Desktop\Codex junction.
const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = fs.realpathSync(path.resolve(SCRIPT_DIR, '..'));

function resolveNpmCommand(name) {
  if (process.platform === 'win32') {
    // Calling the npm CLI through Node avoids shell concatenation and the
    // EINVAL produced by spawning a .cmd file with shell:false.
    const cli = path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', `${name}-cli.js`);
    if (fs.existsSync(cli)) return [process.execPath, cli];
  }
  return [name, ''];
}

function run(name, args) {
  const [command, cliArg] = resolveNpmCommand(name);
  const commandArgs = cliArg ? [cliArg, ...args] : args;
  const result = spawnSync(command, commandArgs, { cwd: ROOT, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run('npm', ['run', 'build']);
run('npx', ['cap', 'sync', 'android']);
run('npx', ['cap', 'build', 'android']);
