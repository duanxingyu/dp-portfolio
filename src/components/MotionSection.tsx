import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { Variants } from 'framer-motion';
import { fadeUp, viewportOnce } from '../lib/motion';

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variants?: Variants;
  delay?: number;
}

export function MotionSection({
  children,
  className = '',
  id,
  variants = fadeUp,
  delay = 0,
}: MotionSectionProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  );
}

interface MotionDivProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

export function MotionDiv({
  children,
  className = '',
  variants = fadeUp,
  delay,
}: MotionDivProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={delay !== undefined ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
