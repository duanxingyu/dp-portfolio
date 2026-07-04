import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { SkillChip } from './SkillChip';
import { fadeUp } from '../lib/motion';

function expandItems(items: string[], minCount = 12) {
  const result = [...items];
  while (result.length < minCount) {
    result.push(...items);
  }
  return result;
}

function MarqueeRow({
  items,
  direction = 'left',
  duration = 36,
}: {
  items: string[];
  direction?: 'left' | 'right';
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const controls = useAnimationControls();

  const loop = useMemo(() => {
    const expanded = expandItems(items, 10);
    return [...expanded, ...expanded];
  }, [items]);

  const from = direction === 'left' ? '0%' : '-50%';
  const to = direction === 'left' ? '-50%' : '0%';

  useEffect(() => {
    if (reduced) return;
    controls.start({
      x: [from, to],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'loop',
      },
    });
  }, [controls, from, to, duration, reduced]);

  const restart = () => {
    controls.start({
      x: [from, to],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'linear',
        repeatType: 'loop',
      },
    });
  };

  if (reduced) {
    return (
      <div className="flex flex-wrap justify-center gap-3 px-6 py-2">
        {items.map((item, i) => (
          <SkillChip key={item} name={item} index={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden py-2"
      onMouseEnter={() => controls.stop()}
      onMouseLeave={restart}
    >
      <motion.div className="flex w-max gap-4" animate={controls}>
        {loop.map((item, i) => (
          <SkillChip key={`${item}-${i}`} name={item} index={i % items.length} />
        ))}
      </motion.div>
    </div>
  );
}

export function SkillsShowcase({ items }: { items: string[] }) {
  if (!items.length) return null;

  const mid = Math.ceil(items.length / 2);
  const row1 = items.slice(0, mid);
  const row2 = items.slice(mid).length > 0 ? items.slice(mid) : items;

  return (
    <motion.section
      className="relative w-full overflow-hidden border-y border-white/5 py-8 md:py-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
      aria-label="技能展示"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-violet-950/20" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#030014] via-[#030014]/80 to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#030014] via-[#030014]/80 to-transparent md:w-40" />

      <div className="relative mx-auto mb-6 max-w-7xl px-6">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <p className="text-xs font-medium tracking-[0.25em] text-white/55">SKILLS</p>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-violet-500/50" />
        </div>
      </div>

      <div className="relative w-full space-y-3">
        <MarqueeRow items={row1} direction="left" duration={38} />
        <MarqueeRow items={row2} direction="right" duration={34} />
      </div>
    </motion.section>
  );
}
