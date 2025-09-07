"use client";

import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      id: 1,
      title: "Mobile App Development",
      subtitle: "Native and cross-platform mobile solutions",
      icon: (
        <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
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

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Technical Expertise</h1>
        </div>

        {/* Skills Grid - First 3 skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {skillCategories.slice(0, 3).map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
              {/* Icon */}
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                {category.icon}
              </div>

              {/* Title and Subtitle */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h2>
                <p className="text-gray-500 text-sm">{category.subtitle}</p>
              </div>

              {/* Skills List */}
              <ul className="space-y-3">
                {category.skills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600 text-sm">
                    <span className="text-yellow-400 mt-1 flex-shrink-0">●</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills Grid - Last 2 skills (centered) */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
            {skillCategories.slice(3, 5).map((category) => (
              <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
                {/* Icon */}
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {category.icon}
                </div>

                {/* Title and Subtitle */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h2>
                  <p className="text-gray-500 text-sm">{category.subtitle}</p>
                </div>

                {/* Skills List */}
                <ul className="space-y-3">
                  {category.skills.map((skill, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="text-yellow-400 mt-1 flex-shrink-0">●</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;