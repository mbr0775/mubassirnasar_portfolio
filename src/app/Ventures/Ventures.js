"use client";

import React from 'react';

const Ventures = () => {
  const ventures = [
    {
      id: 1,
      title: "MBR IT Solutions",
      category: "Information Technology",
      description: "Comprehensive IT services including software development, cloud solutions, and digital transformation consultancy.",
      icon: (
        <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      ),
      keyServices: [
        "Custom Software Development",
        "Cloud Migration Services",
        "IT Consulting",
        "Digital Transformation",
        "System Integration"
      ]
    },
    {
      id: 2,
      title: "MBR Agriculture",
      category: "Agriculture & Sustainability",
      description: "Innovative agricultural solutions focusing on sustainable farming practices and modern agricultural technology.",
      icon: (
        <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22V16H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V16H2V14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M5,16V20H19V16H5M8.5,11A1.5,1.5 0 0,0 7,12.5A1.5,1.5 0 0,0 8.5,14A1.5,1.5 0 0,0 10,12.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 14,12.5A1.5,1.5 0 0,0 15.5,14A1.5,1.5 0 0,0 17,12.5A1.5,1.5 0 0,0 15.5,11Z"/>
        </svg>
      ),
      keyServices: [
        "Sustainable Farming Solutions",
        "Agricultural Technology",
        "Crop Management Systems",
        "Smart Irrigation",
        "Agricultural Consulting"
      ]
    },
    {
      id: 3,
      title: "MBR Exports",
      category: "International Trade",
      description: "Global export services connecting businesses with international markets and facilitating trade relationships.",
      icon: (
        <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M15,9L12,12L9,9H15Z"/>
        </svg>
      ),
      keyServices: [
        "Export Facilitation",
        "International Market Research",
        "Trade Documentation",
        "Supply Chain Management",
        "Global Partnership Development"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Entrepreneurial Ventures</h1>
          <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
            Building innovative businesses across multiple industries, from technology and agriculture to 
            international trade and digital marketing.
          </p>
        </div>

        {/* Ventures Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ventures.map((venture) => (
            <div key={venture.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
              {/* Icon */}
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                {venture.icon}
              </div>

              {/* Title and Category */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{venture.title}</h2>
                <p className="text-yellow-400 font-medium text-sm">{venture.category}</p>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-center mb-8 leading-relaxed">
                {venture.description}
              </p>

              {/* Key Services */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Key Services</h3>
                <ul className="space-y-3">
                  {venture.keyServices.map((service, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="text-yellow-400 mt-1 flex-shrink-0">●</span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ventures;