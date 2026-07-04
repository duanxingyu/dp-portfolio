import { useMemo, useRef, useState, type ChangeEvent } from 'react';
import type { PortfolioData } from '../types/portfolio';
import { assetUrl } from '../lib/dataSource';
import { getConfigToken, setConfigToken, usePortfolioEditor } from '../hooks/usePortfolioEditor';
import { ProjectsEditor } from '../components/config/ProjectsEditor';
import {
  ConfigPanel,
  Field,
  TextInput,
  TextArea,
  TagEditor,
  ImagePreview,
  KeyValueEditor,
  StatListEditor,
} from '../components/config/fields';

type TabId = 'site' | 'contact' | 'about' | 'skills' | 'stats' | 'projects';

const tabs: { id: TabId; label: string }[] = [
  { id: 'site', label: '站点信息' },
  { id: 'contact', label: '联系方式' },
  { id: 'about', label: '关于我' },
  { id: 'skills', label: '技能展示' },
  { id: 'stats', label: '数据统计' },
  { id: 'projects', label: '作品管理' },
];

const socialLabels: Record<string, string> = {
  behance: 'Behance',
  xiaohongshu: '小红书',
  zhihu: '知乎',
  dribbble: 'Dribbble',
  github: 'GitHub',
  instagram: 'Instagram',
};

function SiteSection({ data, update }: { data: PortfolioData; update: ReturnType<typeof usePortfolioEditor>['update'] }) {
  return (
    <ConfigPanel title="Hero 区域" description="首页大标题、副标题与个人介绍。">
      <Field label="姓名 / 品牌名">
        <TextInput value={data.site.title} onChange={(v) => update((d) => ({ ...d, site: { ...d.site, title: v } }))} />
      </Field>
      <Field label="职业头衔">
        <TextInput value={data.site.subtitle ?? ''} onChange={(v) => update((d) => ({ ...d, site: { ...d.site, subtitle: v } }))} placeholder="产品设计师" />
      </Field>
      <Field label="一句话标签">
        <TextInput value={data.site.tagline} onChange={(v) => update((d) => ({ ...d, site: { ...d.site, tagline: v } }))} />
      </Field>
      <Field label="详细介绍">
        <TextArea value={data.site.description} onChange={(v) => update((d) => ({ ...d, site: { ...d.site, description: v } }))} />
      </Field>
      <Field label="求职状态">
        <TextInput value={data.site.status ?? ''} onChange={(v) => update((d) => ({ ...d, site: { ...d.site, status: v } }))} placeholder="开放全职 / 实习机会" />
      </Field>
      <Field label="所在城市">
        <TextInput value={data.site.location} onChange={(v) => update((d) => ({ ...d, site: { ...d.site, location: v } }))} />
      </Field>
    </ConfigPanel>
  );
}

function ContactSection({ data, update }: { data: PortfolioData; update: ReturnType<typeof usePortfolioEditor>['update'] }) {
  return (
    <>
      <ConfigPanel title="联系信息">
        <Field label="邮箱">
          <TextInput value={data.site.contact.email} onChange={(v) => update((d) => ({ ...d, site: { ...d.site, contact: { ...d.site.contact, email: v } } }))} />
        </Field>
        <Field label="手机">
          <TextInput value={data.site.contact.phone ?? ''} onChange={(v) => update((d) => ({ ...d, site: { ...d.site, contact: { ...d.site.contact, phone: v } } }))} />
        </Field>
        <Field label="微信号">
          <TextInput value={data.site.contact.wechat ?? ''} onChange={(v) => update((d) => ({ ...d, site: { ...d.site, contact: { ...d.site.contact, wechat: v } } }))} />
        </Field>
        <Field label="微信二维码" hint="图片路径，如 /assets/about/wechat-qr.png">
          <TextInput value={data.site.contact.wechatQr ?? ''} onChange={(v) => update((d) => ({ ...d, site: { ...d.site, contact: { ...d.site.contact, wechatQr: v } } }))} />
          {data.site.contact.wechatQr && <ImagePreview src={assetUrl(data.site.contact.wechatQr)} alt="微信二维码" />}
        </Field>
        <Field label="Boss直聘主页" hint="填写完整链接，如 https://www.zhipin.com/web/geek/...">
          <TextInput value={data.site.contact.boss ?? ''} onChange={(v) => update((d) => ({ ...d, site: { ...d.site, contact: { ...d.site.contact, boss: v } } }))} placeholder="https://www.zhipin.com/web/geek/..." />
        </Field>
      </ConfigPanel>
      <ConfigPanel title="社交链接">
        <KeyValueEditor
          pairs={data.site.social}
          labels={socialLabels}
          onChange={(social) => update((d) => ({ ...d, site: { ...d.site, social } }))}
        />
      </ConfigPanel>
    </>
  );
}

