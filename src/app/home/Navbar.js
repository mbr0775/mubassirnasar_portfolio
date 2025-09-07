"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-transparent py-4">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => { scrollToSection('home'); setIsOpen(false); }}
                  className="w-full text-left text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium hover:bg-gray-100 py-2 px-4 rounded-md"
                >
                  Home
                </button>
                <button
                  onClick={() => { scrollToSection('about'); setIsOpen(false); }}
                  className="w-full text-left text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium hover:bg-gray-100 py-2 px-4 rounded-md"
                >
                  About
                </button>
                <button
                  onClick={() => { scrollToSection('skills'); setIsOpen(false); }}
                  className="w-full text-left text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium hover:bg-gray-100 py-2 px-4 rounded-md"
                >
                  Skills
                </button>
                <button
                  onClick={() => { scrollToSection('projects'); setIsOpen(false); }}
                  className="w-full text-left text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium hover:bg-gray-100 py-2 px-4 rounded-md"
                >
                  Projects
                </button>
                <button
                  onClick={() => { scrollToSection('ventures'); setIsOpen(false); }}
                  className="w-full text-left text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium hover:bg-gray-100 py-2 px-4 rounded-md"
                >
                  Ventures
                </button>
                <button
                  onClick={() => { scrollToSection('achievements'); setIsOpen(false); }}
                  className="w-full text-left text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium hover:bg-gray-100 py-2 px-4 rounded-md"
                >
                  Achievements
                </button>
                <button
                  onClick={() => { scrollToSection('contact'); setIsOpen(false); }}
                  className="w-full text-left text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium hover:bg-gray-100 py-2 px-4 rounded-md"
                >
                  Contact
                </button>
                {/* Hire Me Button in Mobile Menu */}
                <button
                  onClick={() => { scrollToSection('contact'); setIsOpen(false); }}
                  className="w-full text-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-md transition-colors duration-200 mt-2"
                >
                  Hire Me
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            Mubassir
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('ventures')}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Ventures
            </button>
            <button
              onClick={() => scrollToSection('achievements')}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Achievements
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Contact
            </button>
          </div>
          
          {/* Hire Me Button - Desktop */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Hire Me
            </button>
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}