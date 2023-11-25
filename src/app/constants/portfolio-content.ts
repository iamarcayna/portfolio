export const navigationMenu = [
  {
    menu: 'Home',
    url: 'hero',
  },
  {
    menu: 'About',
    url: 'about',
  },
  {
    menu: 'Skills',
    url: 'skills',
  },
  {
    menu: 'Projects',
    url: 'projects',
  },
  {
    menu: 'Contact',
    url: 'contact',
  },
];
export const footerLinks = [
  {
    title: 'Socials',
    links: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/reymond-arcayna-43819826b',
        icon: 'linkedin.svg',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/iamarcayna',
        icon: 'github.svg',
      },
    ],
  },
];

export const sectionLinks = {
  title: 'Quick Links',
  links: [
    {
      name: 'Home',
      url: 'hero',
      icon: 'home.svg',
    },
    {
      name: 'About',
      url: 'about',
      icon: 'about.svg',
    },
    {
      name: 'Skills',
      url: 'skills',
      icon: 'skill.svg',
    },
    {
      name: 'Projects',
      url: 'projects',
      icon: 'project.svg',
    },
  ],
};

export const contactInfo = {
  title: 'Contact Information',
  infos: [
    {
      name: 'i.am.arcayna@gmail.com',
      url: '',
      icon: 'mail.svg',
    },
    {
      name: '09085123149',
      url: '',
      icon: 'phone.svg',
    },
    {
      name: 'Cebu, Cebu City',
      url: '',
      icon: 'location.svg',
    },
  ],
};

export const aboutMe = {
  about_first:
    "Hello, I'm Reymond. I began my journey in the shipbuilding industry, where I had the opportunity to refine my programming skills. While there, I have managed to make automation processes better and improve team performance. This hands-on experience taught me the value of creating efficient and user-friendly solutions.",
  about_second:
    'Now, as a full-stack web developer, I combine my coding knowledge and passion for crafting innovative digital experiences. I bring a keen attention to detail and a commitment to building reliable and scalable solutions, drawing from my engineering background. My career transition reflects my dedication to continuous learning, growth, and the pursuit of excellence in the ever-changing world of technology.',
  hobbies: ['Singing', 'Gaming', 'Hanging-out with friends', 'Cooking'],
  experiences: [
    {
      title: 'Full-stack Web Developer',
      company: 'Edlution Pte Ltd.',
      location: 'Mandaue, Cebu, Philippines',
      start_date: '2023-07-03',
      end_date: 'Present',
      description:
        'As a Fullstack Web Developer, my primary responsibility is to translate designs and wireframes into high-quality code using current technologies, manage software updates, patches, and bug fixes to enhance overall performance, and collaborate with cross-functional teams to define, design, and implement new features.',
      key_achievement: [
        'Quickly adapted to a time-sensitive project with numerous pending tasks and effectively prioritize them, resulting in on-time project delivery.',
      ],
      duration: '',
    },
    {
      title: 'Design Engineer I',
      company: 'Tsuneishi Technical Services (Phils)., Inc.',
      location: 'Balamban, Cebu, Philippines',
      start_date: '2019-10-15',
      end_date: '2023-05-12',
      description:
        'As a Electrical Design Engineer, my primary responsibility is to design and create detailed plans that will be used by the installation team to implement the designs. This also involves collaborating closely with cross-functional teams to ensure that our designs are optimized and error prone.',
      key_achievement: [
        'Created several custom applications using VB.net that automate repetitive task, resulting in a significant increase of productivity and efficiency.',
      ],
      duration: '',
    },
  ],
  certificates: [
    {
      title: 'Java Programming: Principles of Software Design',
      link: 'https://coursera.org/verify/MLD25Y7NGERV',
      platform: 'Coursera',
      logo: 'coursera.svg',
    },
    {
      title: 'Java Programming: Arrays, Lists, and Structured Data',
      link: 'https://coursera.org/verify/HM94FM7ATF9V',
      platform: 'Coursera',
      logo: 'coursera.svg',
    },
    {
      title: 'Java Programming: Solving Problems with Software',
      link: 'https://coursera.org/verify/DWPNLNHBP5Q3',
      platform: 'Coursera',
      logo: 'coursera.svg',
    },
    {
      title: 'Programming Foundations with Javascript, HTML and CSS',
      link: 'https://coursera.org/verify/3BQDSVAW5CQU',
      platform: 'Coursera',
      logo: 'coursera.svg',
    },
  ],
};

export const projects = [
  {
    id: 1,
    title: '[Gallery] - Simple Movie App Clone',
    description:
      'Gallery allow users to browse movies, watch movie trailers and add comments. This app utilizes the Material UI library which provides a user-friendly interface while React takes care of the smooth browsing and keeping things organized. Try out the live demo and see for yourself.',
    technologies: ['React', 'Spring Boot', 'Material UI', 'MongoDB'],
    thumbnail_mobile: [
      'project_2-mobile-1.jpg',
      'project_2-mobile-2.jpg',
      'project_2-mobile-3.jpg',
    ],
    thumbnail_desktop: 'project_2.jpg',
    github_link: 'https://github.com/iamarcayna/movie-app',
    demo_link: 'https://movie-app-iamarcayna.vercel.app/',
  },
  {
    id: 2,
    title: '[Shoppers]- E-Commerse App',
    description:
      'Shoppers let users add or remove items to their cart and checkout their cart.',
    technologies: ['Angular', 'Laravel', 'Tailwind', 'MySql'],
    thumbnail_mobile: [
      'project_2-mobile-1.jpg',
      'project_2-mobile-2.jpg',
      'project_2-mobile-3.jpg',
    ],
    thumbnail_desktop: 'project_2.jpg',
    github_link: 'https://github.com/iamarcayna',
    demo_link: 'https://github.com/iamarcayna',
  },
];

export const skills = [
  {
    name: 'HTML',
    icon: 'html.svg',
    classification: 'Frontend',
  },
  {
    name: 'CSS',
    icon: 'css.svg',
    classification: 'Frontend',
  },
  {
    name: 'Javascript',
    icon: 'js.svg',
    classification: 'Frontend',
  },
  {
    name: 'Typescript',
    icon: 'ts.svg',
    classification: 'Frontend',
  },
  {
    name: 'PHP',
    icon: 'php.svg',
    classification: 'Backend',
  },
  {
    name: 'Java',
    icon: 'java.svg',
    classification: 'Backend',
  },
  {
    name: 'React',
    icon: 'react.svg',
    classification: 'Frontend',
  },
  {
    name: 'Spring Boot',
    icon: 'spring.svg',
    classification: 'Backend',
  },
  {
    name: 'MongoDB',
    icon: 'mongo.svg',
    classification: 'Backend',
  },
  {
    name: 'Angular',
    icon: 'angular.svg',
    classification: 'Frontend',
  },
  {
    name: 'Laravel',
    icon: 'laravel.svg',
    classification: 'Backend',
  },
  {
    name: 'MySql',
    icon: 'mysql.svg',
    classification: 'Backend',
  },
  {
    name: 'Tailwind',
    icon: 'tailwind.svg',
    classification: 'Frontend',
  },
  {
    name: 'Material UI',
    icon: 'material.svg',
    classification: 'Frontend',
  },
  {
    name: 'Figma',
    icon: 'figma.svg',
    classification: 'Frontend',
  },
  {
    name: 'Git',
    icon: 'git.svg',
    classification: 'Versioning',
  },
  {
    name: 'GitHub',
    icon: 'github.svg',
    classification: 'Versioning',
  },
];
