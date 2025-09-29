"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { services, colorClasses } from './Services'; // Adjust if your Services folder/path is different
import { services, colorClasses } from './servicesData'; // Adjust path as needed



const ServiceDetail = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <section className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Service not found</div>
      </section>
    );
  }

  const colors = colorClasses[service.color];

  return (
    <section className="min-h-screen bg-gray-900 flex flex-col items-center py-16 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 bg-${service.color}-500/5 rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-${service.color}-500/5 rounded-full blur-3xl animate-pulse delay-1000`}></div>
        <div className={`absolute top-1/2 right-1/6 w-32 h-32 bg-${service.color}-500/5 rounded-full blur-2xl animate-pulse delay-500`}></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r ${colors.gradient} mb-4 font-sans tracking-tight`}>
            {service.title}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Dive deeper into our {service.title.toLowerCase()} offerings and discover how we can help your business thrive.
          </p>
        </div>

        {/* Main Content Card */}
        <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border ${colors.border} p-8`}>
          {/* Icon */}
          <div className={`w-20 h-20 bg-gray-700/50 rounded-xl flex items-center justify-center mb-8 mx-auto border ${colors.border}`}>
            <div className={`${colors.icon}`}>
              {service.icon}
            </div>
          </div>

          {/* Description */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {service.description} 
              <br /><br />
              Our approach combines industry best practices with innovative techniques to deliver solutions that are not only functional but also scalable and user-friendly. Whether you're starting from scratch or looking to enhance an existing system, we tailor our services to meet your specific needs.
            </p>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-300 bg-gray-700/30 rounded-lg p-4">
                  <span className="text-emerald-400 mt-1 flex-shrink-0">●</span>
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Sections - Customize as needed */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Why Choose This Service?</h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">●</span>
                <div>
                  <strong>Expertise:</strong> Backed by years of experience in the field.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">●</span>
                <div>
                  <strong>Customization:</strong> Tailored solutions to fit your unique requirements.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">●</span>
                <div>
                  <strong>Support:</strong> Ongoing maintenance and support post-launch.
                </div>
              </li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Case Studies / Examples</h2>
            <p className="text-gray-300 leading-relaxed">
              Explore our portfolio of successful projects in {service.title.toLowerCase()}. From startups to enterprise-level applications, we've delivered results that drive growth and efficiency.
            </p>
            {/* You can add images, links, or carousels here */}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button 
              onClick={() => window.history.back()}
              className={`py-3 px-8 border border-gray-600 text-gray-300 rounded-lg hover:border-transparent hover:text-white transition-all duration-300 relative overflow-hidden group/btn mr-4`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300`}></div>
              <span className="relative z-10 font-medium">Back to Services</span>
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetail;