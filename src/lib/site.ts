/**
 * Single source of truth for non-project content.
 * Project case studies live in src/content/projects as MDX.
 */

export const site = {
  name: 'Reymond Arcayna',
  role: 'Fullstack Software Engineer',
  location: 'Cebu, Philippines',
  coordinates: '10.32° N, 123.89° E',
  timezone: 'Asia/Manila',
  email: 'i.am.arcayna@gmail.com',
  description:
    'Reymond Arcayna is a fullstack software engineer in Cebu, Philippines, building interfaces, backend systems and real-time voice applications.',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/reymond-arcayna-43819826b' },
    { label: 'GitHub', href: 'https://github.com/iamarcayna' },
  ],
} as const;

export const navigation = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
] as const;

export interface Role {
  start: string;
  end: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  highlight: string;
}

export const experience: Role[] = [
  {
    start: 'Apr 2025',
    end: 'Now',
    title: 'Software Engineer',
    company: 'Pioneer Dev AI',
    location: 'Remote',
    summary:
      'Fullstack work on AI voice agents for restaurants in the UK and other countries: the agents themselves, the Node and Fastify backend they call into, and the React Router dashboards restaurants use.',
    highlight:
      'Built most of the restaurant voice receptionist end to end: the voice agent, its backend tool calls, and the dashboard.',
  },
  {
    start: '2024',
    end: '2025',
    title: 'Software Engineer',
    company: 'Vauldex Technologies',
    location: 'Cebu',
    summary:
      'Fullstack product work for clients in Japan. I mentored developers, ran code reviews, and owned testing on the projects I led.',
    highlight:
      'Rebuilt the company’s corporate site with Vue, Tailwind and GSAP, with layered illustrated scenes that stay fast.',
  },
  {
    start: '2023',
    end: '2024',
    title: 'Fullstack Web Developer',
    company: 'Edlution Pte Ltd.',
    location: 'Mandaue',
    summary:
      'Turned Figma designs into responsive production applications and worked closely with QA to ship stable releases.',
    highlight:
      'Built location features on the Google Maps API with geofencing for boundary detection and tracking.',
  },
  {
    start: '2019',
    end: '2023',
    title: 'Design Engineer',
    company: 'Tsuneishi Technical Services (Phils.), Inc.',
    location: 'Balamban',
    summary:
      'Engineering design work, where I started writing software to remove the repetitive parts of the job — VB.NET tools and automated Excel reporting.',
    highlight:
      'Wrote a job-load management application to track deliverables and man-hour consumption across the team.',
  },
];

/** Everything I work with, for the footer marquee. */
export const skills = [
  'Vue',
  'Nuxt',
  'React',
  'Next.js',
  'React Router',
  'Remix',
  'Angular',
  'TypeScript',
  'Tailwind CSS',
  'GSAP',
  'Three.js',
  'Node.js',
  'Express',
  'Fastify',
  'Laravel',
  'PHP',
  'Scala',
  'Java',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Voice agents',
  'Conversation flows',
  'LLM tool calling',
  'Speech-to-text',
  'Telephony',
  'Retell',
  'Twilio',
  'Deepgram',
  'ElevenLabs',
  'OpenAI',
  'REST APIs',
  'Figma',
  'Illustrator',
] as const;

export const archive = [
  {
    title: 'Gallery',
    kind: 'Movie browser',
    stack: 'React · Spring Boot · MongoDB',
    source: 'https://github.com/iamarcayna/movie-app',
  },
  {
    title: 'Shoppers',
    kind: 'Storefront',
    stack: 'Angular · Tailwind · FakeStore API',
    source: 'https://github.com/iamarcayna/e-commerce',
  },
] as const;
