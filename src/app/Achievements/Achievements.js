"use client";

import React from 'react';

const Achievements = () => {
  const stats = [
    {
      icon: "🎯",
      number: "50+",
      label: "Projects Completed"
    },
    {
      icon: "😊",
      number: "100+",
      label: "Happy Clients"
    },
    {
      icon: "🏆",
      number: "5+",
      label: "Business Ventures"
    },
    {
      icon: "📋",
      number: "10+",
      label: "Certifications"
    }
  ];

  const achievements = [
    {
      icon: "🏆",
      title: "Hackathon Excellence Awards",
      category: "Competition Awards",
      description: "Multiple wins in technology hackathons for innovative solutions and outstanding technical implementation.",
      highlights: [
        "Best Innovation Award - Tech Hackathon 2023",
        "Outstanding Technical Solution - DevFest 2022",
        "People's Choice Award - Startup Weekend"
      ]
    },
    {
      icon: "🎖️",
      title: "GOT Campaign Award",
      category: "Marketing Excellence",
      description: "Recognition for exceptional digital marketing campaign performance and creative excellence.",
      highlights: [
        "Campaign ROI exceeded 300%",
        "Viral reach of 2M+ impressions",
        "Industry recognition for creativity"
      ]
    },
    {
      icon: "📋",
      title: "Google Digital Marketing Certification",
      category: "Professional Certification",
      description: "Comprehensive certification in Google's digital marketing ecosystem and advertising platforms.",
      highlights: [
        "Google Ads Certified",
        "Google Analytics Qualified",
        "YouTube Advertising Certified",
        "Google Shopping Ads Certified"
      ]
    },
    {
      icon: "📋",
      title: "Microsoft Azure Certifications",
      category: "Cloud Certification",
      description: "Multiple Azure certifications demonstrating expertise in cloud computing and infrastructure.",
      highlights: [
        "Azure Fundamentals (AZ-900)",
        "Azure Developer Associate (AZ-204)",
        "Azure Solutions Architect Expert",
        "Azure DevOps Engineer Expert"
      ]
    },
    {
      icon: "⭐",
      title: "Learnium Institute Achievements",
      category: "Educational Excellence",
      description: "Advanced certifications and recognition from Learnium Institute for continuous learning excellence.",
      highlights: [
        "Advanced Programming Certification",
        "Leadership in Technology Award",
        "Peer Mentorship Recognition",
        "Innovation Project Leadership"
      ]
    },
    {
      icon: "🎯",
      title: "Entrepreneurial Success",
      category: "Business Achievement",
      description: "Successfully established and scaled multiple business ventures across diverse industries.",
      highlights: [
        "5+ Successful Business Ventures",
        "100+ Satisfied Clients",
        "Multi-industry Expertise",
        "International Market Presence"
      ]
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Achievements & Recognition
        </h2>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 text-white p-8 rounded-lg text-center">
              <div className="text-2xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold mb-2">{stat.number}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white text-xl mb-6">
                {achievement.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {achievement.title}
              </h3>
              
              <div className="text-yellow-500 text-sm font-medium mb-4">
                {achievement.category}
              </div>
              
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {achievement.description}
              </p>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-900 mb-3">
                  Key Highlights
                </div>
                {achievement.highlights.map((highlight, hIndex) => (
                  <div key={hIndex} className="flex items-start text-sm text-gray-600">
                    <span className="text-yellow-500 mr-2 mt-1">★</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div className="text-center bg-white p-12 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-8">
            🎖️
          </div>
          
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-6 leading-relaxed">
            "Excellence is not a destination, but a continuous journey of learning, innovation, 
            and pushing the boundaries of what's possible."
          </blockquote>
          
          <cite className="text-gray-500 text-lg">
            - Mubassir Nasar
          </cite>
        </div>
      </div>
    </div>
  );
};

export default Achievements;