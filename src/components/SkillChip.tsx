import { motion, useReducedMotion } from 'framer-motion';
import { getSkillMeta } from '../lib/skillMeta';
import { SkillIcon } from './SkillIcon';
import { springFloat } from '../lib/motion';

export function SkillChip({ name, index, compact = false }: { name: string; index: number; compact?: boolean }) {
  const reduced = useReducedMotion();
  const { icon, styles } = getSkillMeta(name, index);

  if (compact) {
    return (
      <span className="group flex shrink-0 items-center gap-3 rounded-xl border border-white/8 bg-white/[0.04] px-4 py-2.5 backdrop-blur-md transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.07]">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg border ${styles.border} ${styles.bg} ${styles.text}`}>
          <SkillIcon icon={icon} />
        </span>
        <span className="whitespace-nowrap text-sm font-medium text-white/80">{name}</span>
      </span>
    );
  }

  return (
    <motion.div
      className={`group flex shrink-0 items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 backdrop-blur-md transition-shadow duration-500 ${styles.glow}`}
      whileHover={reduced ? {} : { y: -3, scale: 1.02 }}
      transition={springFloat}
    >
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${styles.border} ${styles.bg} ${styles.text}`}>
        <SkillIcon icon={icon} />
      </span>
      <span className="whitespace-nowrap text-sm font-medium tracking-wide text-white/85">{name}</span>
    </motion.div>
  );
}
