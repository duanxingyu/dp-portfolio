import { useEffect } from 'react';

export function useSiteMeta({
  title,
  description,
  tagline,
}: {
  title: string;
  description: string;
  tagline?: string;
}) {
  useEffect(() => {
    if (!title) return;
    document.title = `${title} · 产品设计作品集`;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', `${title} · 产品设计师`, true);
    setMeta('og:description', tagline ?? description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:locale', 'zh_CN', true);
  }, [title, description, tagline]);
}
