import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PORT = Number(process.env.PORT) || 3001;
const VITE_PORT = Number(process.env.VITE_PORT) || 5173;
const CONFIG_TOKEN = process.env.CONFIG_TOKEN || '';
const distDir = join(ROOT, 'dist');
const hasBuiltApp = existsSync(join(distDir, 'index.html'));
const isProd =
  hasBuiltApp &&
  process.env.NODE_ENV !== 'development';

const PORTFOLIO_PATH = join(ROOT, 'content', 'portfolio.json');

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });

async function readPortfolio() {
  const raw = await readFile(PORTFOLIO_PATH, 'utf-8');
  return JSON.parse(raw);
}

function assertSaveAllowed(request, reply) {
  if (CONFIG_TOKEN) {
    if (request.headers['x-config-token'] !== CONFIG_TOKEN) {
      reply.code(401).send({ error: '未授权，请填写正确的配置密钥' });
      return false;
    }
    return true;
  }
  if (isProd) {
    reply.code(403).send({ error: '生产环境请在环境变量中设置 CONFIG_TOKEN 后再保存' });
    return false;
  }
  return true;
}

app.get('/api/portfolio', async () => readPortfolio());

app.put('/api/portfolio', async (request, reply) => {
  if (!assertSaveAllowed(request, reply)) return;

  const body = request.body;
  if (!body || typeof body !== 'object' || !body.site?.title) {
    return reply.code(400).send({ error: '数据格式无效，至少需包含 site.title' });
  }

  await writeFile(PORTFOLIO_PATH, `${JSON.stringify(body, null, 2)}\n`, 'utf-8');
  await writeFile(join(ROOT, 'public', 'portfolio.json'), `${JSON.stringify(body, null, 2)}\n`, 'utf-8');
  return { ok: true };
});

app.get('/api/config/status', async () => ({
  authRequired: Boolean(CONFIG_TOKEN) || isProd,
  hasToken: Boolean(CONFIG_TOKEN),
}));

app.get('/api/health', async () => ({ status: 'ok' }));

if (isProd) {
  await app.register(fastifyStatic, {
    root: distDir,
    prefix: '/',
  });
  app.setNotFoundHandler((req, reply) => {
    if (req.url.startsWith('/api')) {
      return reply.code(404).send({ error: 'Not found' });
    }
    return reply.sendFile('index.html');
  });
} else {
  await app.register(fastifyStatic, {
    root: join(ROOT, 'public', 'assets'),
    prefix: '/assets/',
    decorateReply: false,
  });

  app.get('/', async (_req, reply) => {
    const viteUrl = `http://localhost:${VITE_PORT}`;
    return reply.type('text/html').send(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0;url=${viteUrl}" />
  <title>Redirecting…</title>
</head>
<body>
  <p>开发模式请访问 Vite 前端：<a href="${viteUrl}">${viteUrl}</a></p>
  <script>location.replace(${JSON.stringify(viteUrl)})</script>
</body>
</html>`);
  });
}

await app.listen({ port: PORT, host: '0.0.0.0' });
console.log(`Server running at http://localhost:${PORT}`);
