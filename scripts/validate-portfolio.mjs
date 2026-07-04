import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const file = resolve(process.argv[2] ?? 'public/portfolio.json');
const raw = readFileSync(file, 'utf-8').replace(/^\uFEFF/, '');

if (/\}\s*\{/.test(raw)) {
  console.error(`❌ ${file} 含重复 JSON 片段，请只保留一份有效内容`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(raw);
} catch (error) {
  console.error(`❌ ${file} 不是合法 JSON：${error.message}`);
  process.exit(1);
}

if (!data?.site?.title || !Array.isArray(data?.projects)) {
  console.error(`❌ ${file} 缺少 site.title 或 projects 字段`);
  process.exit(1);
}

console.log(`✓ ${file} 校验通过（${data.site.title}，${data.projects.length} 个项目）`);
