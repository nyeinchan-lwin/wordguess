// Test runner: serves the project statically, then runs each suite against it.
// The suites take the base URL as their first argument.
import { spawn } from 'node:child_process';
import { startServer } from './serve.mjs';

const PORT  = Number(process.env.WG_PORT) || 8123;
const SUITE = [
  'test/wordlists.mjs',
  'test/playwright-test.mjs',
  'test/a11y-check.mjs',
  'test/daily-modes.mjs',
  'test/challenge-links.mjs',
  'test/screens.mjs',
  'test/visual-a11y.mjs',
  'test/game-modes.mjs',
];

function runSuite(script, base, cwd) {
  return new Promise(done => {
    const child = spawn(process.execPath, [script, base], { stdio: 'inherit', cwd });
    child.on('exit', code => done(code ?? 1));
    child.on('error', err => { console.error(err.message); done(1); });
  });
}

const { server, base, root } = await startServer(PORT);
console.log(`serving ${root} on ${base}\n`);

const failed = [];
for (const script of SUITE) {
  console.log(`──── ${script} ────`);
  if (await runSuite(script, base, root) !== 0) failed.push(script);
  console.log('');
}

server.close();

if (failed.length) {
  console.error(`✗ ${failed.length}/${SUITE.length} suite(s) failed: ${failed.join(', ')}`);
  process.exit(1);
}
console.log(`✓ ${SUITE.length}/${SUITE.length} suites passed`);
