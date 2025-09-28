'use client';

import { useState, useEffect } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const languages = ['English', 'Hindi', 'Arabic', 'Tamil', 'Malayalam', 'Spanish', 'German', 'French'];
  const educationItems = [
    { degree: 'BEng Software Engineering', status: '(R)' },
    { degree: 'HND in Software Engineering', status: 'Completed' },
    { degree: 'Diploma in IT', status: 'Completed' }
  ];

  return (
    <section 
      id="about" 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center py-12 lg:py-16 px-4 lg:px-8 ml-0 lg:ml-64 pt-20 lg:pt-16"
      style={{ fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif' }}
    >
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-16 md:w-32 h-16 md:h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      {/* Page Title */}
      <div className={`transform transition-all duration-1000 delay-200 relative z-10 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}>
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 lg:mb-12 tracking-tight text-center"
          style={{ fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif' }}
        >
          About <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Me</span>
        </h1>
      </div>
      
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
        
        {/* Left Column - Main Content */}
        <div className="flex flex-col space-y-6 lg:space-y-8">
          
          {/* Main Title */}
          <div className={`transform transition-all duration-1000 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4 lg:mb-6"
              style={{ fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif' }}
            >
              Innovative Technology Professional
            </h2>
          </div>
          
          {/* Description Paragraphs */}
          <div className={`transform transition-all duration-1000 delay-600 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <p 
              className="text-gray-300 leading-relaxed text-sm md:text-base lg:text-lg mb-4 lg:mb-6"
              style={{ fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif' }}
            >
              I&apos;m a passionate and versatile technology professional with expertise spanning full-stack 
              development, mobile applications, DevOps engineering, cloud computing, and digital 
              marketing. Based in Qatar, I bring a unique blend of technical excellence and business 
              acumen to every project.
            </p>
          </div>
          
          <div className={`transform transition-all duration-1000 delay-800 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <p 
              className="text-gray-300 leading-relaxed text-sm md:text-base lg:text-lg mb-6 lg:mb-8"
              style={{ fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif' }}
            >
              My journey in technology has been driven by a constant desire to learn, innovate, and 
              solve complex problems. From developing cutting-edge mobile applications to architecting 
              scalable cloud infrastructure, I thrive on turning ideas into reality while helping businesses 
              achieve their digital transformation goals.
            </p>
          </div>
          
          {/* Location */}
          <div className={`transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="flex items-center text-gray-300 text-sm md:text-base lg:text-lg bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 backdrop-blur-sm">
              <span className="mr-3 text-xl">📍</span>
              <span 
                className="font-medium"
                style={{ fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif' }}
              >
                Qatar • Available for Global Projects
              </span>
            </div>
          </div>
        </div>
        
        {/* Right Column - Cards */}
        <div className="flex flex-col space-y-6 lg:space-y-8">
          
          {/* Education Card */}
          <div className={`transform transition-all duration-1000 delay-1200 ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl lg:rounded-2xl shadow-xl border border-gray-700/50 p-6 lg:p-8 hover:shadow-2xl hover:border-gray-600/50 transition-all duration-500 hover:scale-[1.02] group backdrop-blur-sm">
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white text-xl">🎓</span>
                </div>
                <h3 
                  className="text-xl md:text-2xl font-semibold text-white"
                  style={{ fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif' }}
                >
                  Education
                </h3>
              </div>
              
              <div className="space-y-4">
                {educationItems.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start p-3 rounded-lg bg-gray-700/30 border border-gray-600/30 hover:bg-gray-700/50 transition-all duration-300 transform ${
                      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                    }`} 
                    style={{ transitionDelay: `${1400 + index * 200}ms` }}
                  >
                    <span className="mr-3 text-blue-400 text-lg mt-0.5">▶</span>
                    <div className="flex-1">
                      <p 
                        className="font-medium text-gray-200 text-sm md:text-base"
                        style={{ fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif' }}
                      >
                        {item.degree}
                      </p>
                      <p 
                        className="text-xs md:text-sm text-gray-400 mt-1"
                        style={{ fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif' }}
                      >
                        {item.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Languages Card */}
          <div className={`transform transition-all duration-1000 delay-1600 ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl lg:rounded-2xl shadow-xl border border-gray-700/50 p-6 lg:p-8 hover:shadow-2xl hover:border-gray-600/50 transition-all duration-500 hover:scale-[1.02] group backdrop-blur-sm">
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white text-xl">🌐</span>
                </div>
                <h3 
                  className="text-xl md:text-2xl font-semibold text-white"
                  style={{ fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif' }}
                >
                  Languages
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2 md:gap-3">
                {languages.map((lang, index) => (
                  <span
                    key={lang}
                    className={`bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-400/50 transition-all duration-300 border border-gray-600/50 cursor-default transform ${
                      isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-95'
                    }`}
                    style={{ 
                      transitionDelay: `${1800 + index * 100}ms`,
                      fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif'
                    }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className={`transform transition-all duration-1000 delay-2000 ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl lg:rounded-2xl shadow-xl border border-gray-700/50 p-6 lg:p-8 hover:shadow-2xl hover:border-gray-600/50 transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm">
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <h3 
                  className="text-xl md:text-2xl font-semibold text-white"
                  style={{ fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif' }}
                >
                  Quick Facts
                </h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:bg-gray-700/50 transition-all duration-300">
                  <div 
                    className="text-2xl md:text-3xl font-bold text-blue-400 mb-1"
                    style={{ fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif' }}
                  >
                    5+
                  </div>
                  <div 
                    className="text-xs md:text-sm text-gray-400"
                    style={{ fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif' }}
                  >
                    Years Experience
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:bg-gray-700/50 transition-all duration-300">
                  <div 
                    className="text-2xl md:text-3xl font-bold text-purple-400 mb-1"
                    style={{ fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif' }}
                  >
                    50+
                  </div>
                  <div 
                    className="text-xs md:text-sm text-gray-400"
                    style={{ fontFamily: 'Helvetica, Helvetica Neue, Arial, sans-serif' }}
                  >
                    Projects Completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}