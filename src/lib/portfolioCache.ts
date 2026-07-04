import type { PortfolioData } from '../types/portfolio';

const CACHE_KEY = 'dp-portfolio-cache-v1';
const DRAFT_KEY = 'dp-portfolio-config-draft-v1';
const PREVIEW_KEY = 'dp-portfolio-preview-v1';

interface CacheEntry {
  data: PortfolioData;
  savedAt: number;
}

interface DraftEntry {
  data: PortfolioData;
  savedAt: number;
  remoteBaseline: string;
}

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function savePortfolioCache(data: PortfolioData) {
  try {
    const entry: CacheEntry = { data, savedAt: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // 存储已满或隐私模式
  }
}

export function loadPortfolioCache(): CacheEntry | null {
  return safeParse<CacheEntry>(localStorage.getItem(CACHE_KEY));
}

export function saveConfigDraft(data: PortfolioData, remoteBaseline: string) {
  try {
    const entry: DraftEntry = { data, savedAt: Date.now(), remoteBaseline };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(entry));
  } catch {
    // ignore
  }
}

export function loadConfigDraft(): DraftEntry | null {
  return safeParse<DraftEntry>(localStorage.getItem(DRAFT_KEY));
}

export function clearConfigDraft() {
  localStorage.removeItem(DRAFT_KEY);
}

export function savePreviewData(data: PortfolioData) {
  try {
    localStorage.setItem(
      PREVIEW_KEY,
      JSON.stringify({ data, savedAt: Date.now() })
    );
  } catch {
    // ignore
  }
}

export function loadPreviewData(): { data: PortfolioData; savedAt: number } | null {
  const entry = safeParse<{ data: PortfolioData; savedAt: number }>(
    localStorage.getItem(PREVIEW_KEY)
  );
  return entry?.data ? entry : null;
}

export function clearPreviewData() {
  localStorage.removeItem(PREVIEW_KEY);
}

export function isPreviewHash(): boolean {
  return window.location.hash.includes('preview=1');
}

export function getPreviewUrl(): string {
  const base = window.location.href.split('#')[0];
  return `${base}#/?preview=1`;
}

export function formatCacheTime(ts: number): string {
  return new Date(ts).toLocaleString('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
