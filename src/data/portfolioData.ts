import type { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Moiz Uddin',
    title: 'Full Stack Developer & Software Engineer',
    tagline:
      'Crafting elegant solutions with modern web technologies and scalable architectures',
    avatarUrl: '/avatar.jpg',
    githubUsername: import.meta.env.VITE_GITHUB_USERNAME || 'ziowm',
  },
  about: {
    bio: `I'm a passionate full stack developer with a strong focus on creating performant, accessible, and user-friendly web applications. With expertise spanning React, TypeScript, Node.js, and modern cloud technologies, I thrive on transforming complex problems into elegant solutions. My approach combines clean code principles with a deep understanding of user experience, ensuring every project delivers both technical excellence and real value. Whether building responsive frontends or architecting scalable backends, I'm committed to continuous learning and staying at the forefront of web development.`,
    resumeUrl: '/resume.pdf',
  },
  skills: [
    {
      name: 'Languages',
      skills: [
        { name: 'TypeScript', icon: 'SiTypescript' },
        { name: 'JavaScript', icon: 'SiJavascript' },
        { name: 'Python', icon: 'SiPython' },
        { name: 'HTML5', icon: 'SiHtml5' },
        { name: 'CSS3', icon: 'SiCss3' },
      ],
    },
    {
      name: 'Frameworks & Libraries',
      skills: [
        { name: 'React', icon: 'SiReact' },
        { name: 'Node.js', icon: 'SiNodedotjs' },
        { name: 'Express', icon: 'SiExpress' },
        { name: 'Tailwind CSS', icon: 'SiTailwindcss' },
        { name: 'Next.js', icon: 'SiNextdotjs' },
      ],
    },
    {
      name: 'Tools & Platforms',
      skills: [
        { name: 'Git', icon: 'SiGit' },
        { name: 'Docker', icon: 'SiDocker' },
        { name: 'VS Code', icon: 'SiVisualstudiocode' },
        { name: 'PostgreSQL', icon: 'SiPostgresql' },
        { name: 'MongoDB', icon: 'SiMongodb' },
      ],
    },
  ],
  projects: [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description:
        'A comprehensive full-stack e-commerce solution featuring advanced product management, secure payment processing with Stripe, real-time inventory tracking, and an intuitive admin dashboard. Built with performance and scalability in mind.',
      technologies: [
        'React',
        'Node.js',
        'PostgreSQL',
        'Stripe',
        'Tailwind CSS',
        'Redis',
      ],
      imageUrl: '/projects/ecommerce.jpg',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/ziowm/ecommerce-platform',
      featured: true,
    },
    {
      id: '2',
      title: 'Task Management App',
      description:
        'A collaborative project management platform with real-time synchronization, team workspaces, drag-and-drop task boards, and advanced filtering. Supports multiple projects with role-based access control and activity tracking.',
      technologies: [
        'React',
        'TypeScript',
        'Firebase',
        'Material-UI',
        'WebSocket',
      ],
      imageUrl: '/projects/task-manager.jpg',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/ziowm/task-manager',
      featured: true,
    },
    {
      id: '3',
      title: 'Weather Dashboard',
      description:
        'An interactive weather forecasting application featuring live weather data, 7-day forecasts, interactive maps with radar overlays, and detailed analytics. Includes location search, favorites, and weather alerts with beautiful data visualizations.',
      technologies: [
        'React',
        'OpenWeather API',
        'Chart.js',
        'Tailwind CSS',
        'Mapbox',
      ],
      imageUrl: '/projects/weather-dashboard.jpg',
      githubUrl: 'https://github.com/ziowm/weather-dashboard',
      featured: true,
    },
  ],
  contact: {
    email: 'moiz.uddin@example.com',
    socialLinks: [
      {
        platform: 'GitHub',
        url: 'https://github.com/ziowm',
        icon: 'SiGithub',
      },
      {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/moizuddin',
        icon: 'SiLinkedin',
      },
      {
        platform: 'Twitter',
        url: 'https://twitter.com/moizuddin',
        icon: 'SiTwitter',
      },
    ],
  },
};
