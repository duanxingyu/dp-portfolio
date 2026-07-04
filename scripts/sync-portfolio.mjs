import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'content', 'portfolio.json');
const dest = join(root, 'public', 'portfolio.json');

mkdirSync(dirname(dest), { recursive: true });
copyFileSync(src, dest);
console.log('Synced content/portfolio.json → public/portfolio.json');
