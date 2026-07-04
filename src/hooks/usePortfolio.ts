import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchPortfolio } from '../lib/dataSource';
import {
  clearPreviewData,
  isPreviewHash,
  loadPortfolioCache,
  loadPreviewData,
} from '../lib/portfolioCache';

export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function usePortfolio() {
  const [data, setData] = useState<import('../types/portfolio').PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [previewSavedAt, setPreviewSavedAt] = useState<number | undefined>();

  const loadLive = useCallback(() => {
    setLoading(true);
    const cached = loadPortfolioCache();
    if (cached?.data) {
      setData(cached.data);
      setFromCache(true);
      setLoading(false);
    }

    fetchPortfolio()
      .then((fresh) => {
        setData(fresh);
        setFromCache(false);
        setError(null);
      })
      .catch((e) => {
        const fallback = loadPortfolioCache();
        if (fallback?.data) {
          setData(fallback.data);
          setFromCache(true);
        } else {
          setError(e instanceof Error ? e.message : '加载失败');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const preview = isPreviewHash() ? loadPreviewData() : null;
    if (preview?.data) {
      setData(preview.data);
      setPreviewMode(true);
      setPreviewSavedAt(preview.savedAt);
      setLoading(false);
      setError(null);
      return;
    }

    setPreviewMode(false);
    setPreviewSavedAt(undefined);
    loadLive();
  }, [loadLive]);

  const exitPreview = () => {
    clearPreviewData();
    setPreviewMode(false);
    setPreviewSavedAt(undefined);
    window.location.hash = '#/';
    loadLive();
  };

  return {
    data,
    loading,
    error,
    fromCache,
    previewMode,
    previewSavedAt,
    exitPreview,
  };
}
