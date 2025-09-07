"use client";

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Skills', href: '/skills' },
    { name: 'Ventures', href: '/ventures' },
    { name: 'Contact', href: '/contact' }
  ];

  const aboutLinks = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Achievements', href: '/achievements' }
  ];

  return (
    <footer className="bg-slate-800 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">
              Mubassir Nasar
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Full Stack Developer, Mobile App Developer, DevOps Engineer, 
              Cloud Computing Specialist, and Digital Marketing Expert building 
              innovative solutions across industries.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400 mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-8">
              <div className="space-y-2">
                {quickLinks.map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href}
                    className="block text-gray-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                {aboutLinks.map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href}
                    className="block text-gray-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-400 mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <a 
                href="mailto:mubassirnasar@gmail.com"
                className="block text-gray-300 hover:text-white text-sm transition-colors duration-200"
              >
                mubassirnasar@gmail.com
              </a>
              <div className="text-gray-300 text-sm">
                +94 705373833 (Sri Lanka)
              </div>
              <div className="text-gray-300 text-sm">
                +974 7406 2481 (Qatar)
              </div>
              <div className="text-gray-300 text-sm font-medium">
                Available for Global Projects
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span>© 2025 Mubassir Nasar. Made with</span>
              <span className="text-red-500">♥</span>
              <span>and</span>
              <span className="text-blue-400">{'</>'}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span>Powered by</span>
              <span className="text-blue-400">☕</span>
              <span>and countless hours of coding</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;