function AboutSection({ data, update }: { data: PortfolioData; update: ReturnType<typeof usePortfolioEditor>['update'] }) {
  return (
    <ConfigPanel title="关于我" description="About 区块的头像、简介与常用工具。">
      <Field label="头像路径" hint="如 /assets/about/avatar.jpg">
        <TextInput value={data.about.avatar} onChange={(v) => update((d) => ({ ...d, about: { ...d.about, avatar: v } }))} />
        <ImagePreview src={assetUrl(data.about.avatar)} alt="头像预览" />
      </Field>
      <Field label="个人简介">
        <TextArea value={data.about.bio} onChange={(v) => update((d) => ({ ...d, about: { ...d.about, bio: v } }))} rows={5} />
      </Field>
      <Field label="常用工具">
        <TagEditor tags={data.about.tools ?? []} onChange={(tools) => update((d) => ({ ...d, about: { ...d.about, tools } }))} />
      </Field>
    </ConfigPanel>
  );
}

function SkillsSection({ data, update }: { data: PortfolioData; update: ReturnType<typeof usePortfolioEditor>['update'] }) {
  return (
    <>
      <ConfigPanel title="技能跑马灯" description="Hero 下方双行滚动的技能标签。">
        <TagEditor
          tags={data.site.marquee ?? []}
          onChange={(marquee) => update((d) => ({ ...d, site: { ...d.site, marquee } }))}
        />
      </ConfigPanel>
      <ConfigPanel title="作品分类" description="「全部」会自动保留，此处编辑其他筛选项。">
        <TagEditor
          tags={data.categories.filter((c) => c !== '全部')}
          onChange={(cats) => update((d) => ({ ...d, categories: ['全部', ...cats.filter((c) => c !== '全部')] }))}
        />
      </ConfigPanel>
    </>
  );
}

function StatsSection({ data, update }: { data: PortfolioData; update: ReturnType<typeof usePortfolioEditor>['update'] }) {
  return (
    <ConfigPanel title="Hero 数据统计" description="首页底部的三个数字指标。">
      <StatListEditor
        stats={data.stats ?? []}
        onChange={(stats) => update((d) => ({ ...d, stats }))}
      />
    </ConfigPanel>
  );
}

