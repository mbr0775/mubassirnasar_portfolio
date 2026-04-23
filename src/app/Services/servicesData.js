export const services = [
  {
    id: 1,
    title: "Mobile App Development",
    description: "Native iOS and Android applications with modern UI/UX design, cross-platform solutions using Flutter and React Native.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      "iOS & Android Development",
      "Flutter & React Native",
      "App Store Deployment",
      "UI/UX Design",
      "Performance Optimization"
    ],
    color: "primary"
  },
  {
    id: 2,
    title: "Web Development",
    description: "Full-stack web applications using modern frameworks like React, Next.js, Node.js with responsive design and optimal performance.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      "React & Next.js",
      "Node.js & Express",
      "Database Integration",
      "API Development",
      "Responsive Design"
    ],
    color: "primary"
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "User-centered design solutions with modern aesthetics, wireframing, prototyping, and comprehensive design systems.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4 4 4 0 004-4V5z" />
      </svg>
    ),
    features: [
      "User Research",
      "Wireframing & Prototyping",
      "Design Systems",
      "Usability Testing",
      "Brand Identity"
    ],
    color: "primary"
  },
  {
    id: 4,
    title: "DevOps & Cloud",
    description: "Scalable cloud infrastructure, CI/CD pipelines, containerization with Docker, and automated deployment solutions.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    features: [
      "AWS & Azure Cloud",
      "Docker & Kubernetes",
      "CI/CD Pipelines",
      "Infrastructure as Code",
      "Monitoring & Analytics"
    ],
    color: "primary"
  },
  {
    id: 5,
    title: "Digital Marketing",
    description: "Data-driven marketing strategies, SEO optimization, social media campaigns, and performance analytics for business growth.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    features: [
      "SEO Optimization",
      "Social Media Marketing",
      "Content Strategy",
      "Email Campaigns",
      "Analytics & Reporting"
    ],
    color: "primary"
  },
  {
    id: 6,
    title: "Consulting & Strategy",
    description: "Technical consulting, project management, digital transformation strategies, and business process optimization.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    features: [
      "Technical Consulting",
      "Project Management",
      "Digital Strategy",
      "Process Optimization",
      "Team Leadership"
    ],
    color: "primary"
  }
];

export const colorClasses = {
  primary: {
    gradient: "from-[#313E17] to-[#44561f]",
    hover: "hover:shadow-[#313E17]/25",
    border: "border-[#313E17]/50",
    icon: "text-[#313E17]",
    iconHover: "group-hover:text-[#44561f]"
  }
};