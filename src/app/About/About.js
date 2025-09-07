'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-gray-800 mb-8"
      >
        About Me
      </motion.h1>
      
      <div className="max-w-6xl w-full px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col space-y-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900">
            Innovative Technology Professional
          </h2>
          
          <p className="text-gray-600 leading-relaxed">
            I&apos;m a passionate and versatile technology professional with expertise spanning full-stack 
            development, mobile applications, DevOps engineering, cloud computing, and digital 
            marketing. Based in Qatar, I bring a unique blend of technical excellence and business 
            acumen to every project.
          </p>
          
          <p className="text-gray-600 leading-relaxed">
            My journey in technology has been driven by a constant desire to learn, innovate, and 
            solve complex problems. From developing cutting-edge mobile applications to architecting 
            scalable cloud infrastructure, I thrive on turning ideas into reality while helping businesses 
            achieve their digital transformation goals.
          </p>
          
          <div className="flex items-center text-gray-600">
            <span className="mr-2">⚪</span> {/* Placeholder for location icon */}
            Qatar • Available for Global Projects
          </div>
        </motion.div>
        
        {/* Right Column */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col space-y-6"
        >
          {/* Education Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Education</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="mr-2 text-blue-500">🎓</span> {/* Placeholder icon */}
                <div>
                  <p className="font-medium text-gray-800">BEng Software Engineering</p>
                  <p className="text-sm text-gray-500">(R)</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="mr-2 text-blue-500">🎓</span> {/* Placeholder icon */}
                <div>
                  <p className="font-medium text-gray-800">HND in Software Engineering</p>
                  <p className="text-sm text-gray-500">Completed</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="mr-2 text-blue-500">🎓</span> {/* Placeholder icon */}
                <div>
                  <p className="font-medium text-gray-800">Diploma in IT</p>
                  <p className="text-sm text-gray-500">Completed</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Languages Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <span className="mr-2 text-gray-600">🌐</span> {/* Placeholder globe icon */}
              <h3 className="text-xl font-semibold text-gray-800">Languages</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">English</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Hindi</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Arabic</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Tamil</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Malayalam</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}