export default function ConfigPage() {
  const {
    data,
    update,
    loading,
    saving,
    error,
    dirty,
    authRequired,
    apiAvailable,
    draftRestored,
    draftSavedAt,
    save,
    saveDraft,
    preview,
    importFromFile,
    exportJson,
    reset,
    discardDraft,
    load,
    formatCacheTime,
  } = usePortfolioEditor();
  const [tab, setTab] = useState<TabId>('site');
  const [tokenInput, setTokenInput] = useState(getConfigToken());
  const [toast, setToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeTabContent = useMemo(() => {
    if (!data) return null;
    switch (tab) {
      case 'site':
        return <SiteSection data={data} update={update} />;
      case 'contact':
        return <ContactSection data={data} update={update} />;
      case 'about':
        return <AboutSection data={data} update={update} />;
      case 'skills':
        return <SkillsSection data={data} update={update} />;
      case 'stats':
        return <StatsSection data={data} update={update} />;
      case 'projects':
        return (
          <ProjectsEditor
            projects={data.projects}
            categories={data.categories}
            onChange={(projects) => update((d) => ({ ...d, projects }))}
          />
        );
      default:
        return null;
    }
  }, [data, tab, update]);

  const handleSaveDraft = () => {
    if (saveDraft()) {
      setToast('草稿已保存到本地');
      setTimeout(() => setToast(null), 2500);
    }
  };

  const handlePreview = () => {
    preview();
    setToast('已在新标签页打开草稿预览');
    setTimeout(() => setToast(null), 2500);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    const ok = await importFromFile(file);
    if (ok) {
      setToast(`已导入 ${file.name}`);
      setTimeout(() => setToast(null), 2500);
    }
  };

  const handleSave = async () => {
    setConfigToken(tokenInput.trim());
    const ok = await save();
    if (ok) {
      setToast(
        apiAvailable
          ? '已保存到 content/portfolio.json'
          : '已导出 portfolio.json，请替换仓库中 content/portfolio.json 后重新部署'
      );
      setTimeout(() => setToast(null), 3500);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030014] text-white/60">
        加载配置中…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#030014] px-6 text-center">
        <p className="text-white/80">配置加载失败</p>
        <p className="text-sm text-white/55">{error}</p>
        <button type="button" onClick={load} className="cursor-pointer rounded-full bg-violet-600 px-5 py-2 text-sm text-white">
          重试
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] text-white">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleImportFile}
      />
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#030014]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="font-display text-xl font-bold">作品集配置</h1>
            <p className="text-xs text-white/45">
              {dirty && draftSavedAt
                ? `本地草稿已自动缓存 · ${formatCacheTime(draftSavedAt)}`
                : apiAvailable
                  ? '修改后保存，刷新首页即可看到效果'
                  : 'GitHub Pages 静态模式：保存将导出 JSON 文件'}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <a
              href="#/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/55 hover:text-white"
            >
              线上版本
            </a>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="cursor-pointer rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200 hover:bg-violet-500/20"
            >
              保存草稿
            </button>
            <button
              type="button"
              onClick={handlePreview}
              className="cursor-pointer rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200 hover:bg-cyan-500/20"
            >
              预览
            </button>
            <button
              type="button"
              onClick={handleImportClick}
              className="cursor-pointer rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:text-white"
            >
              导入 JSON
            </button>
            {!apiAvailable && (
              <button
                type="button"
                onClick={exportJson}
                className="cursor-pointer rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:text-white"
              >
                导出 JSON
              </button>
            )}
            <button
              type="button"
              disabled={!dirty || saving}
              onClick={reset}
              className="cursor-pointer rounded-full border border-white/10 px-4 py-2 text-sm text-white/55 hover:text-white disabled:opacity-40"
            >
              撤销
            </button>
            <button
              type="button"
              disabled={!dirty || saving}
              onClick={handleSave}
              className="cursor-pointer rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              {saving ? '保存中…' : !dirty ? '已保存' : apiAvailable ? '保存更改' : '导出并发布'}
            </button>
          </div>
        </div>
      </header>

      {draftRestored && (
        <div className="border-b border-violet-500/20 bg-violet-500/10 px-6 py-3">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-violet-100">
              已从本地缓存恢复未保存的编辑
              {draftSavedAt ? `（${formatCacheTime(draftSavedAt)}）` : ''}
            </p>
            <button
              type="button"
              onClick={discardDraft}
              className="cursor-pointer rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:text-white"
            >
              丢弃草稿，使用线上版本
            </button>
          </div>
        </div>
      )}

      {!apiAvailable && (
        <div className="border-b border-cyan-500/20 bg-cyan-500/10 px-6 py-3 text-sm text-cyan-100">
          当前为静态托管模式。修改后点击「导出并保存」下载 JSON，替换仓库中的 <code className="text-cyan-200">content/portfolio.json</code> 和 <code className="text-cyan-200">public/portfolio.json</code>，提交后 GitHub Actions 会自动重新部署。
        </div>
      )}

      {authRequired && apiAvailable && (
        <div className="border-b border-amber-500/20 bg-amber-500/10 px-6 py-3">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
            <span className="text-sm text-amber-200">保存需要配置密钥</span>
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="CONFIG_TOKEN"
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white"
            />
            <button
              type="button"
              onClick={() => setConfigToken(tokenInput.trim())}
              className="cursor-pointer rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70"
            >
              记住密钥
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="border-b border-red-500/20 bg-red-500/10 px-6 py-3 text-center text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[220px_1fr]">
        <nav className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`cursor-pointer rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                tab === item.id
                  ? 'bg-violet-500/20 text-violet-200'
                  : 'text-white/55 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="min-w-0 space-y-6 pb-24">{activeTabContent}</div>
      </div>

      {dirty && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/8 bg-[#030014]/95 px-6 py-3 backdrop-blur-xl lg:hidden">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex-1 cursor-pointer rounded-full border border-violet-500/30 py-3 text-sm font-medium text-violet-200"
            >
              保存草稿
            </button>
            <button
              type="button"
              onClick={handlePreview}
              className="flex-1 cursor-pointer rounded-full border border-cyan-500/30 py-3 text-sm font-medium text-cyan-200"
            >
              预览
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="flex-1 cursor-pointer rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 py-3 text-sm font-medium text-white disabled:opacity-40"
            >
              {saving ? '保存中…' : '发布'}
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-5 py-2 text-sm text-emerald-300">
          {toast}
        </div>
      )}
    </div>
  );
}
