"use client";

import React, { useState, useEffect, useRef } from 'react';

const Skills = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const headerRef = useRef(null);
  const itemRefs = useRef([]);

  const skillCategories = [
    {
      id: 1,
      title: "Mobile App Development",
      subtitle: "Native and cross-platform mobile solutions",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      glowColor: "blue-500",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zM7 4V3h10v1H7zm0 14V6h10v12H7zm0 3v-1h10v1H7z"/>
        </svg>
      ),
      skills: [
        "Kotlin & Jetpack Compose",
        "Flutter Development",
        "iOS & Android Deployment",
        "UI/UX Design",
        "App Store Optimization",
        "On-demand Service Apps (FixZoom)",
        "Tourism Apps (TripZem)",
        "App Maintenance & Updates"
      ]
    },
    {
      id: 2,
      title: "Full Stack Web Development",
      subtitle: "End-to-end web application development",
      gradient: "from-emerald-500 via-green-500 to-lime-500",
      glowColor: "green-500",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
        </svg>
      ),
      skills: [
        "React.js & Next.js",
        "Node.js & Express.js",
        "MongoDB & MySQL",
        "REST APIs & GraphQL",
        "Responsive Design",
        "E-commerce Platforms",
        "Dynamic Web Applications",
        "Progressive Web Apps"
      ]
    },
    {
      id: 3,
      title: "DevOps & Cloud Computing",
      subtitle: "Scalable infrastructure and deployment solutions",
      gradient: "from-purple-500 via-violet-500 to-fuchsia-500",
      glowColor: "purple-500",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/>
        </svg>
      ),
      skills: [
        "Docker & Kubernetes",
        "CI/CD Pipelines",
        "AWS & Microsoft Azure",
        "Server Management",
        "Cloud Scalability",
        "Monitoring & Analytics",
        "Automated Deployment",
        "Infrastructure as Code"
      ]
    },
    {
      id: 4,
      title: "Digital Marketing & SEO",
      subtitle: "Data-driven marketing strategies and optimization",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      glowColor: "orange-500",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      ),
      skills: [
        "Social Media Marketing",
        "Email Campaigns",
        "Content Strategy",
        "SEO Optimization",
        "Google Analytics",
        "Paid Advertising Campaigns",
        "Marketing Automation",
        "Performance Analysis"
      ]
    },
    {
      id: 5,
      title: "Additional Expertise",
      subtitle: "Complementary skills for holistic solutions",
      gradient: "from-rose-500 via-pink-500 to-red-500",
      glowColor: "rose-500",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      skills: [
        "Project Management",
        "Entrepreneurship",
        "Multilingual Communication",
        "Business Strategy",
        "Team Leadership",
        "Client Relations",
        "Problem Solving",
        "Innovation Management"
      ]
    }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px'
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

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

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
    <section id="skills" className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center py-20 px-4 md:ml-64 snap-start relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="max-w-7xl w-full relative z-10">
        {/* Header with modern styling */}
        <div 
          ref={headerRef}
          className={`text-center mb-20 transform transition-all duration-1000 ease-out ${
            isHeaderVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-12 opacity-0 scale-95'
          }`}
        >
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm">
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              What I Bring to the Table
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technical Expertise
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Crafting innovative solutions with cutting-edge technologies
          </p>
        </div>

        {/* Modern Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.id}
              ref={el => itemRefs.current[category.id - 1] = el}
              data-item-id={category.id}
              className={`group relative transform transition-all duration-700 ease-out ${
                visibleItems.has(category.id)
                  ? 'translate-y-0 opacity-100 scale-100'
                  : 'translate-y-8 opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glassmorphic Card */}
              <div className="relative h-full bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden transition-all duration-500 hover:border-gray-600/50 hover:shadow-2xl hover:-translate-y-2">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Animated border glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                  <div className={`absolute -inset-[1px] bg-gradient-to-r ${category.gradient} rounded-2xl blur-sm`}></div>
                  <div className="absolute inset-[1px] bg-gray-900 rounded-2xl"></div>
                </div>

                <div className="relative z-10 p-8">
                  {/* Icon with gradient background */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${category.gradient} p-[2px] group-hover:scale-110 transition-transform duration-500`}>
                    <div className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center text-white">
                      {category.icon}
                    </div>
                  </div>

                  {/* Title and subtitle */}
                  <div className="mb-6">
                    <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 origin-left`}>
                      {category.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {category.subtitle}
                    </p>
                  </div>

                  {/* Skills with modern pill design */}
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className={`flex items-center gap-3 text-gray-300 text-sm transform transition-all duration-500 hover:translate-x-2 ${
                          visibleItems.has(category.id)
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-4 opacity-0'
                        }`}
                        style={{
                          transitionDelay: `${(index * 150) + (skillIndex * 50)}ms`
                        }}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.gradient} flex-shrink-0 group-hover:scale-150 transition-transform duration-300`}></div>
                        <span className="group-hover:text-white transition-colors duration-300">{skill}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover indicator */}
                  <div className="mt-6 flex items-center gap-2 text-gray-500 group-hover:text-gray-300 transition-colors duration-300">
                    <span className="text-xs font-medium">Hover to explore</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Particle effect on hover */}
                {hoveredCard === category.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 bg-gradient-to-r ${category.gradient} rounded-full animate-ping`}
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${i * 200}ms`,
                          animationDuration: '2s'
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className={`mt-20 text-center transform transition-all duration-1000 ${
          isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{transitionDelay: '800ms'}}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-gray-700/50 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-sm">Available for new projects</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;