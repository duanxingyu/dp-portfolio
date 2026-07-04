import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { MotionDiv } from './MotionSection';
import { WeChatQrModal } from './WeChatQrModal';
import type { ContactInfo } from '../types/portfolio';
import { assetUrl } from '../lib/dataSource';
import { staggerContainer, fadeUp, springFloat } from '../lib/motion';
import { InteractiveButton } from './InteractiveButton';

const socialLabels: Record<string, string> = {
  behance: 'Behance',
  xiaohongshu: '小红书',
  zhihu: '知乎',
  dribbble: 'Dribbble',
  github: 'GitHub',
  instagram: 'Instagram',
};

function Toast({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      className="fixed bottom-8 left-1/2 z-[200] -translate-x-1/2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-5 py-2.5 text-sm font-medium text-emerald-300 backdrop-blur-md"
      role="status"
      aria-live="polite"
    >
      {message}
    </motion.div>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  onCopy,
  onAction,
  actionLabel,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  onCopy?: () => void;
  onAction?: () => void;
  actionLabel?: string;
}) {
  const reduced = useReducedMotion();

  const inner = (
    <motion.div
      className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/5 p-5"
      whileHover={reduced ? {} : { y: -3, borderColor: 'rgba(139, 92, 246, 0.25)', backgroundColor: 'rgba(255,255,255,0.05)' }}
      whileTap={reduced ? {} : { scale: 0.985 }}
      transition={springFloat}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400">
        {icon}
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="text-xs text-white/55">{label}</p>
        <p className="mt-1 truncate text-sm font-medium text-white/85">{value}</p>
      </div>
      <div className="flex shrink-0 flex-col gap-1">
        {onCopy && (
          <motion.button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onCopy(); }}
            className="cursor-pointer rounded-lg border border-white/10 px-2 py-1 text-xs text-white/55 hover:text-white focus-visible:ring-2 focus-visible:ring-violet-400/60"
            whileTap={reduced ? {} : { scale: 0.9 }}
          >
            复制
          </motion.button>
        )}
        {onAction && actionLabel && (
          <motion.button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAction(); }}
            className="cursor-pointer rounded-lg border border-violet-500/30 bg-violet-500/10 px-2 py-1 text-xs text-violet-300 hover:text-violet-200 focus-visible:ring-2 focus-visible:ring-violet-400/60"
            whileTap={reduced ? {} : { scale: 0.9 }}
          >
            {actionLabel}
          </motion.button>
        )}
      </div>
    </motion.div>
  );

  if (href && !onAction) {
    return <a href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 rounded-2xl">{inner}</a>;
  }
  return inner;
}

export function Contact({
  contact,
  location,
  social,
}: {
  contact: ContactInfo;
  location: string;
  social: Record<string, string>;
}) {
  const [toast, setToast] = useState<string | null>(null);
  const [showWeChatQr, setShowWeChatQr] = useState(false);
  const reduced = useReducedMotion();

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label}已复制`);
    } catch {
      showToast('复制失败，请手动复制');
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      <div className="relative mx-auto max-w-3xl px-6">
        <MotionDiv className="text-center">
          <p className="text-sm font-medium tracking-widest text-pink-400">CONTACT</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
            期待与您<span className="gradient-text">交流</span>
          </h2>
          <p className="mt-4 text-white/60">{location}</p>
        </MotionDiv>

        <motion.div
          className="mt-12 grid gap-4 sm:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp}>
            <ContactCard
              label="邮箱"
              value={contact.email}
              href={`mailto:${contact.email}`}
              onCopy={() => copy(contact.email, '邮箱')}
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16v16H4z" /><path d="M4 8l8 5 8-5" />
                </svg>
              }
            />
          </motion.div>
          {contact.phone && (
            <motion.div variants={fadeUp}>
              <ContactCard
                label="手机"
                value={contact.phone}
                href={`tel:${contact.phone.replace(/-/g, '')}`}
                onCopy={() => copy(contact.phone!, '手机号')}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6.6 10.8a15.9 15.9 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11 11 0 003.5.56 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11 11 0 00.56 3.5 1 1 0 01-.24 1z" />
                  </svg>
                }
              />
            </motion.div>
          )}
          {contact.wechat && (
            <motion.div variants={fadeUp} className={contact.wechatQr ? 'sm:col-span-2' : undefined}>
              <ContactCard
                label="微信"
                value={contact.wechat}
                onCopy={() => copy(contact.wechat!, '微信号')}
                onAction={contact.wechatQr ? () => setShowWeChatQr(true) : undefined}
                actionLabel={contact.wechatQr ? '二维码' : undefined}
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 12a2 2 0 100-4 2 2 0 000 4zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path d="M2 12c0-4 4-7 10-7s10 3 10 7-4 7-10 7c-1.1 0-2.1-.1-3-.4L2 20l1.4-4.2C2.5 14.5 2 13.3 2 12z" />
                  </svg>
                }
              />
            </motion.div>
          )}
          {contact.boss && (
            <motion.div variants={fadeUp} className="sm:col-span-2">
              <InteractiveButton
                href={contact.boss}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#00bebd]/30 bg-[#00bebd]/10 p-5 hover:border-[#00bebd]/50 hover:bg-[#00bebd]/15 focus-visible:ring-2 focus-visible:ring-violet-400/60"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#00bebd]">
                  <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
                  <path d="M4 20c2-3.5 5-5 8-5s6 1.5 8 5" />
                </svg>
                <span className="text-sm font-medium text-white/85">Boss直聘 · 查看主页</span>
              </InteractiveButton>
            </motion.div>
          )}
        </motion.div>

        {Object.keys(social).length > 0 && (
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {Object.entries(social).map(([key, url]) => (
              <motion.a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                whileHover={reduced ? {} : { y: -2, scale: 1.03 }}
                whileTap={reduced ? {} : { scale: 0.97 }}
                transition={springFloat}
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/55 hover:border-white/25 hover:text-white focus-visible:ring-2 focus-visible:ring-violet-400/60"
              >
                {socialLabels[key] ?? key}
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>{toast && <Toast message={toast} />}</AnimatePresence>
      <AnimatePresence>
        {showWeChatQr && contact.wechatQr && contact.wechat && (
          <WeChatQrModal
            wechatId={contact.wechat}
            qrSrc={assetUrl(contact.wechatQr)}
            onClose={() => setShowWeChatQr(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export function Footer({ title }: { title: string }) {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-white/45 md:flex-row">
        <p>© {new Date().getFullYear()} {title} · 产品设计作品集</p>
        <div className="flex items-center gap-4">
          <p>欢迎联系 · 期待合作机会</p>
          <a
            href="#/config"
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/45 hover:border-white/20 hover:text-white/70 focus-visible:ring-2 focus-visible:ring-violet-400/60"
          >
            配置
          </a>
        </div>
      </div>
    </footer>
  );
}
