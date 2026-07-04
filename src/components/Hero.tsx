import { motion, useReducedMotion } from 'framer-motion';
import type { StatItem } from '../types/portfolio';
import { staggerContainer, fadeUp, springFloat } from '../lib/motion';
import { InteractiveButton } from './InteractiveButton';

export function Hero({
  title,
  subtitle,
  tagline,
  description,
  status,
  stats,
}: {
  title: string;
  subtitle?: string;
  tagline: string;
  description: string;
  status?: string;
  stats?: StatItem[];
}) {
  const reduced = useReducedMotion();

  const defaultStats: StatItem[] = [
    { value: '6+', label: '完整项目' },
    { value: '3', label: '设计方向' },
    { value: '2026', label: '求职中' },
  ];
  const displayStats = stats?.length ? stats : defaultStats;

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden pt-20 pb-24">
      <motion.div
        className="relative mx-auto max-w-5xl px-6 text-center"
        variants={reduced ? undefined : staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {status && (
          <motion.p
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400 backdrop-blur-sm"
          >
            <motion.span
              className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
              animate={reduced ? {} : { scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {status}
          </motion.p>
        )}

        <motion.p variants={fadeUp} className="mb-3 text-sm font-medium tracking-widest text-white/55">
          {subtitle ?? '产品设计师'}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl"
        >
          <span className="gradient-text">{title}</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-5 font-display text-lg text-white/70 sm:text-xl md:text-2xl">
          {tagline}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg"
        >
          {description}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:mt-12 sm:gap-4">
          <InteractiveButton href="#work" magnetic className="glow-btn rounded-full px-6 py-3 text-sm font-medium text-white sm:px-8 sm:py-3.5 focus-visible:ring-2 focus-visible:ring-violet-400/60">
            查看作品
          </InteractiveButton>
          <InteractiveButton
            href="#contact"
            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/85 backdrop-blur-sm hover:border-white/30 hover:bg-white/10 hover:text-white sm:px-8 sm:py-3.5 focus-visible:ring-2 focus-visible:ring-violet-400/60"
          >
            联系方式
          </InteractiveButton>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-center sm:mt-16 sm:gap-10"
        >
          {displayStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              whileHover={reduced ? {} : { y: -3, scale: 1.03 }}
              transition={springFloat}
            >
              <p className="font-display text-xl font-bold gradient-text sm:text-2xl md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-white/55">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#work"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/55 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 rounded-sm sm:bottom-10"
        aria-label="滚动到作品区"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs tracking-widest">向下滚动</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.a>
    </section>
  );
}
