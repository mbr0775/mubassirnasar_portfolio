"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, X, Calendar, Users, Award, Target } from 'lucide-react';

const ProjectsWorks = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(new Set());
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [currentSlides, setCurrentSlides] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const headerRef = useRef(null);
  const projectRefs = useRef([]);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'marketing', name: 'Digital Marketing' },
    { id: 'devops', name: 'DevOps' }
  ];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Mobile App",
      category: "mobile",
      description: "Full-featured shopping app with payment gateway integration, real-time inventory, and AI-powered recommendations.",
      fullDescription: "A comprehensive e-commerce mobile application built for a major retail client. The app features a seamless shopping experience with advanced search capabilities, personalized product recommendations powered by machine learning, and integrated payment processing. The real-time inventory management system ensures accurate stock levels, while push notifications keep users engaged with special offers and order updates.",
      technologies: ["React Native", "Firebase", "Stripe", "Redux"],
      images: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
      ],
      color: "blue",
      stats: { users: "50K+", rating: "4.8", downloads: "100K+" },
      duration: "6 months",
      team: "5 developers",
      client: "RetailCorp Inc.",
      challenges: [
        "Implementing real-time inventory synchronization across multiple warehouses",
        "Optimizing app performance for low-end devices",
        "Integrating multiple payment gateways with PCI compliance"
      ],
      solutions: [
        "Developed a custom WebSocket-based synchronization system",
        "Implemented lazy loading and image optimization techniques",
        "Created a unified payment abstraction layer with security best practices"
      ],
      results: [
        "50,000+ active users within first 3 months",
        "4.8-star rating on both App Store and Google Play",
        "35% increase in mobile sales conversion rate"
      ],
      github: "https://github.com/example/ecommerce-app",
      liveUrl: "https://example.com"
    },
    {
      id: 2,
      title: "Healthcare Portal",
      category: "fullstack",
      description: "Comprehensive patient management system with telemedicine capabilities, appointment scheduling, and electronic health records.",
      fullDescription: "An enterprise-grade healthcare management platform designed to streamline patient care and administrative workflows. The system includes HIPAA-compliant video consultation features, automated appointment reminders, prescription management, and secure electronic health record storage. Built with scalability in mind to handle thousands of concurrent users.",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "WebRTC"],
      images: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop"
      ],
      color: "green",
      stats: { clients: "25+", uptime: "99.9%", users: "10K+" },
      duration: "8 months",
      team: "8 developers",
      client: "MediCare Systems",
      challenges: [
        "Ensuring HIPAA compliance for patient data",
        "Building reliable video consultation with low latency",
        "Managing complex appointment scheduling logic"
      ],
      solutions: [
        "Implemented end-to-end encryption and role-based access control",
        "Utilized WebRTC with fallback mechanisms for connectivity issues",
        "Created an intelligent scheduling algorithm with conflict resolution"
      ],
      results: [
        "99.9% uptime maintained across all services",
        "Reduced administrative workload by 40%",
        "Enabled remote consultations for 10,000+ patients"
      ],
      github: "https://github.com/example/healthcare-portal",
      liveUrl: "https://example.com"
    },
    {
      id: 3,
      title: "Brand Growth Campaign",
      category: "marketing",
      description: "Multi-channel marketing strategy resulting in 300% increase in engagement and 150% growth in conversion rates.",
      fullDescription: "A comprehensive digital marketing campaign executed across multiple platforms including Google Ads, social media, email marketing, and content creation. The strategy focused on data-driven decision making, A/B testing, and continuous optimization. We developed targeted content for different audience segments and implemented advanced tracking to measure ROI at every touchpoint.",
      technologies: ["Google Ads", "SEO", "Social Media", "Analytics"],
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800&h=600&fit=crop"
      ],
      color: "pink",
      stats: { engagement: "+300%", conversion: "+150%", roi: "5x" },
      duration: "4 months",
      team: "4 marketers",
      client: "TechStart Inc.",
      challenges: [
        "Low brand awareness in competitive market",
        "Limited marketing budget requiring efficient spend",
        "Complex customer journey across multiple touchpoints"
      ],
      solutions: [
        "Developed hyper-targeted audience segments based on behavior data",
        "Implemented automated bidding strategies to optimize ad spend",
        "Created attribution models to track customer journey effectively"
      ],
      results: [
        "300% increase in social media engagement",
        "150% growth in conversion rates",
        "5x return on ad spend (ROAS)"
      ],
      liveUrl: "https://example.com"
    },
    {
      id: 4,
      title: "Cloud Infrastructure Setup",
      category: "devops",
      description: "Scalable microservices architecture with automated CI/CD pipelines, reducing deployment time by 80%.",
      fullDescription: "Complete cloud infrastructure overhaul for a rapidly growing SaaS company. Migrated monolithic application to microservices architecture on AWS, implemented containerization with Docker and orchestration with Kubernetes. Established automated CI/CD pipelines with comprehensive testing, monitoring, and alerting systems. The infrastructure supports auto-scaling, disaster recovery, and zero-downtime deployments.",
      technologies: ["AWS", "Docker", "Kubernetes", "Jenkins"],
      images: [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=600&fit=crop"
      ],
      color: "orange",
      stats: { deployment: "-80%", uptime: "99.99%", scalability: "10x" },
      duration: "5 months",
      team: "6 engineers",
      client: "CloudSoft Solutions",
      challenges: [
        "Migrating from monolith without service disruption",
        "Ensuring high availability during peak traffic",
        "Managing infrastructure costs while scaling"
      ],
      solutions: [
        "Implemented strangler pattern for gradual migration",
        "Set up auto-scaling groups with predictive scaling",
        "Used spot instances and reserved capacity for cost optimization"
      ],
      results: [
        "80% reduction in deployment time",
        "99.99% uptime achieved",
        "10x scalability with 30% cost reduction"
      ],
      github: "https://github.com/example/cloud-infra",
      liveUrl: "https://example.com"
    },
    {
      id: 5,
      title: "Fitness Tracking App",
      category: "mobile",
      description: "AI-powered fitness companion with workout plans, nutrition tracking, and social features for motivation.",
      fullDescription: "A comprehensive fitness application that combines workout tracking, nutrition monitoring, and social networking features. The app uses machine learning to provide personalized workout recommendations based on user goals, fitness level, and progress. Integration with wearable devices allows automatic tracking of activities, heart rate, and calories burned. The social features create a supportive community where users can share achievements and compete in challenges.",
      technologies: ["Flutter", "TensorFlow", "Firebase", "HealthKit"],
      images: [
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop"
      ],
      color: "blue",
      stats: { users: "75K+", rating: "4.9", active: "90%" },
      duration: "7 months",
      team: "6 developers",
      client: "FitLife Technologies",
      challenges: [
        "Creating accurate AI-based workout recommendations",
        "Seamless integration with multiple fitness devices",
        "Maintaining user engagement over time"
      ],
      solutions: [
        "Trained custom ML models on diverse fitness datasets",
        "Built unified API wrapper for various device SDKs",
        "Implemented gamification and social features for retention"
      ],
      results: [
        "75,000+ active users with 90% retention",
        "4.9-star rating across app stores",
        "Featured in 'Best Health Apps' by major publications"
      ],
      github: "https://github.com/example/fitness-app",
      liveUrl: "https://example.com"
    },
    {
      id: 6,
      title: "SaaS Dashboard Platform",
      category: "fullstack",
      description: "Enterprise analytics platform with real-time data visualization, custom reporting, and API integration.",
      fullDescription: "A powerful business intelligence platform that aggregates data from multiple sources to provide actionable insights through interactive dashboards and reports. Features include real-time data streaming, customizable widgets, automated report generation, and advanced filtering capabilities. The platform supports role-based access control and white-labeling for enterprise clients. Built to handle millions of data points with sub-100ms query response times.",
      technologies: ["React", "Express", "MongoDB", "D3.js"],
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop"
      ],
      color: "green",
      stats: { clients: "100+", data: "5M+ points", speed: "< 100ms" },
      duration: "10 months",
      team: "10 developers",
      client: "DataViz Enterprise",
      challenges: [
        "Processing and visualizing massive datasets in real-time",
        "Creating flexible yet intuitive dashboard builder",
        "Ensuring data security across multi-tenant architecture"
      ],
      solutions: [
        "Implemented data aggregation pipeline with Redis caching",
        "Developed drag-and-drop interface with React DnD",
        "Built comprehensive security layer with encryption at rest"
      ],
      results: [
        "100+ enterprise clients onboarded",
        "Processing 5M+ data points daily",
        "Query response time under 100ms"
      ],
      github: "https://github.com/example/saas-dashboard",
      liveUrl: "https://example.com"
    },
    {
      id: 7,
      title: "Social Media Domination",
      category: "marketing",
      description: "Viral social media campaigns across platforms generating millions of impressions and building brand authority.",
      fullDescription: "A strategic social media marketing initiative designed to establish brand presence and authority across major platforms. The campaign included content creation, influencer partnerships, paid advertising, and community management. We developed a content calendar aligned with trending topics, created engaging visual and video content, and implemented social listening tools to respond to brand mentions in real-time. The strategy focused on building authentic connections with the target audience.",
      technologies: ["Content Marketing", "Influencer Outreach", "Paid Ads"],
      images: [
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop"
      ],
      color: "pink",
      stats: { reach: "5M+", engagement: "15%", followers: "+200K" },
      duration: "6 months",
      team: "5 marketers",
      client: "BrandBoost Co.",
      challenges: [
        "Standing out in oversaturated social media landscape",
        "Creating consistently viral content",
        "Managing multiple platforms with different audiences"
      ],
      solutions: [
        "Developed data-driven content strategy based on analytics",
        "Partnered with micro-influencers for authentic reach",
        "Created platform-specific content optimized for each channel"
      ],
      results: [
        "5M+ total reach across all platforms",
        "15% average engagement rate",
        "200K+ new followers gained"
      ],
      liveUrl: "https://example.com"
    },
    {
      id: 8,
      title: "Automated Testing Pipeline",
      category: "devops",
      description: "Complete test automation framework with continuous integration, reducing bugs by 90% and accelerating releases.",
      fullDescription: "Comprehensive test automation solution covering unit tests, integration tests, end-to-end tests, and performance tests. Integrated with CI/CD pipeline for automated execution on every commit. The framework includes parallel test execution, visual regression testing, and automated security scanning. Detailed reporting dashboard provides insights into test coverage, failure trends, and performance metrics. Successfully reduced manual testing effort by 85% while improving software quality.",
      technologies: ["Jenkins", "Selenium", "Docker", "SonarQube"],
      images: [
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop"
      ],
      color: "orange",
      stats: { bugs: "-90%", coverage: "95%", speed: "3x faster" },
      duration: "4 months",
      team: "4 engineers",
      client: "TestTech Systems",
      challenges: [
        "Slow and unreliable manual testing process",
        "Low test coverage leading to production bugs",
        "Difficulty in maintaining test suites"
      ],
      solutions: [
        "Built modular test framework with reusable components",
        "Implemented parallel execution on containerized environments",
        "Created self-healing tests that adapt to UI changes"
      ],
      results: [
        "90% reduction in production bugs",
        "95% code coverage achieved",
        "3x faster release cycles"
      ],
      github: "https://github.com/example/testing-pipeline",
      liveUrl: "https://example.com"
    }
  ];

  const colorClasses = {
    blue: {
      gradient: "from-blue-500 to-blue-600",
      hover: "hover:shadow-blue-500/25",
      border: "border-blue-500/50",
      bg: "bg-blue-500/10",
      text: "text-blue-400"
    },
    green: {
      gradient: "from-green-500 to-green-600",
      hover: "hover:shadow-green-500/25",
      border: "border-green-500/50",
      bg: "bg-green-500/10",
      text: "text-green-400"
    },
    pink: {
      gradient: "from-pink-500 to-pink-600",
      hover: "hover:shadow-pink-500/25",
      border: "border-pink-500/50",
      bg: "bg-pink-500/10",
      text: "text-pink-400"
    },
    orange: {
      gradient: "from-orange-500 to-orange-600",
      hover: "hover:shadow-orange-500/25",
      border: "border-orange-500/50",
      bg: "bg-orange-500/10",
      text: "text-orange-400"
    }
  };

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
  }, []);

  useEffect(() => {
    const initialSlides = {};
    projects.forEach(project => {
      initialSlides[project.id] = 0;
    });
    setCurrentSlides(initialSlides);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const nextSlide = (projectId, imagesLength) => {
    setCurrentSlides(prev => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % imagesLength
    }));
  };

  const prevSlide = (projectId, imagesLength) => {
    setCurrentSlides(prev => ({
      ...prev,
      [projectId]: (prev[projectId] - 1 + imagesLength) % imagesLength
    }));
  };

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <>
      <section id="projects" className="min-h-screen bg-gray-900 flex flex-col items-center py-16 px-4 md:ml-64 snap-start relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl w-full relative z-10">
          {/* Header */}
          <div 
            ref={headerRef}
            className={`text-center mb-12 transform transition-all duration-1000 ease-out ${
              isHeaderVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
          >
            <h1 className="text-5xl font-light text-white mb-4 font-sans tracking-tight relative">
              Featured Works
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Explore my portfolio of successful projects across mobile development, web applications, marketing campaigns, and cloud infrastructure.
            </p>
          </div>

          {/* Category Filter */}
          <div className={`flex flex-wrap justify-center gap-3 mb-12 transform transition-all duration-1000 delay-200 ${
            isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => {
              const colors = colorClasses[project.color];
              const currentSlide = currentSlides[project.id] || 0;

              return (
                <div
                  key={project.id}
                  ref={el => projectRefs.current[project.id - 1] = el}
                  data-project-id={project.id}
                  className={`group transform transition-all duration-1000 ease-out ${
                    visibleProjects.has(project.id)
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-12 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  <div className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 
                    hover:shadow-2xl ${colors.hover} hover:border-transparent transition-all duration-500 transform hover:-translate-y-2`}>
                    
                    {/* Image Slider */}
                    <div className="relative h-64 overflow-hidden">
                      {project.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className={`absolute inset-0 transition-opacity duration-500 ${
                            currentSlide === imgIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <img 
                            src={image} 
                            alt={`${project.title} ${imgIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent`}></div>
                        </div>
                      ))}

                      {/* Slider Controls */}
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={() => prevSlide(project.id, project.images.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-800 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => nextSlide(project.id, project.images.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-800 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>

                          {/* Slide Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {project.images.map((_, imgIndex) => (
                              <button
                                key={imgIndex}
                                onClick={() => setCurrentSlides(prev => ({ ...prev, [project.id]: imgIndex }))}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  currentSlide === imgIndex 
                                    ? `w-8 bg-gradient-to-r ${colors.gradient}` 
                                    : 'w-1.5 bg-gray-500'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}

                      {/* Category Badge */}
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full ${colors.bg} backdrop-blur-sm border ${colors.border}`}>
                        <span className={`text-xs font-medium ${colors.text}`}>
                          {categories.find(c => c.id === project.category)?.name}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-gray-700/50">
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className={`text-lg font-bold ${colors.text}`}>{value}</div>
                            <div className="text-xs text-gray-500 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className={`flex-1 py-2.5 px-4 bg-gradient-to-r ${colors.gradient} text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium flex items-center justify-center gap-2`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Project
                        </button>
                        {project.github && (
                          <button className="py-2.5 px-4 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center justify-center">
                            <Github className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className={`text-center mt-16 transform transition-all duration-1000 delay-300 ${
            isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-semibold text-white mb-4">Have a Project in Mind?</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Let's work together to create something extraordinary that exceeds your expectations.
              </p>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium">
                Start a Conversation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Full Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <div className="bg-gray-900 rounded-2xl max-w-5xl w-full border border-gray-700/50 shadow-2xl animate-fade-in relative">
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header Image Slider */}
              <div className="relative h-96 overflow-hidden rounded-t-2xl">
                {selectedProject.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      (currentSlides[selectedProject.id] || 0) === imgIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${selectedProject.title} ${imgIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                  </div>
                ))}

                {/* Slider Controls */}
                <button
                  onClick={() => prevSlide(selectedProject.id, selectedProject.images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-800 text-white p-3 rounded-full transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => nextSlide(selectedProject.id, selectedProject.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-800 text-white p-3 rounded-full transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Title Overlay */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className={`inline-block px-4 py-1 rounded-full ${colorClasses[selectedProject.color].bg} backdrop-blur-sm border ${colorClasses[selectedProject.color].border} mb-4`}>
                    <span className={`text-sm font-medium ${colorClasses[selectedProject.color].text}`}>
                      {categories.find(c => c.id === selectedProject.category)?.name}
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-2">{selectedProject.title}</h2>
                  <p className="text-gray-300">{selectedProject.client}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Quick Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-4">
                    <Calendar className={`w-5 h-5 ${colorClasses[selectedProject.color].text}`} />
                    <div>
                      <div className="text-xs text-gray-500">Duration</div>
                      <div className="text-white font-medium">{selectedProject.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-4">
                    <Users className={`w-5 h-5 ${colorClasses[selectedProject.color].text}`} />
                    <div>
                      <div className="text-xs text-gray-500">Team Size</div>
                      <div className="text-white font-medium">{selectedProject.team}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-4">
                    <Award className={`w-5 h-5 ${colorClasses[selectedProject.color].text}`} />
                    <div>
                      <div className="text-xs text-gray-500">Client</div>
                      <div className="text-white font-medium text-sm">{selectedProject.client}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-4">
                    <Target className={`w-5 h-5 ${colorClasses[selectedProject.color].text}`} />
                    <div>
                      <div className="text-xs text-gray-500">Status</div>
                      <div className="text-emerald-400 font-medium">Completed</div>
                    </div>
                  </div>
                </div>

                {/* Full Description */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-white mb-4">Project Overview</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {selectedProject.fullDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className={`px-4 py-2 bg-gradient-to-r ${colorClasses[selectedProject.color].gradient} text-white rounded-lg font-medium`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenges */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Challenges</h3>
                  <div className="space-y-3">
                    {selectedProject.challenges.map((challenge, index) => (
                      <div key={index} className="flex items-start gap-3 bg-gray-800/30 rounded-lg p-4">
                        <div className={`w-2 h-2 rounded-full ${colorClasses[selectedProject.color].bg} mt-2 flex-shrink-0`}></div>
                        <p className="text-gray-300">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solutions */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Solutions</h3>
                  <div className="space-y-3">
                    {selectedProject.solutions.map((solution, index) => (
                      <div key={index} className="flex items-start gap-3 bg-gray-800/30 rounded-lg p-4">
                        <svg className={`w-5 h-5 ${colorClasses[selectedProject.color].text} mt-0.5 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-300">{solution}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Results & Impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedProject.results.map((result, index) => (
                      <div key={index} className={`bg-gradient-to-br ${colorClasses[selectedProject.color].gradient} p-6 rounded-xl text-white`}>
                        <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
                          <Award className="w-6 h-6" />
                        </div>
                        <p className="font-medium">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-700/50">
                  {selectedProject.liveUrl && (
                    <a 
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 min-w-[200px] py-3 px-6 bg-gradient-to-r ${colorClasses[selectedProject.color].gradient} text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium flex items-center justify-center gap-2`}
                    >
                      <ExternalLink className="w-5 h-5" />
                      Visit Live Site
                    </a>
                  )}
                  {selectedProject.github && (
                    <a 
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[200px] py-3 px-6 border-2 border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300 font-medium flex items-center justify-center gap-2"
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsWorks;