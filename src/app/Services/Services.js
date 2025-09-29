"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';




const Services = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const headerRef = useRef(null);
  const itemRefs = useRef([]);
  const router = useRouter();

  const services = [
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
      color: "blue"
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
      color: "green"
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
      color: "purple"
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
      color: "orange"
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
      color: "pink"
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
      color: "indigo"
    }
  ];

  const colorClasses = {
    blue: {
      gradient: "from-blue-500 to-blue-600",
      hover: "hover:shadow-blue-500/25",
      border: "border-blue-500/50",
      icon: "text-blue-400",
      iconHover: "group-hover:text-blue-300"
    },
    green: {
      gradient: "from-green-500 to-green-600",
      hover: "hover:shadow-green-500/25",
      border: "border-green-500/50",
      icon: "text-green-400",
      iconHover: "group-hover:text-green-300"
    },
    purple: {
      gradient: "from-purple-500 to-purple-600",
      hover: "hover:shadow-purple-500/25",
      border: "border-purple-500/50",
      icon: "text-purple-400",
      iconHover: "group-hover:text-purple-300"
    },
    orange: {
      gradient: "from-orange-500 to-orange-600",
      hover: "hover:shadow-orange-500/25",
      border: "border-orange-500/50",
      icon: "text-orange-400",
      iconHover: "group-hover:text-orange-300"
    },
    pink: {
      gradient: "from-pink-500 to-pink-600",
      hover: "hover:shadow-pink-500/25",
      border: "border-pink-500/50",
      icon: "text-pink-400",
      iconHover: "group-hover:text-pink-300"
    },
    indigo: {
      gradient: "from-indigo-500 to-indigo-600",
      hover: "hover:shadow-indigo-500/25",
      border: "border-indigo-500/50",
      icon: "text-indigo-400",
      iconHover: "group-hover:text-indigo-300"
    }
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      });
    }, observerOptions);

    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const itemId = parseInt(entry.target.dataset.itemId);
          setVisibleItems(prev => new Set([...prev, itemId]));
        }
      });
    }, observerOptions);

    // Observe header
    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    // Observe items
    itemRefs.current.forEach((ref) => {
      if (ref) {
        itemObserver.observe(ref);
      }
    });

    return () => {
      headerObserver.disconnect();
      itemObserver.disconnect();
    };
  }, []);

  return (
    <section id="services" className="min-h-screen bg-gray-900 flex flex-col items-center py-16 px-4 md:ml-64 snap-start relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/6 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl w-full relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transform transition-all duration-1000 ease-out ${
            isHeaderVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
        >
          <h1 className="text-5xl font-light text-white mb-4 font-sans tracking-tight relative">
            My Services
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive digital solutions tailored to bring your ideas to life with cutting-edge technology and creative excellence.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-600"></div>

          {/* Service Items */}
          <div className="space-y-12">
            {services.map((service, index) => {
              const colors = colorClasses[service.color];
              return (
                <div
                  key={service.id}
                  ref={el => itemRefs.current[service.id - 1] = el}
                  data-item-id={service.id}
                  className={`relative pl-12 md:pl-20 transform transition-all duration-1000 ease-out ${
                    visibleItems.has(service.id)
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-12 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 300}ms`
                  }}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-2 md:left-6 top-6 w-4 h-4 bg-gradient-to-r ${colors.gradient} rounded-full border-4 border-gray-900 shadow-lg`}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-${service.color}-400 to-${service.color}-500 rounded-full animate-ping opacity-75`}></div>
                  </div>

                  {/* Content Card */}
                  <div 
                    onMouseEnter={() => setHoveredCard(service.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6 md:p-8 
                      hover:shadow-2xl ${colors.hover} hover:border-transparent
                      transition-all duration-500 cursor-pointer transform hover:-translate-y-2
                      relative overflow-hidden`}
                  >
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Animated border effect */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colors.gradient} p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                      <div className="bg-gray-800/90 rounded-xl h-full w-full"></div>
                    </div>

                    <div className="relative z-10">
                      {/* Icon with pulse animation */}
                      <div className={`w-16 h-16 bg-gray-700/50 rounded-xl flex items-center justify-center mb-6 group-hover:${colors.border} transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-600/50`}>
                        <div className="relative">
                          <div className={`${colors.icon} ${colors.iconHover} transition-colors duration-300`}>
                            {service.icon}
                          </div>
                          {hoveredCard === service.id && (
                            <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-20 rounded-xl animate-ping`}></div>
                          )}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-white transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="mb-6">
                        <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Key Features
                        </h4>
                        <ul className="grid grid-cols-1 gap-2">
                          {service.features.map((feature, featureIndex) => (
                            <li 
                              key={featureIndex}
                              className={`flex items-start gap-3 text-gray-300 text-sm transform transition-all duration-500 hover:text-white ${
                                visibleItems.has(service.id)
                                  ? 'translate-x-0 opacity-100'
                                  : 'translate-x-4 opacity-0'
                              }`}
                              style={{
                                transitionDelay: `${(index * 300) + (featureIndex * 100)}ms`
                              }}
                            >
                              <span className="text-emerald-400 mt-1 flex-shrink-0">●</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Learn More Button */}
                      <button 
                        onClick={() => router.push(`/services/${service.id}`)}
                        className={`w-full py-3 px-4 border border-gray-600 text-gray-400 rounded-lg hover:border-transparent hover:text-white transition-all duration-300 relative overflow-hidden group/btn`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}></div>
                        <span className="relative z-10 font-medium">Learn More</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className={`text-center mt-16 transform transition-all duration-1000 delay-500 ${
          isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-semibold text-white mb-4">Ready to Start Your Project?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Let's collaborate to bring your vision to life with innovative solutions and exceptional quality.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
