import { assetUrl } from '../lib/dataSource';
import { motion, useReducedMotion } from 'framer-motion';
import { MotionSection } from './MotionSection';
import { getSkillMeta } from '../lib/skillMeta';
import { SkillIcon } from './SkillIcon';
import { slideFromLeft, slideFromRight, staggerContainer, fadeUp, springFloat } from '../lib/motion';

function ToolBadge({ name, index }: { name: string; index: number }) {
  const reduced = useReducedMotion();
  const { icon, styles } = getSkillMeta(name, index);

  return (
    <motion.li
      variants={fadeUp}
      whileHover={reduced ? {} : { scale: 1.05, y: -2 }}
      transition={springFloat}
      className={`flex items-center gap-2 rounded-xl border ${styles.border} ${styles.bg} px-3.5 py-2`}
    >
      <span className={styles.text}>
        <SkillIcon icon={icon} className="h-4 w-4" />
      </span>
      <span className="text-sm font-medium text-white/80">{name}</span>
    </motion.li>
  );
}

export function About({
  avatar,
  bio,
  tools,
}: {
  avatar: string;
  bio: string;
  tools?: string[];
}) {
  const reduced = useReducedMotion();

  return (
    <MotionSection
      id="about"
      className="relative scroll-mt-24 border-t border-white/5 py-24 md:py-32"
      variants={fadeUp}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromLeft}
        >
          <motion.div
            className="relative mx-auto max-w-md"
            whileHover={reduced ? {} : { scale: 1.015, rotate: -0.5 }}
            transition={springFloat}
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-pink-500/20 blur-2xl" />
            <img
              src={assetUrl(avatar)}
              alt="个人照片"
              loading="lazy"
              className="relative aspect-[3/4] w-full rounded-2xl border border-white/10 object-cover shadow-2xl"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideFromRight}
        >
          <p className="text-sm font-medium tracking-widest text-cyan-400">ABOUT</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            关于<span className="gradient-text">我</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/65 md:text-lg">{bio}</p>

          {tools && tools.length > 0 && (
            <motion.div
              className="mt-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium tracking-wider text-white/55">常用工具</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tools.map((tool, i) => (
                  <ToolBadge key={tool} name={tool} index={i} />
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      </div>
    </MotionSection>
  );
}
