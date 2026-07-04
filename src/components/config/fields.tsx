import type { ReactNode } from 'react';

export function ConfigPanel({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
      <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
      {description && <p className="mt-1 text-sm text-white/55">{description}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-white/75">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-white/45">{hint}</span>}
    </label>
  );
}

const inputClass =
  'w-full rounded-xl border border-white/10 bg-[#0f0a1e] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30';

export function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputClass}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className={`${inputClass} resize-y min-h-[96px]`}
    />
  );
}

export function TagEditor({
  tags,
  onChange,
  placeholder = '输入后按 Enter 添加',
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  const add = (raw: string) => {
    const value = raw.trim();
    if (!value || tags.includes(value)) return;
    onChange([...tags, value]);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter((t) => t !== tag))}
              className="cursor-pointer text-white/40 hover:text-white"
              aria-label={`删除 ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className={`${inputClass} mt-2`}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            add((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).value = '';
          }
        }}
      />
    </div>
  );
}

export function ImagePreview({ src, alt }: { src: string; alt: string }) {
  if (!src) return null;
  return (
    <div className="mt-2 overflow-hidden rounded-xl border border-white/10 bg-black/30 p-2">
      <img src={src} alt={alt} className="mx-auto max-h-32 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
    </div>
  );
}

export function KeyValueEditor({
  pairs,
  onChange,
  labels,
}: {
  pairs: Record<string, string>;
  onChange: (pairs: Record<string, string>) => void;
  labels?: Record<string, string>;
}) {
  const entries = Object.entries(pairs);

  return (
    <div className="space-y-3">
      {entries.map(([key, value]) => (
        <div key={key} className="grid gap-2 sm:grid-cols-[120px_1fr_auto] sm:items-center">
          <span className="text-sm text-white/55">{labels?.[key] ?? key}</span>
          <TextInput value={value} onChange={(v) => onChange({ ...pairs, [key]: v })} placeholder="https://..." />
          <button
            type="button"
            onClick={() => {
              const next = { ...pairs };
              delete next[key];
              onChange(next);
            }}
            className="cursor-pointer rounded-lg border border-white/10 px-3 py-2 text-xs text-white/45 hover:text-white"
          >
            删除
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const key = prompt('社交平台标识（如 github、dribbble）');
          if (!key?.trim()) return;
          onChange({ ...pairs, [key.trim()]: '' });
        }}
        className="cursor-pointer rounded-xl border border-dashed border-white/15 px-4 py-2 text-sm text-white/55 hover:border-white/25 hover:text-white"
      >
        + 添加社交链接
      </button>
    </div>
  );
}

export function StatListEditor({
  stats,
  onChange,
}: {
  stats: { value: string; label: string }[];
  onChange: (stats: { value: string; label: string }[]) => void;
}) {
  return (
    <div className="space-y-3">
      {stats.map((stat, i) => (
        <div key={i} className="grid gap-2 sm:grid-cols-2">
          <TextInput
            value={stat.value}
            onChange={(v) => {
              const next = [...stats];
              next[i] = { ...next[i], value: v };
              onChange(next);
            }}
            placeholder="数值，如 8+"
          />
          <div className="flex gap-2">
            <TextInput
              value={stat.label}
              onChange={(v) => {
                const next = [...stats];
                next[i] = { ...next[i], label: v };
                onChange(next);
              }}
              placeholder="标签，如 完整项目"
            />
            <button
              type="button"
              onClick={() => onChange(stats.filter((_, idx) => idx !== i))}
              className="shrink-0 cursor-pointer rounded-lg border border-white/10 px-3 text-white/45 hover:text-white"
            >
              删
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...stats, { value: '', label: '' }])}
        className="cursor-pointer rounded-xl border border-dashed border-white/15 px-4 py-2 text-sm text-white/55 hover:border-white/25 hover:text-white"
      >
        + 添加统计项
      </button>
    </div>
  );
}
