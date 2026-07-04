import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'content', 'portfolio.json');
const dest = join(root, 'public', 'portfolio.json');

mkdirSync(dirname(dest), { recursive: true });
const raw = readFileSync(src, 'utf-8').replace(/^\uFEFF/, '');

if (/\}\s*\{/.test(raw)) {
  console.error('❌ content/portfolio.json 含重复 JSON，请删除多余内容后重试');
  process.exit(1);
}

JSON.parse(raw);
writeFileSync(dest, `${JSON.stringify(JSON.parse(raw), null, 2)}\n`, 'utf-8');
console.log('Synced content/portfolio.json → public/portfolio.json');

const validate = spawnSync(process.execPath, ['scripts/validate-portfolio.mjs', dest], {
  cwd: root,
  stdio: 'inherit',
});
if (validate.status !== 0) process.exit(validate.status ?? 1);
