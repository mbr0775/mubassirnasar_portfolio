"use client";

import React, { useState, useEffect, useRef } from 'react';

const ProjectWorks = () => {
  const [visibleProjects, setVisibleProjects] = useState(new Set());
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const headerRef = useRef(null);
  const projectRefs = useRef([]);

  const categories = [
    { id: 'all', label: 'All Projects', icon: '🎯' },
    { id: 'mobile', label: 'Mobile Apps', icon: '📱' },
    { id: 'web', label: 'Web Apps', icon: '🌐' },
    { id: 'marketing', label: 'Digital Marketing', icon: '📈' },
    { id: 'devops', label: 'DevOps & SRE', icon: '⚙️' }
  ];

  const projects = [
    {
      id: 1,
      title: "FixZoom - On-Demand Service App",
      category: "mobile",
      description: "A comprehensive mobile app connecting service providers with customers for home repairs, maintenance, and professional services.",
      image: "🔧", // Placeholder - replace with actual image
      technologies: ["React Native", "Node.js", "MongoDB", "RESTful APIs & GraphQL"],
      features: [
        "Real-time booking system",
        "GPS-based service matching",
        "In-app messaging",
        "Payment integration",
        "Rating & review system"
      ],
      liveUrl: "https://fixzoom.app",
      githubUrl: "https://github.com/jacksonford/fixzoom",
      status: "Live",
      duration: "6 months",
      role: "Full-Stack Developer"
    },
    {
      id: 2,
      title: "TripZem - Tourism Platform",
      category: "web",
      description: "A modern tourism platform offering personalized travel experiences with booking management and local guide connections.",
      image: "✈️", // Placeholder - replace with actual image
      technologies: ["Next.js", "Node.js", "Express.js", "PostgreSQL"],
      features: [
        "Tour package booking",
        "Local guide marketplace",
        "Interactive maps",
        "Multi-language support",
        "Travel itinerary planner"
      ],
      liveUrl: "https://tripzem.com",
      githubUrl: "https://github.com/jacksonford/tripzem",
      status: "Live",
      duration: "8 months",
      role: "Lead Developer"
    },
    {
      id: 3,
      title: "EcoTrack - Sustainability Dashboard",
      category: "web",
      description: "A comprehensive dashboard for tracking carbon footprint and sustainability metrics for businesses and individuals.",
      image: "🌱", // Placeholder - replace with actual image
      technologies: ["React.js", "Django (Python)", "PostgreSQL", "Docker"],
      features: [
        "Carbon footprint tracking",
        "Interactive data visualization",
        "Goal setting & monitoring",
        "Team collaboration tools",
        "Sustainability reporting"
      ],
      liveUrl: "https://ecotrack.io",
      githubUrl: "https://github.com/jacksonford/ecotrack",
      status: "Live",
      duration: "4 months",
      role: "Frontend Developer"
    },
    {
      id: 4,
      title: "CloudInfra - Scalable Infrastructure",
      category: "devops",
      description: "Set up scalable cloud infrastructure with DevOps practices for a high-traffic application.",
      image: "☁️", // Placeholder - replace with actual image
      technologies: ["Docker & Kubernetes", "AWS", "GCP", "CI/CD pipelines", "Automation & Infrastructure as Code"],
      features: [
        "Container orchestration",
        "Auto-scaling systems",
        "Monitoring & Logging",
        "High-availability design",
        "Cost optimization"
      ],
      liveUrl: null,
      githubUrl: "https://github.com/jacksonford/cloudinfra",
      status: "Live",
      duration: "5 months",
      role: "DevOps Engineer"
    },
    {
      id: 5,
      title: "SEOMaster - Marketing Tool",
      category: "marketing",
      description: "A tool for SEO analysis, digital marketing campaigns, and web analytics integration.",
      image: "📈", // Placeholder - replace with actual image
      technologies: ["Node.js", "Express.js", "MongoDB", "Google Analytics"],
      features: [
        "On-page SEO analysis",
        "PPC campaign management",
        "Social media advertising",
        "Email marketing tools",
        "Analytics reporting"
      ],
      liveUrl: "https://seomaster.com",
      githubUrl: "https://github.com/jacksonford/seomaster",
      status: "Design Complete",
      duration: "3 months",
      role: "Developer & Marketing Specialist"
    },
    {
      id: 6,
      title: "CryptoTracker - Investment App",
      category: "mobile",
      description: "Mobile app for tracking cryptocurrency investments with real-time market data and portfolio analytics.",
      image: "₿", // Placeholder - replace with actual image
      technologies: ["Flutter", "Supabase", "RESTful APIs & GraphQL"],
      features: [
        "Real-time price tracking",
        "Portfolio management",
        "Price alerts & notifications",
        "Market analysis tools",
        "News integration"
      ],
      liveUrl: "https://play.google.com/cryptotracker",
      githubUrl: "https://github.com/jacksonford/cryptotracker",
      status: "Live",
      duration: "5 months",
      role: "Mobile Developer"
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      });
    }, observerOptions);

    const projectObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const projectId = parseInt(entry.target.dataset.projectId);
          setVisibleProjects(prev => new Set([...prev, projectId]));
        }
      });
    }, observerOptions);

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    projectRefs.current.forEach((ref) => {
      if (ref) {
        projectObserver.observe(ref);
      }
    });

    return () => {
      headerObserver.disconnect();
      projectObserver.disconnect();
    };
  }, [selectedCategory]);

  useEffect(() => {
    setVisibleProjects(new Set());
  }, [selectedCategory]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Design Complete': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section id="work" className="min-h-screen bg-gray-900 flex flex-col items-center py-16 px-4 md:ml-64 snap-start relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/6 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl w-full relative z-10">
        <div 
          ref={headerRef}
          className={`text-center mb-12 transform transition-all duration-1000 ease-out ${
            isHeaderVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
        >
          <h1 className="text-5xl font-light text-white mb-4 font-sans tracking-tight relative">
            Featured Projects
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-full"></div>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A showcase of innovative digital solutions, from mobile apps to web platforms, crafted with precision and creativity.
          </p>
        </div>

        <div className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-200 ${
          isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 border backdrop-blur-sm transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white border-transparent shadow-lg'
                  : 'bg-gray-800/50 text-gray-400 border-gray-700/50 hover:text-white hover:border-cyan-500/50'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{category.icon}</span>
                {category.label}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {filteredProjects.map((project, index) => (
            <div
              key={`${selectedCategory}-${project.id}`}
              ref={el => projectRefs.current[project.id - 1] = el}
              data-project-id={project.id}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 
                backdrop-blur-lg border border-gray-700/30 hover:border-cyan-500/40 
                transition-all duration-700 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 ${
                visibleProjects.has(project.id)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
              }`}
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-pink-500/20 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-700"></div>

              <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} min-h-[400px]`}>
                <div className="flex-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-900/40"></div>
                  
                  <div className="h-full flex items-center justify-center p-6 md:p-12 relative">
                    {project.category === 'mobile' && (
                      <div className="relative transform group-hover:scale-105 transition-transform duration-500">
                        <div className="w-48 h-96 bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl border-4 border-gray-800">
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-[2rem] flex items-center justify-center relative overflow-hidden">
                            <div className="text-4xl">{project.image}</div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
                          </div>
                        </div>
                        <div className="absolute -top-4 -right-4 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
                        <div className="absolute -bottom-6 -left-6 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-300"></div>
                      </div>
                    )}

                    {(project.category === 'web' || project.category === 'devops') && (
                      <div className="relative transform group-hover:scale-105 transition-transform duration-500">
                        <div className="w-80 h-48 bg-gray-800 rounded-t-2xl p-2 shadow-2xl">
                          <div className="w-full h-full bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-500 rounded-xl flex items-center justify-center relative overflow-hidden">
                            <div className="text-5xl">{project.image}</div>
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                          </div>
                        </div>
                        <div className="w-96 h-6 bg-gray-700 rounded-b-2xl mx-auto -mt-1"></div>
                        <div className="absolute -top-2 right-4 text-xs bg-gray-900/80 text-cyan-400 px-2 py-1 rounded font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                          {'</>'}
                        </div>
                      </div>
                    )}

                    {project.category === 'marketing' && (
                      <div className="relative transform group-hover:scale-105 transition-transform duration-500">
                        <div className="w-72 h-80 bg-gray-100 rounded-2xl p-4 shadow-2xl">
                          <div className="w-full h-full bg-gradient-to-br from-pink-500 via-purple-600 to-blue-500 rounded-xl flex items-center justify-center relative overflow-hidden">
                            <div className="text-5xl">{project.image}</div>
                            <div className="absolute inset-0" style={{
                              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                              backgroundSize: '20px 20px'
                            }}></div>
                          </div>
                        </div>
                        <div className="absolute -left-6 top-8 w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          <div className="w-3 h-3 bg-white rounded"></div>
                        </div>
                        <div className="absolute -right-4 bottom-12 w-6 h-6 bg-blue-500 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"></div>
                      </div>
                    )}

                    <div className={`absolute top-6 right-6 px-4 py-2 rounded-full backdrop-blur-lg border text-sm font-medium ${getStatusColor(project.status)} shadow-lg`}>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                        {project.status}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6 md:p-12 flex flex-col justify-center relative z-10">
                  <div className="inline-block mb-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30 backdrop-blur-sm">
                      {categories.find(cat => cat.id === project.category)?.icon} {categories.find(cat => cat.id === project.category)?.label}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-white group-hover:to-violet-300 transition-all duration-500">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-6">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {project.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {project.role}
                    </span>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed mb-8 group-hover:text-white transition-colors duration-300">
                    {project.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-4 py-2 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-full text-sm font-medium border border-gray-600/50 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-300 transform hover:scale-105 ${
                            visibleProjects.has(project.id)
                              ? 'translate-y-0 opacity-100'
                              : 'translate-y-4 opacity-0'
                          }`}
                          style={{
                            transitionDelay: `${(index * 200) + (techIndex * 50)}ms`
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-violet-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:from-cyan-400 hover:to-violet-500 hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
                      >
                        <span>View Live</span>
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm text-gray-300 px-8 py-4 rounded-2xl font-semibold border border-gray-600/50 hover:border-gray-500/50 hover:text-white hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span>View Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-16 transform transition-all duration-1000 delay-700 ${
          isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{projects.length}+</div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-violet-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-violet-400 mb-2">15+</div>
              <div className="text-gray-400">Technologies Used</div>
            </div>
            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-pink-400 mb-2">100%</div>
              <div className="text-gray-400">Client Satisfaction</div>
            </div>
            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-orange-400 mb-2">2+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
          </div>
        </div>

        <div className={`mt-16 text-center transform transition-all duration-1000 delay-900 ${
          isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 backdrop-blur-lg rounded-3xl p-12 border border-gray-700/30">
            <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
              Ready to Start Your Next Project?
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's collaborate to bring your vision to life with innovative technology and exceptional design.
            </p>
            <button className="group bg-gradient-to-r from-cyan-500 to-violet-600 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 hover:from-cyan-400 hover:to-violet-500 hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105">
              <span className="flex items-center gap-3">
                Get In Touch
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectWorks;