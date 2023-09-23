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
  thumbnail_mobile: string;
  thumbnail_desktop: string;
  github_link: string;
  demo_link: string;
}
