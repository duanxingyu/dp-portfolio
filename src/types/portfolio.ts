export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  poster?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  role?: string;
  year: string;
  description: string;
  cover: string;
  media: MediaItem[];
  tags: string[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  wechat?: string;
  wechatQr?: string;
  resume?: string;
}

export interface PortfolioData {
  site: {
    title: string;
    subtitle?: string;
    tagline: string;
    description: string;
    status?: string;
    location: string;
    contact: ContactInfo;
    social: Record<string, string>;
    marquee?: string[];
  };
  about: {
    avatar: string;
    bio: string;
    skills: string[];
    tools?: string[];
  };
  stats?: StatItem[];
  categories: string[];
  projects: Project[];
}
