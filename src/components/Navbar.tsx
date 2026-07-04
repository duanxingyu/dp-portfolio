import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useScrolled } from './AnimatedBackground';
import type { ContactInfo } from '../types/portfolio';
import type { SectionId } from '../hooks/useScrollSpy';
import { springFloat } from '../lib/motion';
import { InteractiveButton } from './InteractiveButton';

const links: { href: string; label: string; section: SectionId }[] = [
  { href: '#work', label: '作品', section: 'work' },
  { href: '#about', label: '关于', section: 'about' },
  { href: '#contact', label: '联系', section: 'contact' },
];

export function Navbar({
  title,
  contact,
  activeSection,
  className,
}: {
  title: string;
  contact?: ContactInfo;
  activeSection?: SectionId | null;
  className?: string;
}) {
  const scrolled = useScrolled();
  const reduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const linkClass = (section: SectionId) =>
    `relative text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030014] rounded-sm ${
      activeSection === section
        ? 'text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-gradient-to-r after:from-cyan-400 after:to-violet-400'
        : 'text-white/60 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-cyan-400 after:to-violet-400 after:transition-all hover:after:w-full'
    }`;

  return (
    <>
      <motion.header
        initial={reduced ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 z-50 transition-all duration-300 ${className ?? 'top-0'} ${
          scrolled || menuOpen
            ? 'border-b border-white/8 bg-[#030014]/85 backdrop-blur-xl shadow-[0_4px_30px_rgba(139,92,246,0.12)]'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4" aria-label="主导航">
          <motion.a
            href="#"
            className="font-display text-lg font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030014] rounded-sm"
            whileHover={reduced ? {} : { scale: 1.02 }}
            whileTap={reduced ? {} : { scale: 0.98 }}
            transition={springFloat}
          >
            <span className="gradient-text">{title}</span>
          </motion.a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link, i) => (
              <motion.li
                key={link.href}
                initial={reduced ? false : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
              >
                <a href={link.href} className={linkClass(link.section)} aria-current={activeSection === link.section ? 'page' : undefined}>
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {contact?.boss && (
              <InteractiveButton
                href={contact.boss}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/75 transition-colors duration-200 hover:border-white/30 hover:text-white focus-visible:ring-2 focus-visible:ring-violet-400/60 sm:inline-block"
              >
                Boss直聘
              </InteractiveButton>
            )}
            <InteractiveButton
              href="#contact"
              magnetic
              className="glow-btn hidden rounded-full px-5 py-2 text-sm font-medium text-white focus-visible:ring-2 focus-visible:ring-violet-400/60 sm:inline-block"
            >
              联系我
            </InteractiveButton>

            <motion.button
              type="button"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 text-white/70 hover:border-white/20 hover:text-white focus-visible:ring-2 focus-visible:ring-violet-400/60 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
              onClick={() => setMenuOpen((o) => !o)}
              whileTap={reduced ? {} : { scale: 0.94 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 bg-[#030014]/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.nav
              className="flex h-full flex-col items-center justify-center gap-8 px-6 pt-20"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              aria-label="移动端导航"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-display text-2xl font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 rounded-sm ${
                    activeSection === link.section ? 'gradient-text' : 'text-white/70 hover:text-white'
                  }`}
                  aria-current={activeSection === link.section ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 flex w-full max-w-xs flex-col gap-3">
                {contact?.boss && (
                  <InteractiveButton
                    href={contact.boss}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full rounded-full border border-white/15 py-3 text-center text-sm font-medium text-white/80"
                  >
                    Boss直聘
                  </InteractiveButton>
                )}
                <InteractiveButton
                  href="#contact"
                  className="glow-btn w-full rounded-full py-3 text-center text-sm font-medium text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  联系我
                </InteractiveButton>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
