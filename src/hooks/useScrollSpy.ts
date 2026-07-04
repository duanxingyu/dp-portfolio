import { useEffect, useState } from 'react';

const SECTIONS = ['work', 'about', 'contact'] as const;
export type SectionId = (typeof SECTIONS)[number];

export function useScrollSpy(enabled = true) {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id as SectionId);
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}
