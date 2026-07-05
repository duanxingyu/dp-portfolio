import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project } from '../types/portfolio';
import { assetUrl } from '../lib/dataSource';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { ImageWatermark } from './ImageWatermark';
import { overlayVariants, modalVariants, springFloat } from '../lib/motion';

export function Lightbox({
  project,
  watermarkText,
  onClose,
}: {
  project: Project;
  watermarkText: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const media = project.media;
  const current = media[index];
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, true);

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? media.length - 1 : i - 1));
  }, [media.length]);

  const next = useCallback(() => {
    setIndex((i) => (i === media.length - 1 ? 0 : i + 1));
  }, [media.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, prev, next]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030014]/95 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} 作品详情`}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        className="relative mx-4 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f0a1e] shadow-[0_0_80px_rgba(139,92,246,0.2)] outline-none"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex-1 overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.src}
              initial={reduced ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? undefined : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center"
            >
              {current.type === 'video' ? (
                <div className="relative w-full">
                  <video
                    src={assetUrl(current.src)}
                    poster={current.poster ? assetUrl(current.poster) : undefined}
                    controls
                    preload="metadata"
                    className="max-h-[60vh] w-full object-contain"
                  >
                    <track kind="captions" />
                  </video>
                  <ImageWatermark text={watermarkText} />
                </div>
              ) : (
                <div className="relative w-full">
                  <img
                    src={assetUrl(current.src)}
                    alt={current.alt ?? project.title}
                    draggable={false}
                    className="portfolio-image max-h-[60vh] w-full object-contain"
                  />
                  <ImageWatermark text={watermarkText} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {media.length > 1 && (
            <>
              <motion.button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/10 bg-black/60 p-2.5 text-white backdrop-blur focus-visible:ring-2 focus-visible:ring-violet-400/60"
                aria-label="上一张"
                whileHover={reduced ? {} : { scale: 1.06 }}
                whileTap={reduced ? {} : { scale: 0.94 }}
                transition={springFloat}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </motion.button>
              <motion.button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/10 bg-black/60 p-2.5 text-white backdrop-blur focus-visible:ring-2 focus-visible:ring-violet-400/60"
                aria-label="下一张"
                whileHover={reduced ? {} : { scale: 1.06 }}
                whileTap={reduced ? {} : { scale: 0.94 }}
                transition={springFloat}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </motion.button>
            </>
          )}
        </div>

        <motion.div
          className="border-t border-white/8 p-6"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs tracking-wider text-cyan-400/80">
                {project.category} · {project.year}
                {project.role ? ` · ${project.role}` : ''}
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-white">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <motion.button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-full border border-white/10 p-2 text-white/55 hover:text-white focus-visible:ring-2 focus-visible:ring-violet-400/60"
              aria-label="关闭"
              whileHover={reduced ? {} : { scale: 1.06, rotate: 90 }}
              whileTap={reduced ? {} : { scale: 0.94 }}
              transition={springFloat}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {media.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto" role="tablist" aria-label="作品媒体缩略图">
              {media.map((item, i) => (
                <motion.button
                  key={item.src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={item.alt ?? `第 ${i + 1} 张`}
                  onClick={() => setIndex(i)}
                  className={`relative h-14 w-14 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 focus-visible:ring-2 focus-visible:ring-violet-400/60 ${
                    i === index
                      ? 'border-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                      : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                  whileHover={reduced ? {} : { scale: 1.05 }}
                  whileTap={reduced ? {} : { scale: 0.96 }}
                  transition={springFloat}
                >
                  <img
                    src={assetUrl(item.type === 'video' ? (item.poster ?? project.cover) : item.src)}
                    alt=""
                    draggable={false}
                    className="portfolio-image h-full w-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
