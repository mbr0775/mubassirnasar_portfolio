"use client";

import React, { useState, useEffect, useRef } from 'react';

const Blog = () => {
  const [visiblePosts, setVisiblePosts] = useState(new Set());
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredPost, setHoveredPost] = useState(null);
  const headerRef = useRef(null);
  const postRefs = useRef([]);

  const categories = [
    { id: 'all', label: 'All Posts', icon: '📝' },
    { id: 'mobile', label: 'Mobile Dev', icon: '📱' },
    { id: 'web', label: 'Web Dev', icon: '🌐' },
    { id: 'devops', label: 'DevOps', icon: '⚙️' },
    { id: 'marketing', label: 'Marketing', icon: '📈' }
  ];

  const posts = [
    {
      id: 1,
      title: "Building Cross-Platform Apps with React Native",
      category: "mobile",
      description: "Exploring the benefits and challenges of using React Native for mobile app development, with practical examples from real projects.",
      image: "📱", // Placeholder - replace with actual image
      tags: ["React Native", "Mobile Development", "Cross-platform"],
      features: [
        "Performance optimization tips",
        "Integration with native modules",
        "Deployment strategies"
      ],
      publishDate: "2024-05-15",
      readTime: "8 min",
      role: "Author",
      liveUrl: "https://blog.example.com/react-native-guide",
      status: "Published"
    },
    {
      id: 2,
      title: "Mastering Full-Stack Web Development with Next.js",
      category: "web",
      description: "A deep dive into building scalable web applications using Next.js, including server-side rendering and API routes.",
      image: "🌐", // Placeholder - replace with actual image
      tags: ["Next.js", "React.js", "Node.js", "Full Stack"],
      features: [
        "SSR vs CSR comparison",
        "Authentication implementation",
        "Database integration"
      ],
      publishDate: "2024-03-20",
      readTime: "10 min",
      role: "Author",
      liveUrl: "https://blog.example.com/nextjs-mastery",
      status: "Published"
    },
    {
      id: 3,
      title: "Implementing CI/CD Pipelines with Docker and Kubernetes",
      category: "devops",
      description: "Guide to setting up automated deployment pipelines using containerization and orchestration tools.",
      image: "⚙️", // Placeholder - replace with actual image
      tags: ["Docker", "Kubernetes", "CI/CD", "DevOps"],
      features: [
        "Pipeline configuration",
        "Monitoring setup",
        "Scaling strategies"
      ],
      publishDate: "2024-07-10",
      readTime: "12 min",
      role: "Author",
      liveUrl: "https://blog.example.com/cicd-pipelines",
      status: "Published"
    },
    {
      id: 4,
      title: "Effective SEO Strategies for Modern Websites",
      category: "marketing",
      description: "Comprehensive overview of on-page, off-page, and technical SEO techniques to improve search rankings.",
      image: "📈", // Placeholder - replace with actual image
      tags: ["SEO", "Digital Marketing", "Google Analytics"],
      features: [
        "Keyword research methods",
        "Content optimization",
        "Performance metrics"
      ],
      publishDate: "2024-01-05",
      readTime: "7 min",
      role: "Author",
      liveUrl: "https://blog.example.com/seo-strategies",
      status: "Published"
    },
    {
      id: 5,
      title: "Android App Development with Kotlin and Jetpack",
      category: "mobile",
      description: "Best practices for building native Android apps using modern Kotlin features and Jetpack components.",
      image: "🤖", // Placeholder - replace with actual image
      tags: ["Kotlin", "Android", "Jetpack Compose"],
      features: [
        "UI composition",
        "State management",
        "Testing approaches"
      ],
      publishDate: "2024-08-25",
      readTime: "9 min",
      role: "Author",
      liveUrl: "https://blog.example.com/android-kotlin",
      status: "Published"
    },
    {
      id: 6,
      title: "Database Optimization Techniques for Web Apps",
      category: "web",
      description: "Strategies for improving database performance in web applications using SQL and NoSQL databases.",
      image: "💾", // Placeholder - replace with actual image
      tags: ["PostgreSQL", "MongoDB", "Database Optimization"],
      features: [
        "Indexing strategies",
        "Query optimization",
        "Caching mechanisms"
      ],
      publishDate: "2024-04-30",
      readTime: "11 min",
      role: "Author",
      liveUrl: "https://blog.example.com/database-optimization",
      status: "Published"
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      });
    }, observerOptions);

    const postObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const postId = parseInt(entry.target.dataset.postId);
          setVisiblePosts(prev => new Set([...prev, postId]));
        }
      });
    }, observerOptions);

    if (headerRef.current) {
      headerObserver.observe(headerRef.current);
    }

    postRefs.current.forEach((ref) => {
      if (ref) {
        postObserver.observe(ref);
      }
    });

    return () => {
      headerObserver.disconnect();
      postObserver.disconnect();
    };
  }, [selectedCategory]);

  useEffect(() => {
    setVisiblePosts(new Set());
  }, [selectedCategory]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section id="blog" className="min-h-screen bg-gray-900 flex flex-col items-center py-16 px-4 md:ml-64 snap-start relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/6 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl w-full relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-12 transform transition-all duration-1000 ease-out ${
            isHeaderVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
        >
          <h1 className="text-5xl font-light text-white mb-4 font-sans tracking-tight relative">
            Blog Posts
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-full"></div>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Insights, tutorials, and thoughts on technology, development, and digital innovation.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transform transition-all duration-1000 delay-200 ${
          isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 border backdrop-blur-sm transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white border-transparent shadow-lg'
                  : 'bg-gray-800/50 text-gray-400 border-gray-700/50 hover:text-white hover:border-cyan-500/50'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{category.icon}</span>
                {category.label}
              </span>
            </button>
          ))}
        </div>

        {/* Blog Posts Layout */}
        <div className="space-y-12">
          {filteredPosts.map((post, index) => (
            <div
              key={`${selectedCategory}-${post.id}`}
              ref={el => postRefs.current[post.id - 1] = el}
              data-post-id={post.id}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 
                backdrop-blur-lg border border-gray-700/30 hover:border-cyan-500/40 
                transition-all duration-700 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 ${
                visiblePosts.has(post.id)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
              }`}
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              {/* Animated background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-pink-500/20 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-700"></div>

              <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} min-h-[400px]`}>
                {/* Post Showcase - Featured Image */}
                <div className="flex-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-900/40"></div>
                  
                  {/* Modern image container */}
                  <div className="h-full flex items-center justify-center p-6 md:p-12 relative">
                    <div className="relative transform group-hover:scale-105 transition-transform duration-500">
                      {/* Image frame */}
                      <div className="w-80 h-48 bg-gray-800 rounded-2xl p-2 shadow-2xl">
                        <div className="w-full h-full bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-500 rounded-xl flex items-center justify-center relative overflow-hidden">
                          <div className="text-5xl">{post.image}</div>
                          {/* Reflection */}
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                        </div>
                      </div>
                      {/* Floating elements */}
                      <div className="absolute -top-4 -right-4 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
                      <div className="absolute -bottom-6 -left-6 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-300"></div>
                    </div>

                    {/* Status badge */}
                    <div className={`absolute top-6 right-6 px-4 py-2 rounded-full backdrop-blur-lg border text-sm font-medium ${getStatusColor(post.status)} shadow-lg`}>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                        {post.status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Information */}
                <div className="flex-1 p-6 md:p-12 flex flex-col justify-center relative z-10">
                  {/* Category badge */}
                  <div className="inline-block mb-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30 backdrop-blur-sm">
                      {categories.find(cat => cat.id === post.category)?.icon} {categories.find(cat => cat.id === post.category)?.label}
                    </span>
                  </div>

                  {/* Title with gradient */}
                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-white group-hover:to-violet-300 transition-all duration-500">
                    {post.title}
                  </h3>

                  {/* Meta information */}
                  <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-6">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {post.publishDate}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readTime}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 group-hover:text-white transition-colors duration-300">
                    {post.description}
                  </p>

                  {/* Tags with modern pills */}
                  <div className="mb-8">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`px-4 py-2 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-full text-sm font-medium border border-gray-600/50 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-300 transform hover:scale-105 ${
                            visiblePosts.has(post.id)
                              ? 'translate-y-0 opacity-100'
                              : 'translate-y-4 opacity-0'
                          }`}
                          style={{
                            transitionDelay: `${(index * 200) + (tagIndex * 50)}ms`
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="flex gap-4">
                    {post.liveUrl && (
                      <a
                        href={post.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-violet-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:from-cyan-400 hover:to-violet-500 hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
                      >
                        <span>Read More</span>
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={`mt-16 transform transition-all duration-1000 delay-700 ${
          isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{posts.length}+</div>
              <div className="text-gray-400">Posts Published</div>
            </div>
            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-violet-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-violet-400 mb-2">5+</div>
              <div className="text-gray-400">Categories</div>
            </div>
            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-pink-400 mb-2">10k+</div>
              <div className="text-gray-400">Total Views</div>
            </div>
            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-orange-400 mb-2">2+</div>
              <div className="text-gray-400">Years Blogging</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`mt-16 text-center transform transition-all duration-1000 delay-900 ${
          isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-gradient-to-br from-gray-800/50 via-gray-800/30 to-gray-900/50 backdrop-blur-lg rounded-3xl p-12 border border-gray-700/30">
            <h3 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">
              Subscribe for Updates
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Get notified about new posts on technology, development, and more.
            </p>
            <button className="group bg-gradient-to-r from-cyan-500 to-violet-600 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 hover:from-cyan-400 hover:to-violet-500 hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105">
              <span className="flex items-center gap-3">
                Subscribe Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;