import type { MediaItem, Project } from '../../types/portfolio';
import { assetUrl } from '../../lib/dataSource';
import { ConfigPanel, Field, TextInput, TextArea, TagEditor, ImagePreview } from './fields';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || `project-${Date.now()}`;
}

function emptyProject(): Project {
  const id = `new-project-${Date.now()}`;
  return {
    id,
    title: '新作品',
    category: '产品设计',
    role: '个人项目',
    year: String(new Date().getFullYear()),
    description: '',
    cover: '',
    media: [],
    tags: [],
  };
}

function MediaRow({
  item,
  onChange,
  onRemove,
}: {
  item: MediaItem;
  onChange: (item: MediaItem) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-black/20 p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <select
          value={item.type}
          onChange={(e) => onChange({ ...item, type: e.target.value as 'image' | 'video' })}
          className="rounded-lg border border-white/10 bg-[#0f0a1e] px-3 py-1.5 text-sm text-white"
        >
          <option value="image">图片</option>
          <option value="video">视频</option>
        </select>
        <button type="button" onClick={onRemove} className="cursor-pointer text-xs text-white/45 hover:text-white">
          删除媒体
        </button>
      </div>
      <Field label="文件路径" hint="如 /assets/works/项目名/cover.svg">
        <TextInput value={item.src} onChange={(v) => onChange({ ...item, src: v })} />
      </Field>
      <Field label="说明文字">
        <TextInput value={item.alt ?? ''} onChange={(v) => onChange({ ...item, alt: v })} />
      </Field>
      {item.type === 'video' && (
        <Field label="封面图路径">
          <TextInput value={item.poster ?? ''} onChange={(v) => onChange({ ...item, poster: v })} />
        </Field>
      )}
      {item.type === 'image' && item.src && <ImagePreview src={assetUrl(item.src)} alt={item.alt ?? ''} />}
    </div>
  );
}

export function ProjectsEditor({
  projects,
  categories,
  onChange,
}: {
  projects: Project[];
  categories: string[];
  onChange: (projects: Project[]) => void;
}) {
  const editableCategories = categories.filter((c) => c !== '全部');
  const categoryOptions = editableCategories.length > 0 ? editableCategories : ['产品设计'];

  const updateProject = (index: number, patch: Partial<Project>) => {
    const next = [...projects];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  return (
    <ConfigPanel
      title="作品管理"
      description="编辑作品集卡片与 Lightbox 详情。封面与媒体文件请放到 public/assets/works/ 目录下。"
    >
      <div className="space-y-4">
        {projects.map((project, index) => (
          <details
            key={project.id}
            className="rounded-xl border border-white/8 bg-[#0f0a1e]/60 open:border-violet-500/25"
            open={projects.length <= 3}
          >
            <summary className="cursor-pointer list-none px-4 py-3 font-medium text-white/85 [&::-webkit-details-marker]:hidden">
              <div className="flex items-center justify-between gap-3">
                <span>{project.title || '未命名作品'}</span>
                <span className="text-xs text-white/45">{project.category} · {project.year}</span>
              </div>
            </summary>
            <div className="space-y-4 border-t border-white/8 p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="作品标题">
                  <TextInput
                    value={project.title}
                    onChange={(v) => {
                      const patch: Partial<Project> = { title: v };
                      if (project.id.startsWith('new-project-')) patch.id = slugify(v);
                      updateProject(index, patch);
                    }}
                  />
                </Field>
                <Field label="项目 ID" hint="URL 标识，英文或拼音">
                  <TextInput value={project.id} onChange={(v) => updateProject(index, { id: v })} />
                </Field>
                <Field label="分类">
                  <select
                    value={project.category}
                    onChange={(e) => updateProject(index, { category: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#0f0a1e] px-4 py-2.5 text-sm text-white"
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </Field>
                <Field label="年份">
                  <TextInput value={project.year} onChange={(v) => updateProject(index, { year: v })} />
                </Field>
                <Field label="角色/类型">
                  <TextInput value={project.role ?? ''} onChange={(v) => updateProject(index, { role: v })} placeholder="个人项目 / 课程项目" />
                </Field>
                <Field label="封面图路径">
                  <TextInput value={project.cover} onChange={(v) => updateProject(index, { cover: v })} />
                  <ImagePreview src={assetUrl(project.cover)} alt={project.title} />
                </Field>
              </div>
              <Field label="作品描述">
                <TextArea value={project.description} onChange={(v) => updateProject(index, { description: v })} rows={3} />
              </Field>
              <Field label="标签">
                <TagEditor tags={project.tags} onChange={(tags) => updateProject(index, { tags })} />
              </Field>
              <Field label="详情媒体（Lightbox 轮播）">
                <div className="space-y-3">
                  {project.media.map((item, mediaIndex) => (
                    <MediaRow
                      key={`${project.id}-media-${mediaIndex}`}
                      item={item}
                      onChange={(nextItem) => {
                        const media = [...project.media];
                        media[mediaIndex] = nextItem;
                        updateProject(index, { media });
                      }}
                      onRemove={() => updateProject(index, { media: project.media.filter((_, i) => i !== mediaIndex) })}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      updateProject(index, {
                        media: [...project.media, { type: 'image', src: project.cover, alt: project.title }],
                      })
                    }
                    className="cursor-pointer rounded-xl border border-dashed border-white/15 px-4 py-2 text-sm text-white/55 hover:border-white/25 hover:text-white"
                  >
                    + 添加媒体
                  </button>
                </div>
              </Field>
              <button
                type="button"
                onClick={() => {
                  if (!confirm(`确定删除「${project.title}」？`)) return;
                  onChange(projects.filter((_, i) => i !== index));
                }}
                className="cursor-pointer rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10"
              >
                删除此作品
              </button>
            </div>
          </details>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...projects, emptyProject()])}
        className="mt-4 w-full cursor-pointer rounded-xl border border-dashed border-violet-500/30 bg-violet-500/5 py-3 text-sm font-medium text-violet-300 hover:bg-violet-500/10"
      >
        + 添加新作品
      </button>
    </ConfigPanel>
  );
}
