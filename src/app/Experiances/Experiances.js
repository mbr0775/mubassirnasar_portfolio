"use client";

import React, { useState, useEffect, useRef } from 'react';

const Experiences = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const headerRef = useRef(null);
  const itemRefs = useRef([]);

  const experienceData = [
    {
      id: 1,
      company: "Innovatech Solutions",
      role: "Senior Software Engineer",
      period: "2023 - Present",
      location: "Manila, Philippines",
      achievements: [
        "Led AI-powered platform development",
        "Optimized performance by 40%",
        "Mentored junior team members"
      ],
      skills: ["React", "Node.js", "AWS", "Machine Learning"]
    },
    {
      id: 2,
      company: "WebDev Corp",
      role: "Full Stack Developer",
      period: "2020 - 2023",
      location: "Quezon City, Philippines",
      achievements: [
        "Built scalable web applications",
        "Implemented CI/CD pipelines",
        "Collaborated with teams"
      ],
      skills: ["JavaScript", "Python", "Docker", "SQL"]
    },
    {
      id: 3,
      company: "Startup Inc",
      role: "Junior Developer",
      period: "2018 - 2020",
      location: "Makati, Philippines",
      achievements: [
        "Developed mobile apps",
        "Integrated APIs",
        "Contributed to open-source"
      ],
      skills: ["React Native", "Firebase", "Git"]
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
    <section id="experiences" className="min-h-screen bg-gray-900 flex flex-col items-center py-16 px-4 md:ml-64 snap-start relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/6 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
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
            Professional Experiences
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full"></div>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Key roles and achievements in my professional journey.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-600"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experienceData.map((item, index) => (
              <div
                key={item.id}
                ref={el => itemRefs.current[index] = el}
                data-item-id={item.id}
                className={`relative pl-12 md:pl-20 transform transition-all duration-1000 ease-out ${
                  visibleItems.has(item.id)
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-12 opacity-0'
                }`}
                style={{
                  transitionDelay: `${index * 300}ms`
                }}
              >
                {/* Timeline dot */}
                <div className="absolute left-2 md:left-6 top-6 w-4 h-4 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full border-4 border-gray-900 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full animate-ping opacity-75"></div>
                </div>

                {/* Content Card */}
                <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-semibold text-white mb-1 group-hover:text-emerald-300 transition-colors duration-300">
                          {item.role}
                        </h3>
                        <p className="text-emerald-400 font-medium text-lg mb-1">
                          {item.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block bg-gradient-to-r from-emerald-500/20 to-blue-600/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium border border-emerald-500/30">
                          {item.period}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {item.location}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Key Achievements
                    </h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {item.achievements.map((achievement, achIndex) => (
                        <li
                          key={achIndex}
                          className={`flex items-start gap-3 text-gray-300 text-sm transform transition-all duration-500 hover:text-white ${
                            visibleItems.has(item.id)
                              ? 'translate-x-0 opacity-100'
                              : 'translate-x-4 opacity-0'
                          }`}
                          style={{
                            transitionDelay: `${(index * 300) + (achIndex * 100)}ms`
                          }}
                        >
                          <span className="text-emerald-400 mt-1 flex-shrink-0">●</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills Tags */}
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Key Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 transform ${
                            visibleItems.has(item.id)
                              ? 'translate-y-0 opacity-100'
                              : 'translate-y-2 opacity-0'
                          }`}
                          style={{
                            transitionDelay: `${(index * 300) + (skillIndex * 50)}ms`
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
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

export default Experiences;