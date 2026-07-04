import type { SkillMeta } from '../lib/skillMeta';

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export function SkillIcon({ icon, className }: { icon: SkillMeta['icon']; className?: string }) {
  const props = { width: 18, height: 18, viewBox: '0 0 24 24', className, 'aria-hidden': true as const };

  switch (icon) {
    case 'research':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" {...stroke} />
          <path d="M20 20l-4-4" {...stroke} />
          <path d="M8 11h6M11 8v6" {...stroke} />
        </svg>
      );
    case 'sketch':
      return (
        <svg {...props}>
          <path d="M4 20l4-1 9-9-3-3-9 9-1 4z" {...stroke} />
          <path d="M13 5l3 3" {...stroke} />
        </svg>
      );
    case 'model3d':
      return (
        <svg {...props}>
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" {...stroke} />
          <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" {...stroke} />
        </svg>
      );
    case 'render':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4" {...stroke} />
          <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" {...stroke} />
        </svg>
      );
    case 'prototype':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="3" {...stroke} />
          <path d="M3 9h18M9 9v12" {...stroke} />
        </svg>
      );
    case 'cmf':
      return (
        <svg {...props}>
          <circle cx="8" cy="10" r="3" {...stroke} />
          <circle cx="16" cy="10" r="3" {...stroke} />
          <path d="M5 18c1.5-2 4-3 8-3s6.5 1 8 3" {...stroke} />
        </svg>
      );
    case 'report':
      return (
        <svg {...props}>
          <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" {...stroke} />
          <path d="M14 3v5h5M9 13h6M9 17h4" {...stroke} />
        </svg>
      );
    case 'print':
      return (
        <svg {...props}>
          <path d="M6 9V4h12v5" {...stroke} />
          <rect x="6" y="14" width="12" height="7" rx="1" {...stroke} />
          <path d="M6 18H4a2 2 0 01-2-2v-4a2 2 0 012-2h16a2 2 0 012 2v4a2 2 0 01-2 2h-2" {...stroke} />
        </svg>
      );
    case 'tool':
      return (
        <svg {...props}>
          <path d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2.5 2.5-2.8-2.8 2.5-2.5z" {...stroke} />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6L12 2z" {...stroke} />
        </svg>
      );
  }
}
