import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();

  const y1 = useTransform(scrollY, [0, 800], [0, reduced ? 0 : 120]);
  const y2 = useTransform(scrollY, [0, 800], [0, reduced ? 0 : -80]);
  const y3 = useTransform(scrollY, [0, 800], [0, reduced ? 0 : 60]);
  const scale = useTransform(scrollY, [0, 600], [1, reduced ? 1 : 1.15]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#030014]" />
      <motion.div style={{ y: y1, scale }} className="absolute -left-32 -top-32">
        <div
          className="aurora-blob-1 h-[600px] w-[600px] rounded-full opacity-30 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)' }}
        />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute -right-24 top-1/4">
        <div
          className="aurora-blob-2 h-[500px] w-[500px] rounded-full opacity-25 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
        />
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute bottom-0 left-1/3">
        <div
          className="aurora-blob-3 h-[400px] w-[400px] rounded-full opacity-20 blur-[90px]"
          style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)' }}
        />
      </motion.div>
      <div className="noise-overlay absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139,92,246,0.08), transparent 60%)',
        }}
      />
    </div>
  );
}

export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
