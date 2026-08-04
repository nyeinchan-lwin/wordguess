// Minimal static file server for local tooling — used by the test runner and
// the screenshot generator. Not part of the shipped game.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

const TYPES = {
  '.html': 'text/html',       '.js':  'text/javascript',
  '.mjs':  'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png':  'image/png',       '.ico': 'image/x-icon',
};

/** Serves the project root. Resolves to { server, base, root }. */
export async function startServer(port) {
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
  await new Promise(ready => server.listen(port, ready));
  return { server, base: `http://localhost:${port}`, root: ROOT };
}
