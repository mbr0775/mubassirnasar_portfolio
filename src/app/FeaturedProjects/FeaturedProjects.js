"use client";

import React from 'react';

const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      title: "FixZoom - On-Demand Services App",
      subtitle: "Mobile App",
      description: "A comprehensive on-demand service platform connecting customers with skilled professionals for home maintenance, repairs, and various services.",
      techStack: ["Kotlin", "Jetpack Compose", "Firebase", "Google Maps API", "Payment Gateway"],
      keyFeatures: [
        "Real-time service booking",
        "GPS-based technician tracking",
        "Integrated payment system",
        "Rating & review system",
        "Multi-language support"
      ],
      hasPlayStore: true,
      hasDemo: true,
      hasCode: true,
      icon: "📱"
    },
    {
      id: 2,
      title: "TripZem - Tourism Platform",
      subtitle: "Mobile & Web App",
      description: "A modern tourism application that helps travelers discover destinations, plan trips, and connect with local experiences.",
      techStack: ["Flutter", "Node.js", "MongoDB", "Google Maps", "Weather API"],
      keyFeatures: [
        "Destination discovery",
        "Trip planning tools",
        "Local guide connections",
        "Weather integration",
        "Offline map support"
      ],
      hasPlayStore: false,
      hasDemo: true,
      hasCode: true,
      icon: "🌍"
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      subtitle: "Web Application",
      description: "A full-stack e-commerce solution with modern UI, secure payments, and comprehensive admin dashboard.",
      techStack: ["React.js", "Next.js", "Express.js", "MySQL", "Stripe API"],
      keyFeatures: [
        "Modern responsive design",
        "Secure payment processing",
        "Inventory management",
        "Order tracking system",
        "Analytics dashboard"
      ],
      hasPlayStore: false,
      hasDemo: true,
      hasCode: true,
      icon: "🛒"
    },
    {
      id: 4,
      title: "Cloud Infrastructure Automation",
      subtitle: "DevOps Solution",
      description: "DevOps project implementing CI/CD pipelines and infrastructure as code for scalable cloud deployments.",
      techStack: ["Docker", "Kubernetes", "AWS", "Terraform", "Jenkins"],
      keyFeatures: [
        "Automated deployment pipelines",
        "Container orchestration",
        "Infrastructure monitoring",
        "Auto-scaling configurations",
        "Security best practices"
      ],
      hasPlayStore: false,
      hasDemo: false,
      hasCode: true,
      icon: "☁️"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h1>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
              {/* Project Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {project.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{project.title}</h2>
                  <p className="text-gray-500 text-sm">{project.subtitle}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {project.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="text-yellow-400 mt-1 flex-shrink-0">●</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {project.hasDemo && (
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Demo
                  </button>
                )}
                {project.hasCode && (
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Code
                  </button>
                )}
                {project.hasPlayStore && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors duration-200 font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 20.5v-17c0-.553.447-1 1-1h16c.553 0 1 .447 1 1v17c0 .553-.447 1-1 1H4c-.553 0-1-.447-1-1zM12 18l4-4h-3V8H11v6H8l4 4z"/>
                    </svg>
                    Play Store
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium flex items-center gap-2 mx-auto">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            View All Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;