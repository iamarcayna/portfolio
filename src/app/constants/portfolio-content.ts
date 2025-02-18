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
  featuredHeader:
    'These real-world projects showcase my expertise in both frontend and backend development. Each one reflects my passion for creating efficient, user-friendly, and scalable solutions.',
  about_first:
    'I am an experienced Software Engineer specializing in creating high-quality applications that enhance user experience and improve project efficiency. With expertise in Node.js, Java, and Scala, I bring full-stack development proficiency to deliver robust front-end and back-end solutions. My strong foundation in Agile methodologies ensures adaptability and efficiency, while my ability to optimize code quality and streamline workflows significantly reduces development time and effort.',
  about_second:
    'Throughout my career, I have demonstrated a proven track record of solving complex problems and driving technical innovations. My collaborative mindset fosters effective teamwork, enabling seamless communication across project teams. By focusing on improving web functionalities and delivering impactful solutions, I consistently contribute to the success of development projects, meeting both business objectives and user needs.',
  hobbies: ['Singing', 'Gaming', 'Hanging-out with friends', 'Cooking'],
  experiences: [
    {
      title: 'Software Engineer',
      company: 'Vauldex Technologies',
      location: 'Cebu, Cebu, Philippines',
      start_date: '2024-02-05',
      end_date: 'Present',
      description:
        'Mentored other developers and help conduct thorough code reviews to ensure high-quality code that adheres to company coding standards and best practices. Implemented unit and component test using modern testing tools, ensuring code reliability, functionality, and performance throughout development.',
      key_achievement: [
        `Redesigned the company's old corporate website into a modern site, utilizing technologies like GSAP and Tailwind to create a visually engaging, and high-performance site.`,
      ],
      duration: '',
    },
    {
      title: 'Full-stack Web Developer',
      company: 'Edlution Pte Ltd.',
      location: 'Mandaue, Cebu, Philippines',
      start_date: '2023-07-03',
      end_date: '2024-02-02',
      description:
        'Transformed wireframes and Figma designs into visually stunning, responsive web applications, ensuring optimal performance across all screen sizes and devices. Collaborated closely with application testers to identify and resolve bugs and issues, ensuring a smooth and stable release before deployment to production.',
      key_achievement: [
        'Implemented Google Maps API with advanced geofencing features, allowing precise location tracking, boundary detection, and improved location-based user interactions.',
      ],
      duration: '',
    },
    {
      title: 'Design Engineer',
      company: 'Tsuneishi Technical Services (Phils)., Inc.',
      location: 'Balamban, Cebu, Philippines',
      start_date: '2019-10-15',
      end_date: '2023-05-12',
      description:
        'Created automated Excel reports and data calculation tools using VB.NET, incorporating macros to streamline repetitive tasks and enhance workflow efficiency.',
      key_achievement: [
        'Developed a Job load management application to track jobs, monitor man-hour consumption, and ensure timely delivery of deliverables, improving team efficiency and reducing delays.',
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
  featuredProjects: [
    {
      id: 1,
      title: '[Vauldex] - Corporate Portfolio Website',
      description:
        "A modernized portfolio website designed to enhance brand identity, showcase expertise, and align with current industry trends. The redesign improves user experience, visual appeal, and engagement while effectively highlighting the company's strengths.",
      technologies: ['vue.svg', 'tailwind.svg', 'sendgrid.svg', 'gsap.svg'],
      tags: [
        'UI/UX Design',
        'Responsive Design',
        'SEO Optimization',
        'Web Development',
      ],
      thumbnail_desktop: [
        'vauldex_1.jpg',
        'vauldex_2.jpg',
        'vauldex_3.jpg',
        'vauldex_4.jpg',
        'vauldex_5.jpg',
        'vauldex_6.jpg',
        'vauldex_7.jpg',
      ],
      features: [
        'SEO Best Practices - Meta tags, structured data, keyword optimization',
        'Parallax Scrolling - Smooth depth effects for a dynamic experience.',
        'Responsive Design - Optimized for all screen sizes and devices.',
        'Smooth Animations & Hover Effects - Enhance interaction and visual appeal.',
        'Google Analytics & Tracking - Monitor user behavior and engagement',
      ],
      thumbnail_gif_large: 'vauldex_1.jpg',
      thumbnail_gif_small: 'vauldex_2.jpg',
      link: 'https://vauldex.com/',
      nda: false,
    },
    {
      id: 2,
      title: 'Startup Companies Catalog',
      description:
        'A multi-tenant web application that serves as a catalog for startup health companies, providing a centralized platform for managing company portfolios. Administrators have full control over all listings, ensuring accurate and organized information, while each startup company can have designated representatives to update and maintain their own profiles. The platform also features a public page where users can search, filter, and explore detailed startup company portfolios, making it easier to discover and connect with emerging businesses in the health sector.',
      technologies: [
        'vue.svg',
        'tailwind.svg',
        'sendgrid.svg',
        'laravel.svg',
        'mysql.svg',
      ],
      tags: [
        'Responsive Design',
        'Interactive Forms',
        'Multi-tenant App',
        'Dashboard',
        'Analytics',
      ],
      thumbnail_desktop: [
        'nagoya_1.jpg',
        'nagoya_2.jpg',
        'nagoya_3.jpg',
        'nagoya_4.jpg',
        'nagoya_5.jpg',
        'nagoya_6.jpg',
        'nagoya_7.jpg',
        'nagoya_8.jpg',
      ],
      features: [
        'Admins and company representatives have distinct login portals, ensuring secure access to relevant functionalities based on their roles.',
        'Admins can create, update, and oversee all startup company portfolios, ensuring data accuracy and consistency.',
        'The admin dashboard provides insights and performance metrics for company portfolios, helping track engagement and trends.',
        'Data tables are optimized for various screen sizes, allowing easy management of large datasets on different devices.',
        "Representatives can update and maintain their company's portfolio, ensuring that information remains accurate and up-to-date.",
        'A built-in rich text editor allows representatives to format content, add images, and structure their portfolio for better presentation.',
        'A publicly accessible page enables users to search, filter, and explore startup company portfolios efficiently, making it easier to discover relevant businesses.',
      ],
      thumbnail_gif_large: 'nagoya_1.jpg',
      thumbnail_gif_small: 'nagoya_2.jpg',
      link: '',
      nda: true,
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
      'Shoppers integrates FakeStoreAPI for a complete shopping experience. Users can browse diverse products, categorically organized, add items to a cart, and simulate a checkout process. Features include product browsing, cart management, and simulating a checkout without actual transactions, providing a feel for the process. Try out the live demo and see for yourself.',
    technologies: ['Angular', 'FakeStoreApi', 'Tailwind'],
    thumbnail_mobile: [
      'project_1-mobile-1.jpg',
      'project_1-mobile-2.jpg',
      'project_1-mobile-3.jpg',
    ],
    thumbnail_desktop: 'project_1.jpg',
    github_link: 'https://github.com/iamarcayna/e-commerce',
    demo_link: 'https://e-commerce-iamarcayna.vercel.app/',
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
    name: 'Scala',
    icon: 'scala.svg',
    classification: 'Backend',
  },
  {
    name: 'Vue',
    icon: 'vue.svg',
    classification: 'Frontend',
  },
  {
    name: 'Gsap',
    icon: 'gsap.svg',
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
    name: 'SendGrid',
    icon: 'sendgrid.svg',
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
