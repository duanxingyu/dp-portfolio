import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import type { ReactNode, MouseEvent, RefObject } from 'react';
import { useRef } from 'react';
import { springFloat, springMagnetic } from '../lib/motion';

interface InteractiveButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  onClick?: () => void;
  magnetic?: boolean;
}

export function InteractiveButton({
  children,
  className = '',
  href,
  download,
  target,
  rel,
  onClick,
  magnetic = false,
}: InteractiveButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, springMagnetic);
  const y = useSpring(my, springMagnetic);

  const handleMouseMove = (e: MouseEvent) => {
    if (reduced || !magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.1);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.12);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const motionProps = reduced
    ? {}
    : {
        whileHover: { scale: 1.025, y: -2 },
        whileTap: { scale: 0.975 },
        transition: springFloat,
      };

  const springStyle = magnetic && !reduced ? { x, y } : undefined;

  if (href) {
    return (
      <motion.a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        download={download || undefined}
        target={target}
        rel={rel}
        className={className}
        style={springStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as RefObject<HTMLButtonElement>}
      type="button"
      className={className}
      style={springStyle}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
