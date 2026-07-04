import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'content', 'portfolio.json');
const dest = join(root, 'public', 'portfolio.json');

mkdirSync(dirname(dest), { recursive: true });
const raw = readFileSync(src, 'utf-8').replace(/^\uFEFF/, '');
writeFileSync(dest, raw, 'utf-8');
console.log('Synced content/portfolio.json → public/portfolio.json');
