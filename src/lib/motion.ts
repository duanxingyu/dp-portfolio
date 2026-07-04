import type { Transition, Variants } from 'framer-motion';

export const easeOutExpo: Transition['ease'] = [0.16, 1, 0.3, 1];
export const easeSmooth: Transition['ease'] = [0.22, 1, 0.36, 1];

/** 悬浮 — 轻柔上浮，无明显回弹 */
export const springFloat = {
  type: 'spring' as const,
  stiffness: 110,
  damping: 22,
  mass: 0.85,
};

/** 通用 hover — 比 float 略快一点 */
export const springHover = {
  type: 'spring' as const,
  stiffness: 140,
  damping: 24,
  mass: 0.75,
};

/** 点击 — 短促反馈 */
export const springTap = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 32,
  mass: 0.6,
};

/** 磁吸跟随 */
export const springMagnetic = {
  stiffness: 90,
  damping: 18,
  mass: 0.55,
};

/** 布局切换（分类 pill 等） */
export const springLayout = {
  type: 'spring' as const,
  stiffness: 180,
  damping: 26,
  mass: 0.8,
};

/** @deprecated 用于 tap，hover 请用 springHover / springFloat */
export const springSnappy = springTap;

export const springSoft = {
  type: 'spring' as const,
  stiffness: 200,
  damping: 26,
  mass: 0.9,
};

export const tweenSmooth: Transition = {
  duration: 0.55,
  ease: easeSmooth,
};

export const tweenImage: Transition = {
  duration: 0.75,
  ease: easeSmooth,
};

export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: '-60px',
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const gridItem: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -12,
    transition: { duration: 0.35, ease: easeSmooth },
  },
};

export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: easeSmooth } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: easeSmooth } },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: springSoft,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 12,
    transition: { duration: 0.28, ease: easeSmooth },
  },
};

/** 作品卡片 — 父子 variant 联动，避免双层 hover 冲突 */
export const projectCardVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: '0 0 0 rgba(139, 92, 246, 0)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  hover: {
    y: -5,
    scale: 1.008,
    boxShadow: '0 18px 48px rgba(139, 92, 246, 0.14)',
    borderColor: 'rgba(139, 92, 246, 0.28)',
    transition: springFloat,
  },
  tap: {
    scale: 0.992,
    y: -2,
    transition: springTap,
  },
};

export const projectImageVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: tweenImage,
  },
};

export const projectContentVariants: Variants = {
  rest: { y: 6, opacity: 0.88 },
  hover: {
    y: 0,
    opacity: 1,
    transition: springFloat,
  },
};

export const projectIconVariants: Variants = {
  rest: { opacity: 0, rotate: -30, scale: 0.85 },
  hover: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: springHover,
  },
};
