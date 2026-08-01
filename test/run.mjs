// Test runner: serves the project statically, then runs each suite against it.
// The suites take the base URL as their first argument.
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT  = fileURLToPath(new URL('..', import.meta.url));
const PORT  = Number(process.env.WG_PORT) || 8123;
const SUITE = ['test/playwright-test.mjs', 'test/a11y-check.mjs'];

const TYPES = {
  '.html': 'text/html',       '.js':  'text/javascript',
  '.mjs':  'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png':  'image/png',       '.ico': 'image/x-icon',
};

const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = resolve(join(ROOT, path === '/' ? 'index.html' : path));
  // Never serve outside the project root.
  if (file !== ROOT.slice(0, -1) && !file.startsWith(ROOT.endsWith(sep) ? ROOT : ROOT + sep)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
});

function runSuite(script, base) {
  return new Promise(done => {
    const child = spawn(process.execPath, [script, base], { stdio: 'inherit', cwd: ROOT });
    child.on('exit', code => done(code ?? 1));
    child.on('error', err => { console.error(err.message); done(1); });
  });
}

await new Promise(ready => server.listen(PORT, ready));
const base = `http://localhost:${PORT}`;
console.log(`serving ${ROOT} on ${base}\n`);

const failed = [];
for (const script of SUITE) {
  console.log(`──── ${script} ────`);
  if (await runSuite(script, base) !== 0) failed.push(script);
  console.log('');
}

server.close();

if (failed.length) {
  console.error(`✗ ${failed.length}/${SUITE.length} suite(s) failed: ${failed.join(', ')}`);
  process.exit(1);
}
console.log(`✓ ${SUITE.length}/${SUITE.length} suites passed`);
