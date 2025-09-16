"use client";

import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Code, Smartphone, Globe, ShoppingCart, Cloud, Star, Calendar, Users, Zap } from 'lucide-react';

const EnhancedPortfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "FixZoom - On-Demand Services App",
      subtitle: "Mobile App",
      description: "A comprehensive on-demand service platform connecting customers with skilled professionals for home maintenance, repairs, and various services.",
      longDescription: "FixZoom revolutionizes the way people access home services by creating a seamless connection between customers and verified professionals. The app features real-time booking, GPS tracking, secure payments, and a comprehensive rating system that ensures quality service delivery.",
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
      icon: "📱",
      category: "Mobile Development",
      duration: "6 months",
      teamSize: "4 developers",
      status: "Live",
      downloads: "10K+",
      rating: 4.5,
      images: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=800&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=800&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=800&fit=crop&crop=center"
      ],
      mainImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "TripZem - Tourism Platform",
      subtitle: "Mobile & Web App",
      description: "A modern tourism application that helps travelers discover destinations, plan trips, and connect with local experiences.",
      longDescription: "TripZem is a comprehensive travel companion that transforms how people explore the world. From discovering hidden gems to connecting with local guides, the platform offers personalized recommendations and seamless trip planning with offline capabilities.",
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
      icon: "🌍",
      category: "Travel & Tourism",
      duration: "8 months",
      teamSize: "3 developers",
      status: "In Development",
      rating: 4.7,
      images: [
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=800&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=800&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop&crop=center"
      ],
      mainImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      subtitle: "Web Application",
      description: "A full-stack e-commerce solution with modern UI, secure payments, and comprehensive admin dashboard.",
      longDescription: "A cutting-edge e-commerce platform built with modern web technologies, featuring advanced inventory management, real-time analytics, and a seamless shopping experience. The platform supports multiple payment gateways and provides detailed insights for business owners.",
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
      icon: "🛒",
      category: "E-Commerce",
      duration: "4 months",
      teamSize: "2 developers",
      status: "Live",
      rating: 4.3,
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=800&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=800&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop&crop=center"
      ],
      mainImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Cloud Infrastructure Automation",
      subtitle: "DevOps Solution",
      description: "DevOps project implementing CI/CD pipelines and infrastructure as code for scalable cloud deployments.",
      longDescription: "A comprehensive DevOps solution that automates cloud infrastructure deployment and management. The project implements best practices for continuous integration and deployment, ensuring reliable, scalable, and secure cloud operations.",
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
      icon: "☁️",
      category: "DevOps & Cloud",
      duration: "5 months",
      teamSize: "3 developers",
      status: "Live",
      rating: 4.8,
      images: [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=800&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=800&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=800&fit=crop&crop=center"
      ],
      mainImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&crop=center"
    }
  ];

  const getIcon = (id) => {
    const icons = {
      1: <Smartphone className="w-6 h-6" />,
      2: <Globe className="w-6 h-6" />,
      3: <ShoppingCart className="w-6 h-6" />,
      4: <Cloud className="w-6 h-6" />
    };
    return icons[id] || <Code className="w-6 h-6" />;
  };

  const ProjectCard = ({ project }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={project.mainImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 text-gray-800 text-sm rounded-full font-medium">
            {project.category}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold mb-1">{project.title}</h3>
          <p className="text-white/80 text-sm">{project.subtitle}</p>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Preview */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs rounded-full border border-blue-200 font-medium"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                +{project.techStack.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Project Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {project.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{project.rating}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{project.duration}</span>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            project.status === 'Live' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => setSelectedProject(project)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2 group"
          >
            View More
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          {project.hasDemo && (
            <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm">
              Demo
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const ProjectDetails = ({ project }) => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => setSelectedProject(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </button>
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white">
              {getIcon(project.id)}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
              <p className="text-gray-600 text-lg mb-4">{project.subtitle}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{project.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{project.teamSize}</span>
                </div>
                {project.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{project.rating}/5</span>
                  </div>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Live' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Images */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-xl">
                    <img
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Description */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Project</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {project.longDescription}
              </p>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tech Stack */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tech Stack</h3>
              <div className="space-y-3">
                {project.techStack.map((tech, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700 font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Project Links</h3>
              <div className="space-y-3">
                {project.hasDemo && (
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <ExternalLink className="w-4 h-4" />
                    View Demo
                  </button>
                )}
                {project.hasCode && (
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Code className="w-4 h-4" />
                    View Code
                  </button>
                )}
                {project.hasPlayStore && (
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium">
                    <Smartphone className="w-4 h-4" />
                    Play Store
                  </button>
                )}
              </div>
            </div>

            {/* Project Stats */}
            {project.downloads && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Project Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Downloads</span>
                    <span className="font-semibold text-gray-900">{project.downloads}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{project.rating}/5</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Live' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (selectedProject) {
    return <ProjectDetails project={selectedProject} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Featured Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore my latest work and discover the technologies that power modern applications
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 font-medium flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Code className="w-5 h-5" />
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPortfolio;