import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { overlayVariants, modalVariants, springFloat } from '../lib/motion';

export function WeChatQrModal({
  wechatId,
  qrSrc,
  onClose,
}: {
  wechatId: string;
  qrSrc: string;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, true);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="微信二维码"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0f0a1e] p-6 shadow-[0_0_60px_rgba(139,92,246,0.2)] outline-none"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white/90">微信扫码添加</p>
            <p className="mt-1 text-xs text-white/55">微信号：{wechatId}</p>
          </div>
          <motion.button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full border border-white/10 p-2 text-white/55 hover:text-white focus-visible:ring-2 focus-visible:ring-violet-400/60"
            aria-label="关闭"
            whileHover={reduced ? {} : { scale: 1.06 }}
            whileTap={reduced ? {} : { scale: 0.94 }}
            transition={springFloat}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </motion.button>
        </div>
        <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-white p-3">
          <img src={qrSrc} alt={`${wechatId} 微信二维码`} className="mx-auto aspect-square w-full max-w-[220px] object-contain" />
        </div>
        <p className="mt-4 text-center text-xs text-white/55">长按识别或截图保存</p>
      </motion.div>
    </motion.div>
  );
}
