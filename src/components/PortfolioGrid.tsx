import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import type { Project } from '../types/portfolio';
import { ProjectCard } from './ProjectCard';
import { Lightbox } from './Lightbox';
import { MotionDiv } from './MotionSection';
import { staggerContainer, fadeUp, gridItem, springFloat, springLayout } from '../lib/motion';

export function PortfolioGrid({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [selected, setSelected] = useState<Project | null>(null);
  const reduced = useReducedMotion();

  const filtered =
    activeCategory === '全部'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <MotionDiv>
          <p className="text-sm font-medium tracking-widest text-violet-400">PORTFOLIO</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
            精选<span className="gradient-text">作品</span>
          </h2>
          <p className="mt-4 max-w-lg text-white/60">
            产品设计、3D 建模、UI 界面与设计过程——按分类浏览，点击卡片查看详情图与渲染视频。
          </p>
        </MotionDiv>

        <MotionDiv className="mt-10 flex flex-wrap gap-2" delay={0.1}>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              className={`relative cursor-pointer rounded-full px-5 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030014] ${
                activeCategory === cat
                  ? 'text-white'
                  : 'border border-white/10 bg-white/5 text-white/65 hover:border-white/20 hover:text-white/90'
              }`}
              whileHover={reduced ? {} : { scale: 1.03 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
              transition={springFloat}
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="category-pill"
                  className="glow-btn absolute inset-0 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.25)]"
                  transition={springLayout}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </motion.button>
          ))}
        </MotionDiv>

        <motion.div
          className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: '-40px' }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={gridItem}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mb-6 break-inside-avoid"
              >
                <ProjectCard project={project} onClick={() => setSelected(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-12 text-center text-white/55"
            >
              该分类暂无作品
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && <Lightbox project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
