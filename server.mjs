import http from 'node:http';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('./teleprompter.html', import.meta.url));
const port = Number(process.env.SERVER_PORT || process.env.PORT || 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('SERVER_PORT ou PORT deve indicar uma porta valida.');
}

const server = http.createServer((request, response) => {
  response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  response.setHeader('Pragma', 'no-cache');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end();
    return;
  }

  let pathname;
  try {
    pathname = new URL(request.url, 'http://localhost').pathname;
  } catch {
    response.writeHead(400);
    response.end();
    return;
  }

  let body;
  let contentType;
  if (['/', '/index.html', '/teleprompter.html'].includes(pathname)) {
    body = html;
    contentType = 'text/html; charset=utf-8';
  } else if (pathname === '/healthz') {
    body = Buffer.from('ok\n');
    contentType = 'text/plain; charset=utf-8';
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(request.method === 'HEAD' ? undefined : 'Not found\n');
    return;
  }

  response.writeHead(200, { 'Content-Type': contentType, 'Content-Length': body.length });
  response.end(request.method === 'HEAD' ? undefined : body);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Teleprompter listening on 0.0.0.0:${port}`);
});

for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 5000).unref();
  });
}
