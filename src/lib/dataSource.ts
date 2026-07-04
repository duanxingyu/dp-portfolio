import type { PortfolioData } from '../types/portfolio';
import { loadPortfolioCache, savePortfolioCache } from './portfolioCache';

/** 静态资源路径，兼容 GitHub Pages 子路径部署 */
export function assetUrl(path: string | undefined): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalized}`;
}

export function portfolioUrl(): string {
  return `${import.meta.env.BASE_URL}portfolio.json`;
}

export async function fetchPortfolio(): Promise<PortfolioData> {
  try {
    const staticRes = await fetch(portfolioUrl(), { cache: 'no-store' });
    if (staticRes.ok) {
      const data = (await staticRes.json()) as PortfolioData;
      savePortfolioCache(data);
      return data;
    }
  } catch {
    // 网络异常，尝试缓存
  }

  try {
    const apiRes = await fetch('/api/portfolio');
    if (apiRes.ok) {
      const data = (await apiRes.json()) as PortfolioData;
      savePortfolioCache(data);
      return data;
    }
  } catch {
    // 静态托管无 API
  }

  const cached = loadPortfolioCache();
  if (cached?.data) return cached.data;

  throw new Error('无法加载 portfolio.json');
}

export async function isApiAvailable(): Promise<boolean> {
  try {
    const res = await fetch('/api/health', { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

export function downloadPortfolioJson(data: PortfolioData, filename = 'portfolio.json') {
  const blob = new Blob([`${JSON.stringify(data, null, 2)}\n`], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
