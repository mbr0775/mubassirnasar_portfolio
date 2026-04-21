"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import profileImage from '../assets/profile.jpg';

export default function ResponsivePortfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { id: 'home',       label: 'HOME',       icon: '🏠' },
    { id: 'about',      label: 'ABOUT',      icon: '👤' },
    { id: 'services',   label: 'SERVICES',   icon: '⚙️' },
    { id: 'skills',     label: 'SKILLS',     icon: '💻' },
    { id: 'education',  label: 'EDUCATION',  icon: '🎓' },
    { id: 'experience', label: 'EXPERIENCE', icon: '💼' },
    { id: 'projects',   label: 'WORK',       icon: '📁' },
    { id: 'blog',       label: 'BLOG',       icon: '📝' },
    { id: 'contact',    label: 'CONTACT',    icon: '📧' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 light-mode-bg transition-colors duration-500">

      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-16 md:w-32 h-16 md:h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-500 bg-black/95 border-gray-800/50 mobile-header-light">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-700">
              <Image src={profileImage} alt="Mubassir Nasar" fill className="object-cover" priority />
            </div>
            <div>
              <h2 className="font-semibold text-sm text-white mobile-header-name">Mubassir Nasar</h2>
              <p className="text-xs text-gray-400 mobile-header-role">UI/UX Designer</p>
            </div>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative w-10 h-10 flex flex-col justify-center items-center space-y-1" aria-label="Toggle menu">
            <span className={`block w-6 h-0.5 bg-white mobile-hamburger transition-all duration-300 transform origin-center ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white mobile-hamburger transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block w-6 h-0.5 bg-white mobile-hamburger transition-all duration-300 transform origin-center ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-80 max-w-full border-l transform transition-transform duration-300 bg-black/95 border-gray-800/50 mobile-menu-light ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="pt-20 px-6">
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={item.id} className={`transform transition-all duration-300 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`} style={{ transitionDelay: `${index * 50}ms` }}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center space-x-4 px-4 py-4 rounded-xl font-medium text-sm transition-all duration-300 ${activeSection === item.id ? 'text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mobile-menu-item-active' : 'text-gray-400 hover:text-white hover:bg-gray-800/50 mobile-menu-item'}`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden lg:block w-64 fixed h-full left-0 top-0 z-10 border-r transition-all duration-1000 ease-out bg-black/95 border-gray-800/50 sidebar-light ${isLoaded ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col items-center py-12 px-6">
          <div className={`mb-4 relative transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-90'}`}>
            <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-gray-700 hover:scale-105 transition-all duration-300">
              <Image src={profileImage} alt="Mubassir Nasar" fill className="object-cover" priority />
            </div>
          </div>
          <div className={`mb-6 text-center transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h2 className="text-xl font-semibold text-white sidebar-name hover:text-blue-300 transition-colors duration-300">Mubassir Nasar</h2>
            <p className="text-xs uppercase text-gray-400 sidebar-role font-medium tracking-wider mt-1">UI/UX Designer in Qatar | Sri Lanka</p>
          </div>
          <nav className="w-full flex-1">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={item.id} className={`transform transition-all duration-700 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`} style={{ transitionDelay: `${600 + index * 100}ms` }}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`relative w-full text-center py-3 font-medium text-sm transition-all duration-300 tracking-wider group overflow-hidden ${activeSection === item.id ? 'text-white sidebar-nav-active bg-gray-800/50' : 'text-gray-400 sidebar-nav-item hover:text-white hover:bg-gray-800/30'}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 transform transition-transform duration-300 ${activeSection === item.id ? 'translate-x-0' : '-translate-x-full group-hover:translate-x-0'}`} />
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 w-0 group-hover:w-3/4 transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 lg:pt-0 lg:ml-64 min-h-screen flex flex-col lg:flex-row">
        <div className="flex-1 flex items-center justify-center px-6 lg:px-16 py-12 lg:py-0 relative z-10">
          <div className="max-w-lg w-full text-center lg:text-left">
            <div className={`transform transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-light leading-none mb-6 text-white hero-heading">
                <span className="inline-block">I am</span>
                <br />
                <span className="text-3xl md:text-4xl lg:text-6xl font-light">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                    a Creative Tech Expert
                  </span>
                </span>
              </h1>
            </div>
            <div className={`transform transition-all duration-1000 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="mb-8 leading-relaxed text-sm md:text-base text-gray-400 hero-desc hover:text-gray-300 transition-colors duration-300">
                Full Stack Dev, Mobile Apps, DevOps &amp; Digital Marketing Expert
              </p>
            </div>
            <div className={`transform transition-all duration-1000 delay-600 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <button
                onClick={() => scrollToSection('projects')}
                className="relative border-2 px-6 md:px-10 py-3 md:py-4 font-medium uppercase tracking-widest text-xs md:text-sm inline-flex items-center gap-2 group overflow-hidden transition-all duration-500 border-gray-400 text-gray-400 portfolio-btn"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">VIEW PORTFOLIO</span>
                <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="hidden md:block w-full md:w-1/2 lg:w-1/2 relative overflow-hidden min-h-[50vh] lg:min-h-screen bg-gray-800 hero-image-bg">
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 transition-transform duration-1000 ease-out"
            style={{ transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)` }}
          />
          <div className={`relative w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 hero-photo-bg transition-all duration-1000 delay-300 ${isLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}>
            <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl">
              <Image src={profileImage} alt="Mubassir Nasar" fill className="object-cover" priority />
            </div>
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-100 shadow-lg" />
            <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300 shadow-lg" />
            <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-500 shadow-lg" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        </div>
      </div>

      {/* Mobile nav dots */}
      <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {['home', 'about', 'projects'].map((id) => (
          <button key={id} onClick={() => scrollToSection(id)} className={`w-3 h-3 rounded-full transition-all duration-300 shadow-lg ${activeSection === id ? 'bg-blue-400 scale-125' : 'bg-gray-500 hover:bg-gray-400'}`} aria-label={`Go to ${id}`} />
        ))}
      </div>

      <style jsx>{`
        :global(html:not(.dark)) .light-mode-bg {
          background: linear-gradient(135deg, #f0f4ff 0%, #e8eeff 50%, #f5f0ff 100%) !important;
        }
        :global(html:not(.dark)) .mobile-header-light {
          background: rgba(255,255,255,0.95) !important;
          border-color: #e5e7eb !important;
        }
        :global(html:not(.dark)) .mobile-header-name { color: #111827 !important; }
        :global(html:not(.dark)) .mobile-header-role { color: #6b7280 !important; }
        :global(html:not(.dark)) .mobile-hamburger { background-color: #111827 !important; }
        :global(html:not(.dark)) .mobile-menu-light {
          background: rgba(255,255,255,0.98) !important;
          border-color: #e5e7eb !important;
        }
        :global(html:not(.dark)) .mobile-menu-item { color: #374151 !important; }
        :global(html:not(.dark)) .mobile-menu-item-active { color: #111827 !important; }
        :global(html:not(.dark)) .sidebar-light {
          background: rgba(255,255,255,0.98) !important;
          border-color: #e5e7eb !important;
          box-shadow: 2px 0 20px rgba(0,0,0,0.08) !important;
        }
        :global(html:not(.dark)) .sidebar-name { color: #111827 !important; }
        :global(html:not(.dark)) .sidebar-role { color: #6b7280 !important; }
        :global(html:not(.dark)) .sidebar-nav-item { color: #374151 !important; }
        :global(html:not(.dark)) .sidebar-nav-active {
          color: #111827 !important;
          background: rgba(243,244,246,0.8) !important;
        }
        :global(html:not(.dark)) .hero-heading { color: #111827 !important; }
        :global(html:not(.dark)) .hero-desc { color: #4b5563 !important; }
        :global(html:not(.dark)) .portfolio-btn {
          border-color: #374151 !important;
          color: #374151 !important;
        }
        :global(html:not(.dark)) .hero-image-bg { background: #e8eeff !important; }
        :global(html:not(.dark)) .hero-photo-bg {
          background: linear-gradient(135deg, #dbeafe, #ede9fe) !important;
        }
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
      `}</style>
    </div>
  );
}