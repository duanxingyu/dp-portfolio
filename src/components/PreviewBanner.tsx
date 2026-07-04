import { motion } from 'framer-motion';
import { formatCacheTime } from '../lib/portfolioCache';

export function PreviewBanner({
  savedAt,
  onExit,
}: {
  savedAt?: number;
  onExit: () => void;
}) {
  return (
    <motion.div
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-[200] border-b border-amber-500/30 bg-amber-500/15 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3">
        <div className="text-sm text-amber-100">
          <span className="font-medium">草稿预览模式</span>
          <span className="ml-2 text-amber-200/80">
            正在预览未发布的配置
            {savedAt ? ` · ${formatCacheTime(savedAt)}` : ''}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="#/config"
            className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white/85 hover:bg-white/10"
          >
            返回配置
          </a>
          <button
            type="button"
            onClick={onExit}
            className="cursor-pointer rounded-full bg-amber-500/25 px-4 py-1.5 text-xs font-medium text-amber-100 hover:bg-amber-500/35"
          >
            退出预览
          </button>
        </div>
      </div>
    </motion.div>
  );
}
