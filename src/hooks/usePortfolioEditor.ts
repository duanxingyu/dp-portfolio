import { useCallback, useEffect, useRef, useState } from 'react';
import type { PortfolioData } from '../types/portfolio';
import { downloadPortfolioJson, fetchPortfolio, isApiAvailable } from '../lib/dataSource';
import {
  clearConfigDraft,
  formatCacheTime,
  getPreviewUrl,
  loadConfigDraft,
  saveConfigDraft,
  savePortfolioCache,
  savePreviewData,
} from '../lib/portfolioCache';

const TOKEN_KEY = 'portfolio-config-token';

export function getConfigToken() {
  return sessionStorage.getItem(TOKEN_KEY) ?? '';
}

export function setConfigToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function usePortfolioEditor() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [baseline, setBaseline] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiAvailable, setApiAvailable] = useState(false);
  const [authRequired, setAuthRequired] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState<number | null>(null);
  const draftTimer = useRef<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    setDraftRestored(false);
    try {
      const json = await fetchPortfolio();
      const remoteStr = JSON.stringify(json);
      setBaseline(remoteStr);

      const draft = loadConfigDraft();
      if (draft && JSON.stringify(draft.data) !== remoteStr) {
        setData(draft.data);
        setDraftRestored(true);
        setDraftSavedAt(draft.savedAt);
      } else {
        setData(json);
        if (draft && JSON.stringify(draft.data) === remoteStr) {
          clearConfigDraft();
        }
      }

      const hasApi = await isApiAvailable();
      setApiAvailable(hasApi);

      if (hasApi) {
        try {
          const statusRes = await fetch('/api/config/status');
          if (statusRes.ok) {
            const status = await statusRes.json();
            setAuthRequired(Boolean(status.authRequired));
          }
        } catch {
          setAuthRequired(false);
        }
      } else {
        setAuthRequired(false);
      }
    } catch (e) {
      const draft = loadConfigDraft();
      if (draft?.data) {
        setData(draft.data);
        setBaseline('');
        setDraftRestored(true);
        setDraftSavedAt(draft.savedAt);
      } else {
        setError(e instanceof Error ? e.message : '加载失败');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const dirty = data ? JSON.stringify(data) !== baseline : false;

  useEffect(() => {
    if (!data || !dirty) return;

    if (draftTimer.current) window.clearTimeout(draftTimer.current);
    draftTimer.current = window.setTimeout(() => {
      saveConfigDraft(data, baseline);
      setDraftSavedAt(Date.now());
    }, 400);

    return () => {
      if (draftTimer.current) window.clearTimeout(draftTimer.current);
    };
  }, [data, baseline, dirty]);

  const save = async () => {
    if (!data) return false;
    setSaving(true);
    setError(null);

    if (!apiAvailable) {
      downloadPortfolioJson(data);
      setBaseline(JSON.stringify(data));
      savePortfolioCache(data);
      clearConfigDraft();
      setDraftRestored(false);
      setSaving(false);
      return true;
    }

    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Config-Token': getConfigToken(),
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? '保存失败');
      }
      const saved = JSON.stringify(data);
      setBaseline(saved);
      savePortfolioCache(data);
      clearConfigDraft();
      setDraftRestored(false);
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : '保存失败');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveDraft = () => {
    if (!data) return false;
    saveConfigDraft(data, baseline);
    setDraftSavedAt(Date.now());
    setDraftRestored(true);
    return true;
  };

  const preview = () => {
    if (!data) return;
    saveConfigDraft(data, baseline);
    setDraftSavedAt(Date.now());
    savePreviewData(data);
    window.open(getPreviewUrl(), '_blank', 'noopener,noreferrer');
  };

  const exportJson = () => {
    if (!data) return;
    downloadPortfolioJson(data);
  };

  const reset = () => {
    if (!baseline) return;
    setData(JSON.parse(baseline) as PortfolioData);
    clearConfigDraft();
    setDraftRestored(false);
    setDraftSavedAt(null);
    setError(null);
  };

  const discardDraft = () => {
    clearConfigDraft();
    reset();
  };

  const update = (updater: (prev: PortfolioData) => PortfolioData) => {
    setData((prev) => (prev ? updater(prev) : prev));
  };

  return {
    data,
    setData,
    update,
    loading,
    saving,
    error,
    dirty,
    authRequired,
    apiAvailable,
    draftRestored,
    draftSavedAt,
    load,
    save,
    saveDraft,
    preview,
    exportJson,
    reset,
    discardDraft,
    formatCacheTime,
  };
}
