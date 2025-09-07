"use client";

import Image from "next/image";
import { ChevronDownIcon, EnvelopeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

// Profile image variable import
import profileImage from "../assets/profile.jpg"; // Update this path to match your actual image location

export default function HomeSection() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col justify-center items-center pt-16 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Image */}
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
            <Image
              src={profileImage}
              alt="Mubassir Nasar"
              width={192}
              height={192}
              className="w-full h-full object-cover object-center"
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Mubassir Nasar
        </h1>

        {/* Professional Titles */}
        <div className="text-lg md:text-xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
          <p className="mb-2">
            Full Stack Developer • Mobile App Developer • DevOps Engineer • Cloud Computing Specialist • Digital Marketing Expert
          </p>
        </div>

        {/* Location */}
        <p className="text-gray-500 mb-12 text-lg">
          Based in Qatar • Serving Global Clients
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2"
          >
            <EnvelopeIcon className="w-5 h-5" />
            Hire Me
          </button>
          <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2">
            <ArrowDownTrayIcon className="w-5 h-5" />
            Download CV
          </button>
        </div>

        {/* Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDownIcon 
            className="w-8 h-8 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            onClick={() => scrollToSection('about')}
          />
        </div>
      </div>
    </section>
  );
}