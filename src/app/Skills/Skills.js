"use client";

import React, { useState, useEffect, useRef } from 'react';

const Skills = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef(null);
  const itemRefs = useRef([]);

  const skillCategories = [
    {
      id: 1,
      title: "Mobile App Development",
      subtitle: "Native and cross-platform mobile solutions",
      icon: (
        <svg className="w-8 h-8 text-gray-300 group-hover:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
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
      icon: (
        <svg className="w-8 h-8 text-gray-300 group-hover:text-green-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
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
      icon: (
        <svg className="w-8 h-8 text-gray-300 group-hover:text-purple-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
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
      icon: (
        <svg className="w-8 h-8 text-gray-300 group-hover:text-yellow-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
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
      icon: (
        <svg className="w-8 h-8 text-gray-300 group-hover:text-red-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
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
    <section id="skills" className="min-h-screen bg-gray-900 flex flex-col items-center py-16 px-4 md:ml-64 snap-start relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/6 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
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
            Technical Expertise
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </h1>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-600"></div>

          {/* Skill Items */}
          <div className="space-y-12">
            {skillCategories.map((category, index) => (
              <div
                key={category.id}
                ref={el => itemRefs.current[category.id - 1] = el}
                data-item-id={category.id}
                className={`relative pl-12 md:pl-20 transform transition-all duration-1000 ease-out ${
                  visibleItems.has(category.id)
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-12 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 300}ms`
                }}
              >
                {/* Timeline dot */}
                <div className="absolute left-2 md:left-6 top-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-gray-900 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-ping opacity-75"></div>
                </div>

                {/* Content Card */}
                <div className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1`}>
                  <div className="mb-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {category.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gray-700/50 rounded-xl flex items-center justify-center mb-6 group-hover:border-blue-500/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-600/50">
                    <div className="relative">
                      {category.icon}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 rounded-xl animate-ping opacity-0 group-hover:opacity-100"></div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Key Skills
                    </h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <li
                          key={skillIndex}
                          className={`flex items-start gap-3 text-gray-300 text-sm transform transition-all duration-500 hover:text-white ${
                            visibleItems.has(category.id)
                              ? 'translate-x-0 opacity-100'
                              : 'translate-x-4 opacity-0'
                          }`}
                          style={{
                            transitionDelay: `${(index * 300) + (skillIndex * 100)}ms`
                          }}
                        >
                          <span className="text-blue-400 mt-1 flex-shrink-0">●</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;