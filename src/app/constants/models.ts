export interface Skill {
  name: string;
  icon: string;
  classification: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  thumbnail_mobile: string[];
  thumbnail_desktop: string;
  github_link: string;
  demo_link: string;
}

export interface FeaturedProject {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  tags: string[];
  thumbnail_mobile: string[];
  thumbnail_desktop: string[];
  thumbnail_gif_large: string;
  thumbnail_gif_small: string;
  link?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
  key_achievement: Array<string>;
  duration: string;
}

export interface Certificate {
  title: string;
  link: string;
  platform: string;
  logo: string;
}
