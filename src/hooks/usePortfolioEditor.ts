import { useCallback, useEffect, useState } from 'react';
import type { PortfolioData } from '../types/portfolio';
import { downloadPortfolioJson, fetchPortfolio, isApiAvailable } from '../lib/dataSource';

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

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const json = await fetchPortfolio();
      setData(json);
      setBaseline(JSON.stringify(json));

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
      setError(e instanceof Error ? e.message : '加载失败');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const dirty = data ? JSON.stringify(data) !== baseline : false;

  const save = async () => {
    if (!data) return false;
    setSaving(true);
    setError(null);

    if (!apiAvailable) {
      downloadPortfolioJson(data);
      setBaseline(JSON.stringify(data));
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
      setBaseline(JSON.stringify(data));
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : '保存失败');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const exportJson = () => {
    if (!data) return;
    downloadPortfolioJson(data);
  };

  const reset = () => {
    if (!baseline) return;
    setData(JSON.parse(baseline) as PortfolioData);
    setError(null);
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
    load,
    save,
    exportJson,
    reset,
  };
}
