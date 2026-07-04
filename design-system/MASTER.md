# Portfolio Showcase — Design System

> Generated from ui-ux-pro-max reasoning: Portfolio/Personal + Portfolio Grid pattern

## Pattern: Portfolio Grid + Storytelling

| Section | Content |
|---------|---------|
| 1. Hero | Name, role, tagline, scroll indicator |
| 2. Project Grid | Masonry/filterable gallery, full-bleed thumbnails |
| 3. Project Detail | Lightbox with image carousel + video support |
| 4. About | Philosophy, skills, avatar |
| 5. Contact | Email, social links, CTA |

## Style: Motion-Driven + Aurora UI（炫酷版）

- 深色背景 `#030014` + Aurora 渐变光斑（青/紫/粉）
- 渐变流动标题文字（gradient-shift 6s）
- 滚动触发动画 + 卡片 hover 光扫/shine 效果
- 无限滚动 Marquee 技能展示条
- 分类筛选 pill 发光激活态
- Lightbox 缩放弹入 + 紫罗兰光晕边框

## 语言

- 页面 UI 与内容以**中文**为主
- 字体：Noto Sans SC（中文）+ Space Grotesk（英文装饰）

## Colors (Portfolio/Personal palette)

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#FAFAFA` | `#09090B` |
| `--surface` | `#FFFFFF` | `#18181B` |
| `--text` | `#09090B` | `#FAFAFA` |
| `--text-muted` | `#64748B` | `#A1A1AA` |
| `--accent` | `#2563EB` | `#3B82F6` |
| `--border` | `#E4E4E7` | `#3F3F46` |

## Typography

- **Display/Heading**: Space Grotesk (400, 500, 700)
- **Body**: Archivo (300, 400, 500, 600)
- Hero: 56–72px / tracking-tight / leading-none
- Section title: 32–40px
- Body: 16–18px / leading-relaxed

## Effects

- Card hover: overlay `rgba(9,9,11,0.7)` + title slide-up 8px
- Lightbox: backdrop blur 12px, scale-in 0.95→1
- Nav: sticky, backdrop-blur on scroll

## Anti-Patterns (AVOID)

- Corporate template look
- Hidden or buried portfolio
- Heavy text blocks over imagery
- Emoji as icons
- AI purple/pink gradients
- Layout-shifting hover transforms

## Pre-Delivery Checklist

- [ ] All media paths in `content/portfolio.json` — swap files without code changes
- [ ] Lazy loading for images, `preload="metadata"` for videos
- [ ] Contrast ≥4.5:1 for body text
- [ ] Keyboard navigable lightbox (Esc, arrows)
- [ ] Responsive: 375px / 768px / 1024px / 1440px
- [ ] `prefers-reduced-motion` respected
