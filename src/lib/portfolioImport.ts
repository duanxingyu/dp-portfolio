import type { PortfolioData } from '../types/portfolio';

export function validatePortfolioData(raw: unknown): PortfolioData {
  if (!raw || typeof raw !== 'object') {
    throw new Error('JSON 格式无效');
  }

  const input = raw as Partial<PortfolioData>;

  if (!input.site?.title?.trim()) {
    throw new Error('缺少必填字段 site.title');
  }
  if (!input.site.tagline?.trim()) {
    throw new Error('缺少必填字段 site.tagline');
  }
  if (!input.site.contact?.email?.trim()) {
    throw new Error('缺少必填字段 site.contact.email');
  }
  if (!Array.isArray(input.projects)) {
    throw new Error('缺少 projects 数组');
  }
  if (!Array.isArray(input.categories) || input.categories.length === 0) {
    throw new Error('缺少 categories 数组');
  }

  return {
    site: {
      title: input.site.title.trim(),
      subtitle: input.site.subtitle?.trim(),
      tagline: input.site.tagline.trim(),
      description: input.site.description?.trim() ?? '',
      status: input.site.status?.trim(),
      location: input.site.location?.trim() ?? '',
      contact: {
        email: input.site.contact.email.trim(),
        phone: input.site.contact.phone?.trim(),
        wechat: input.site.contact.wechat?.trim(),
        wechatQr: input.site.contact.wechatQr?.trim(),
        resume: input.site.contact.resume?.trim(),
      },
      social: input.site.social ?? {},
      marquee: input.site.marquee ?? [],
    },
    about: {
      avatar: input.about?.avatar?.trim() ?? '/assets/about/avatar.svg',
      bio: input.about?.bio?.trim() ?? '',
      skills: input.about?.skills ?? [],
      tools: input.about?.tools ?? [],
    },
    stats: input.stats ?? [],
    categories: input.categories.includes('全部')
      ? input.categories
      : ['全部', ...input.categories.filter((c) => c !== '全部')],
    projects: input.projects.map((p, i) => {
      if (!p?.title?.trim()) throw new Error(`projects[${i}] 缺少 title`);
      if (!p.id?.trim()) throw new Error(`projects[${i}] 缺少 id`);
      return {
        id: p.id.trim(),
        title: p.title.trim(),
        category: p.category?.trim() ?? '产品设计',
        role: p.role?.trim(),
        year: p.year?.trim() ?? String(new Date().getFullYear()),
        description: p.description?.trim() ?? '',
        cover: p.cover?.trim() ?? '',
        media: Array.isArray(p.media) ? p.media : [],
        tags: Array.isArray(p.tags) ? p.tags : [],
      };
    }),
  };
}

export async function parsePortfolioFile(file: File): Promise<PortfolioData> {
  if (!file.name.endsWith('.json') && file.type !== 'application/json') {
    throw new Error('请选择 .json 文件');
  }

  const text = await file.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('JSON 解析失败，请检查文件格式');
  }

  return validatePortfolioData(parsed);
}
