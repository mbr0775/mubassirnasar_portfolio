"use client";

import React, { useState, useEffect, useRef } from 'react';

const Education = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('education');
  const headerRef = useRef(null);
  const itemRefs = useRef([]);

  const educationData = [
    {
      id: 1,
      institution: "Kingston University",
      degree: "BEng in Software Engineering",
      specialization: "Software Engineering & AI",
      period: "2024 - 2025",
      gpa: "3.8/4.0",
      location: "Colombo, Sri Lanka",
      achievements: [
        "Programming Competition Winner",
        "Dean's List for 4 consecutive semesters",
        "Graduate Research Assistant",
        "Published 2 research papers"
      ],
      skills: ["Machine Learning", "Data Structures", "Algorithm Design", "Software Architecture"],
      type: "education"
    },
    {
      id: 2,
      institution: "Person College of Education",
      degree: "Higher National Diploma in Software Engineering",
      specialization: "Mobile App Development & Networking",
      period: "2022 - 2024",
      gpa: "3.9/4.0",
      location: "Batticola, Sri Lanka",
      achievements: [
        "Magna Cum Laude Graduate",
        "Best Capstone Project Award",
        "Student Council Vice President",
        "Programming Competition Winner"
      ],
      skills: ["Networking", "Mobile App Development", "Programming", "Project Management"],
      type: "education"
    }
  ];

  const certificationData = [
    {
      id: 3,
      institution: "Esoft Metro Campus",
      degree: "Diploma in Information Technology",
      specialization: "Information Technology & Digital Marketing",
      period: "2022",
      location: "Batticola, Sri Lanka",
      achievements: [
        "Advanced cloud deployment strategies",
        "Kubernetes orchestration mastery",
        "Microservices architecture design",
        "CI/CD pipeline optimization"
      ],
      skills: ["Google Ads", "Graphic Design", "Meta Ads", "Web Development"],
      type: "certification"
    },
    {
      id: 4,
      institution: "Learnium Institute",
      degree: "Digital Marketing",
      specialization: "Digital Marketing & SEO",
      period: "2023",
      location: "Online Certification",
      achievements: [
        "Social media marketing strategies",
        "Content marketing techniques",
        "Cost optimization strategies",
        "High-availability system design"
      ],
      skills: ["Digital Marketing", "Meta Ads", "Google Analytics", "Google Ads"],
      type: "certification"
    },
    {
      id: 5,
      institution: "Google",
      degree: "Digital Marketing & E-commerce",
      specialization: "Digital Marketing",
      period: "2022",
      location: "Online Certification",
      achievements: [
        "Digital marketing fundamentals",
        "Content strategy development",
        "Email marketing best practices",
        "Social media engagement techniques"
      ],
      skills: ["Search Engine Optimization", "Web Analytics", "Mobile Marketing", "Performance"],
      type: "certification"
    }
  ];

  const getCurrentData = () => {
    return activeTab === 'education' ? educationData : certificationData;
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
  }, [activeTab]);

  // Reset visibility when tab changes
  useEffect(() => {
    setVisibleItems(new Set());
  }, [activeTab]);

  return (
    <section id="education" className="min-h-screen bg-gray-900 flex flex-col items-center py-16 px-4 md:ml-64 snap-start relative overflow-hidden">
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
            Education & Certifications
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full"></div>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Academic achievements and professional certifications that shaped my expertise in technology and innovation.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`flex justify-center mb-12 transform transition-all duration-1000 delay-200 ${
          isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 border border-gray-700/50">
            <button
              onClick={() => setActiveTab('education')}
              className={`px-6 md:px-8 py-3 rounded-lg font-medium text-sm transition-all duration-300 relative overflow-hidden ${
                activeTab === 'education'
                  ? 'text-white bg-gradient-to-r from-emerald-500 to-blue-600 shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                Education
              </span>
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              className={`px-6 md:px-8 py-3 rounded-lg font-medium text-sm transition-all duration-300 relative overflow-hidden ${
                activeTab === 'certifications'
                  ? 'text-white bg-gradient-to-r from-emerald-500 to-blue-600 shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Certifications
              </span>
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-600"></div>

          {/* Education/Certification Items */}
          <div className="space-y-12">
            {getCurrentData().map((item, index) => (
              <div
                key={`${activeTab}-${item.id}`}
                ref={el => itemRefs.current[item.id - 1] = el}
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
                          {item.degree}
                        </h3>
                        <p className="text-emerald-400 font-medium text-lg mb-1">
                          {item.institution}
                        </p>
                        {item.specialization && (
                          <p className="text-gray-400 text-sm">
                            Specialization: {item.specialization}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="inline-block bg-gradient-to-r from-emerald-500/20 to-blue-600/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium border border-emerald-500/30">
                          {item.period}
                        </span>
                        {item.gpa && (
                          <p className="text-gray-300 text-sm mt-2">GPA: {item.gpa}</p>
                        )}
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
                      {activeTab === 'education' ? 'Achievements' : 'Key Learning'}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
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

        {/* Stats Section */}
        <div className={`mt-16 transform transition-all duration-1000 delay-500 ${
          isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-emerald-400 mb-2">4+</div>
              <div className="text-gray-400">Years of Study</div>
            </div>
            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-blue-400 mb-2">5+</div>
              <div className="text-gray-400">Certifications</div>
            </div>
            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-purple-400 mb-2">3.8+</div>
              <div className="text-gray-400">Average GPA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;