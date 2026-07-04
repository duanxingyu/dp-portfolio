export type SkillAccent = 'cyan' | 'violet' | 'pink' | 'emerald' | 'amber';

export interface SkillMeta {
  accent: SkillAccent;
  icon: 'research' | 'sketch' | 'model3d' | 'render' | 'prototype' | 'cmf' | 'report' | 'print' | 'tool' | 'default';
}

const accentStyles: Record<SkillAccent, { bg: string; border: string; text: string; glow: string; bar: string }> = {
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/25',
    text: 'text-cyan-300',
    glow: 'group-hover:shadow-[0_0_24px_rgba(6,182,212,0.25)]',
    bar: 'bg-gradient-to-r from-cyan-400 to-transparent',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/25',
    text: 'text-violet-300',
    glow: 'group-hover:shadow-[0_0_24px_rgba(139,92,246,0.25)]',
    bar: 'bg-gradient-to-r from-violet-400 to-transparent',
  },
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/25',
    text: 'text-pink-300',
    glow: 'group-hover:shadow-[0_0_24px_rgba(236,72,153,0.25)]',
    bar: 'bg-gradient-to-r from-pink-400 to-transparent',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/25',
    text: 'text-emerald-300',
    glow: 'group-hover:shadow-[0_0_24px_rgba(16,185,129,0.25)]',
    bar: 'bg-gradient-to-r from-emerald-400 to-transparent',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/25',
    text: 'text-amber-300',
    glow: 'group-hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]',
    bar: 'bg-gradient-to-r from-amber-400 to-transparent',
  },
};

function matchIcon(name: string): SkillMeta['icon'] {
  const n = name.toLowerCase();
  if (/用户|调研|研究|ux|user/.test(n)) return 'research';
  if (/草图|概念|推演|sketch/.test(n)) return 'sketch';
  if (/rhino|建模|3d|blender|曲面/.test(n)) return 'model3d';
  if (/keyshot|渲染|render|表现/.test(n)) return 'render';
  if (/figma|原型|ui|界面|prototype/.test(n)) return 'prototype';
  if (/cmf|材质|色彩/.test(n)) return 'cmf';
  if (/报告|文档|说明/.test(n)) return 'report';
  if (/打印|验证|prototype|手板/.test(n)) return 'print';
  if (/photoshop|illustrator|ps|ai|工具|tool/.test(n)) return 'tool';
  return 'default';
}

function matchAccent(icon: SkillMeta['icon'], index: number): SkillAccent {
  const byIcon: Partial<Record<SkillMeta['icon'], SkillAccent>> = {
    research: 'cyan',
    sketch: 'pink',
    model3d: 'violet',
    render: 'amber',
    prototype: 'cyan',
    cmf: 'pink',
    report: 'emerald',
    print: 'violet',
    tool: 'amber',
  };
  const accents: SkillAccent[] = ['cyan', 'violet', 'pink', 'emerald', 'amber'];
  return byIcon[icon] ?? accents[index % accents.length];
}

export function getSkillMeta(name: string, index = 0): SkillMeta & { styles: (typeof accentStyles)[SkillAccent] } {
  const icon = matchIcon(name);
  const accent = matchAccent(icon, index);
  return { icon, accent, styles: accentStyles[accent] };
}
