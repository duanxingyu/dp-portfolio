# 产品设计 · 求职作品集

面向**产品设计师投简历**的个人作品展示站。支持 3D 渲染图、设计草图、UI 界面、设计过程文档及 360° 展示视频。

## 快速开始

```bash
pnpm install
pnpm run dev
```

访问 **http://localhost:5173**

## 第一步：改个人信息

编辑 `content/portfolio.json`：

```json
{
  "site": {
    "title": "你的姓名",
    "subtitle": "产品设计师",
    "status": "开放全职 / 实习机会",
    "contact": {
      "email": "your.email@example.com",
      "phone": "138-0000-0000",
      "wechat": "your_wechat_id",
      "resume": "/assets/resume.pdf"
    }
  }
}
```

将 PDF 简历放入 `public/assets/resume.pdf`，导航栏和联系区会出现「下载简历」按钮。

## 第二步：上传作品

每个项目一个文件夹，按需放入图片或视频：

```
public/assets/works/
└── smart-speaker/          ← 项目文件夹名与 json 中 id 对应
    ├── cover.jpg           ← 封面（列表页展示）
    ├── sketch.jpg          ← 草图 / 设计图
    ├── render.jpg          ← 渲染图
    ├── cmf.jpg             ← 材质板
    └── turntable.mp4       ← 3D 旋转展示视频（可选）
```

然后在 `portfolio.json` 的 `projects` 数组中添加或修改：

```json
{
  "id": "smart-speaker",
  "title": "智能音箱 · 家居系列",
  "category": "产品设计",
  "role": "个人项目",
  "year": "2025",
  "description": "项目简介，写设计目标、你的职责和成果",
  "cover": "/assets/works/smart-speaker/cover.jpg",
  "media": [
    { "type": "image", "src": "/assets/works/smart-speaker/cover.jpg", "alt": "渲染主图" },
    { "type": "image", "src": "/assets/works/smart-speaker/sketch.jpg", "alt": "草图" },
    { "type": "video", "src": "/assets/works/smart-speaker/turntable.mp4", "poster": "/assets/works/smart-speaker/cover.jpg" }
  ],
  "tags": ["Rhino", "Keyshot", "CMF"]
}
```

### 作品分类

| 分类 | 适合放什么 |
|------|-----------|
| **产品设计** | 完整产品方案、渲染图、CMF、结构示意 |
| **3D 建模** | 建模作品、线框图、360° 旋转视频 |
| **UI 设计** | App / 网页界面、设计系统 |
| **设计过程** | 灵感板、草图风暴、迭代对比、设计报告截图 |

### 支持的媒体格式

- 图片：`.jpg` `.png` `.webp` `.svg`
- 视频：`.mp4` `.webm`（3D 旋转展示、过程录像，需设置 `poster` 封面）

## 第三步：更新关于我

```json
"about": {
  "avatar": "/assets/about/avatar.jpg",
  "bio": "一段话介绍你的背景与优势",
  "skills": ["用户调研", "3D 建模", "渲染表现"],
  "tools": ["Rhino", "Keyshot", "Figma"]
}
```

## 生产部署

```bash
pnpm run build
pnpm start
```

访问 http://localhost:3001，可把这个链接直接写在简历里。

## 投简历建议

1. **封面图**选最能代表项目的渲染图，保持统一比例
2. 每个项目 **3–5 张图**：草图 → 过程 → 终稿，讲清楚设计故事
3. 3D 项目可附 **15–30 秒旋转视频**，比静态图更有说服力
4. 联系区确保 **邮箱 + 手机 + 微信** 至少填两项
5. 简历 PDF 和作品集链接 **同时提供**，方便 HR 不同习惯
