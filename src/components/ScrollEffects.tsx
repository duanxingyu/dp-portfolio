import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    mass: 0.5,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500"
      style={{ scaleX }}
    />
  );
}

export function ScrollGlow() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [0.6, 0.3, 0.1]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[1] h-64 bg-gradient-to-b from-violet-600/20 to-transparent"
      style={{ opacity }}
      aria-hidden
    />
  );
}
