"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, X, Calendar, Users, Award, Target, Monitor, Smartphone } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const ProjectsWorks = () => {
  const [activeCategory,  setActiveCategory]  = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(new Set());
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [currentSlides,   setCurrentSlides]   = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalSlide,      setModalSlide]      = useState(0);
  const [projects,        setProjects]        = useState([]);
  const [loading,         setLoading]         = useState(true);
  const headerRef   = useRef(null);
  const projectRefs = useRef([]);

  const categories = [
    { id: 'all',       name: 'All Projects'     },
    { id: 'mobile',    name: 'Mobile Apps'       },
    { id: 'fullstack', name: 'Full Stack'        },
    { id: 'marketing', name: 'Digital Marketing' },
    { id: 'devops',    name: 'DevOps'            },
  ];

  const colorClasses = {
    gradient : "from-[#313E17] to-[#44561f]",
    hover    : "hover:shadow-[#313E17]/25",
    border   : "border-[#313E17]/50",
    bg       : "bg-[#313E17]/10",
    text     : "text-[#313E17]",
  };

  // ── Fetch projects ──────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setProjects(data);
        const initialSlides = {};
        data.forEach(p => { initialSlides[p.id] = 0; });
        setCurrentSlides(initialSlides);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  // ── Intersection observers ──────────────────────────────────────────────────
  useEffect(() => {
    const opts = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const headerObs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsHeaderVisible(true); }, opts
    );
    const projObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.dataset.projectId;
          setVisibleProjects(prev => new Set([...prev, id]));
        }
      });
    }, opts);
    if (headerRef.current) headerObs.observe(headerRef.current);
    projectRefs.current.forEach(r => { if (r) projObs.observe(r); });
    return () => { headerObs.disconnect(); projObs.disconnect(); };
  }, [projects]);

  // ── Lock body scroll when modal open ───────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : 'unset';
    if (selectedProject) setModalSlide(0);
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  // ── Card slider helpers ────────────────────────────────────────────────────
  const nextCardSlide = (e, projectId, len) => {
    e.stopPropagation();
    setCurrentSlides(prev => ({ ...prev, [projectId]: (prev[projectId] + 1) % len }));
  };
  const prevCardSlide = (e, projectId, len) => {
    e.stopPropagation();
    setCurrentSlides(prev => ({ ...prev, [projectId]: (prev[projectId] - 1 + len) % len }));
  };

  // ── Modal slider helpers ───────────────────────────────────────────────────
  const nextModalSlide = (len) => setModalSlide(s => (s + 1) % len);
  const prevModalSlide = (len) => setModalSlide(s => (s - 1 + len) % len);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // ─────────────────────────────────────────────────────────────────────────
  // CARD image section
  // 2 images  → desktop browser mockup (left) + mobile phone mockup (right)
  // 1 or 3+   → standard slider
  // ─────────────────────────────────────────────────────────────────────────
  const CardImageSection = ({ project }) => {
    const images       = project.images || [];
    const currentSlide = currentSlides[project.id] || 0;

    /* ── Dual layout: exactly 2 images ── */
    if (images.length === 2) {
      return (
        <div className="relative overflow-hidden bg-gray-900" style={{ height: "260px" }}>
          {/* Tinted backdrop */}
          <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} opacity-10`} />

          {/* Layout: desktop left, mobile right */}
          <div className="absolute inset-0 flex items-end px-4 pb-0 gap-2">

            {/* ── Desktop mockup (browser chrome) ── */}
            <div className="flex-1 flex items-end min-w-0">
              <div
                className="relative w-full rounded-t-xl overflow-hidden shadow-2xl border border-white/10 bg-gray-800"
                style={{ height: "210px" }}
              >
                {/* Browser chrome bar */}
                <div className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-700/90 border-b border-white/5 flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-red-400/70 flex-shrink-0" />
                  <span className="w-2 h-2 rounded-full bg-yellow-400/70 flex-shrink-0" />
                  <span className="w-2 h-2 rounded-full bg-green-400/70 flex-shrink-0" />
                  <div className="flex-1 ml-1.5 h-3 rounded bg-gray-600/60 flex items-center px-1.5 gap-1 min-w-0">
                    <Monitor className="w-2 h-2 text-gray-400 flex-shrink-0" />
                    <div className="h-1.5 w-12 bg-gray-500/50 rounded flex-shrink-0" />
                  </div>
                </div>
                {/* Desktop screenshot — fills remaining height */}
                <div className="relative overflow-hidden" style={{ height: "calc(210px - 28px)" }}>
                  <img
                    src={images[0]}
                    alt={`${project.title} desktop`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* ── Mobile mockup (phone chrome) ── */}
            <div className="flex-shrink-0 flex items-end" style={{ width: "88px" }}>
              <div
                className="relative w-full rounded-t-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-gray-900"
                style={{ height: "230px" }}
              >
                {/* Notch */}
                <div className="absolute top-0 left-0 right-0 h-5 bg-gray-900 z-10 flex items-center justify-center flex-shrink-0">
                  <div className="w-8 h-1.5 rounded-full bg-gray-700" />
                </div>
                {/* Mobile screenshot — starts below notch */}
                <div className="absolute left-0 right-0 bottom-0 overflow-hidden" style={{ top: "20px" }}>
                  <img
                    src={images[1]}
                    alt={`${project.title} mobile`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Smartphone icon at bottom */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-black/50 backdrop-blur-sm">
                    <Smartphone className="w-2.5 h-2.5 text-white/70" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-900/60 to-transparent pointer-events-none" />

          {/* Category badge */}
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${colorClasses.bg} backdrop-blur-sm border ${colorClasses.border} z-10`}>
            <span className={`text-xs font-medium ${colorClasses.text}`}>
              {categories.find(c => c.id === project.category)?.name || project.category}
            </span>
          </div>

          {/* Dual-screen label */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-gray-900/70 backdrop-blur-sm border border-white/10 z-10">
            <Monitor className="w-3 h-3 text-gray-300" />
            <span className="text-[10px] text-gray-400 font-medium">+</span>
            <Smartphone className="w-2.5 h-2.5 text-gray-300" />
          </div>
        </div>
      );
    }

    /* ── Slider layout: 1 or 3+ images ── */
    return (
      <div className="relative h-64 overflow-hidden bg-gray-800 group/slider">
        {images.length > 0 ? (
          <>
            {images.map((image, imgIndex) => (
              <div
                key={imgIndex}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  currentSlide === imgIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image}
                  alt={`${project.title} ${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
              </div>
            ))}

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => prevCardSlide(e, project.id, images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-900 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover/slider:opacity-100 z-20 shadow-lg border border-white/10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => nextCardSlide(e, project.id, images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-900 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover/slider:opacity-100 z-20 shadow-lg border border-white/10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {images.map((_, imgIndex) => (
                    <button
                      key={imgIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlides(prev => ({ ...prev, [project.id]: imgIndex }));
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentSlide === imgIndex
                          ? `w-8 bg-gradient-to-r ${colorClasses.gradient}`
                          : 'w-1.5 bg-gray-400/60 hover:bg-gray-300/80'
                      }`}
                    />
                  ))}
                </div>

                <div className="absolute top-3 right-3 bg-gray-900/70 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full z-20 border border-white/10">
                  {currentSlide + 1} / {images.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <svg className="w-12 h-12 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span className="text-xs text-gray-600">No images yet</span>
          </div>
        )}

        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full ${colorClasses.bg} backdrop-blur-sm border ${colorClasses.border} z-20`}>
          <span className={`text-xs font-medium ${colorClasses.text}`}>
            {categories.find(c => c.id === project.category)?.name || project.category}
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <section
        id="projects"
        className="proj-section min-h-screen bg-gray-900 flex flex-col items-center py-16 px-4 md:ml-64 snap-start relative overflow-hidden"
      >
        {/* Ambient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#313E17]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-[#313E17]/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-[#313E17]/5 rounded-full blur-2xl animate-pulse delay-500" />
        </div>

        <div className="max-w-7xl w-full relative z-10">

          {/* Header */}
          <div
            ref={headerRef}
            className={`text-center mb-12 transform transition-all duration-1000 ease-out ${
              isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <h1 className="proj-heading text-5xl font-light text-white mb-4 font-sans tracking-tight relative">
              Featured Works
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-[#313E17] to-[#44561f] rounded-full" />
            </h1>
            <p className="proj-subtext text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mt-4">
              Explore my portfolio of successful projects across mobile development, web applications,
              marketing campaigns, and cloud infrastructure.
            </p>
          </div>

          {/* Category Filter */}
          <div
            className={`flex flex-wrap justify-center gap-3 mb-12 transform transition-all duration-1000 delay-200 ${
              isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`proj-filter-btn px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-[#313E17] to-[#44561f] text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700 proj-filter-inactive'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-24">
              <div className="w-8 h-8 border-2 border-[#44561f] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Empty */}
          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-24">
              <p className="text-gray-500 text-lg">No projects found.</p>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  ref={el => projectRefs.current[index] = el}
                  data-project-id={project.id}
                  className={`group transform transition-all duration-1000 ease-out ${
                    visibleProjects.has(project.id) ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className={`proj-card bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:shadow-2xl ${colorClasses.hover} hover:border-transparent transition-all duration-500 transform hover:-translate-y-2`}>

                    <CardImageSection project={project} />

                    {/* Content */}
                    <div className="p-6">
                      <h3 className={`proj-card-title text-2xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${colorClasses.gradient} transition-all duration-300`}>
                        {project.title}
                      </h3>
                      <p className="proj-card-desc text-gray-400 mb-4 leading-relaxed line-clamp-2">{project.description}</p>

                      {project.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, ti) => (
                            <span key={ti} className="proj-tech-tag px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {project.stats && Object.keys(project.stats).length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-gray-700/50 proj-stats-divider">
                          {Object.entries(project.stats).slice(0, 3).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className={`text-lg font-bold ${colorClasses.text}`}>{value}</div>
                              <div className="proj-stat-label text-xs text-gray-500 capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className={`flex-1 py-2.5 px-4 bg-gradient-to-r ${colorClasses.gradient} text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium flex items-center justify-center gap-2`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Project
                        </button>
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="proj-github-btn py-2.5 px-4 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className={`text-center mt-16 transform transition-all duration-1000 delay-300 ${isHeaderVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="proj-cta bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h3 className="proj-cta-title text-2xl font-semibold text-white mb-4">Have a Project in Mind?</h3>
              <p className="proj-cta-text text-gray-400 mb-6 max-w-2xl mx-auto">
                Let&apos;s work together to create something extraordinary that exceeds your expectations.
              </p>
              <button className="bg-gradient-to-r from-[#313E17] to-[#44561f] text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium">
                Start a Conversation
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          :global(html:not(.dark)) .proj-section { background: linear-gradient(135deg, #f6f8f1 0%, #eef2e5 50%, #f8faf4 100%) !important; }
          :global(html:not(.dark)) .proj-heading { color: #111827 !important; }
          :global(html:not(.dark)) .proj-subtext { color: #4b5563 !important; }
          :global(html:not(.dark)) .proj-filter-inactive { background: rgba(255,255,255,0.7) !important; border-color: #e5e7eb !important; color: #374151 !important; }
          :global(html:not(.dark)) .proj-filter-inactive:hover { color: #111827 !important; background: rgba(255,255,255,0.95) !important; }
          :global(html:not(.dark)) .proj-card { background: rgba(255,255,255,0.85) !important; border-color: #e5e7eb !important; box-shadow: 0 4px 20px rgba(0,0,0,0.06) !important; }
          :global(html:not(.dark)) .proj-card-title { color: #111827 !important; }
          :global(html:not(.dark)) .proj-card-desc { color: #4b5563 !important; }
          :global(html:not(.dark)) .proj-tech-tag { background: rgba(243,244,246,0.8) !important; color: #374151 !important; border-color: #d1d5db !important; }
          :global(html:not(.dark)) .proj-stats-divider { border-color: #e5e7eb !important; }
          :global(html:not(.dark)) .proj-stat-label { color: #9ca3af !important; }
          :global(html:not(.dark)) .proj-github-btn { border-color: #d1d5db !important; color: #6b7280 !important; }
          :global(html:not(.dark)) .proj-github-btn:hover { color: #111827 !important; border-color: #9ca3af !important; }
          :global(html:not(.dark)) .proj-cta { background: rgba(255,255,255,0.7) !important; border-color: #e5e7eb !important; }
          :global(html:not(.dark)) .proj-cta-title { color: #111827 !important; }
          :global(html:not(.dark)) .proj-cta-text { color: #4b5563 !important; }
        `}</style>
      </section>

      {/* ── Modal ─────────────────────────────────────────────────────────────── */}
      {selectedProject && (() => {
        const images = selectedProject.images || [];
        return (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
            <div className="min-h-screen px-4 py-8 flex items-center justify-center">
              <div className="proj-modal bg-gray-900 rounded-2xl max-w-5xl w-full border border-gray-700/50 shadow-2xl relative">

                {/* Close */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-50 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-all duration-300"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* ── Modal image hero ── */}
                <div className="relative rounded-t-2xl overflow-hidden bg-gray-800">

                  {/* 2-image dual layout */}
                  {images.length === 2 ? (
                    <div className="relative bg-gray-900" style={{ height: "380px" }}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} opacity-10`} />

                      {/* Layout */}
                      <div className="absolute inset-0 flex items-end px-6 pb-0 gap-3">

                        {/* Desktop */}
                        <div className="flex-1 flex items-end min-w-0">
                          <div className="relative w-full rounded-t-xl overflow-hidden shadow-2xl border border-white/10 bg-gray-800" style={{ height: "310px" }}>
                            <div className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-700/80 border-b border-white/5 flex-shrink-0">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                              <div className="flex-1 mx-2 h-4 rounded bg-gray-600/60 flex items-center px-2 gap-1.5">
                                <Monitor className="w-2.5 h-2.5 text-gray-400 flex-shrink-0" />
                                <div className="h-2 w-24 bg-gray-500/50 rounded" />
                              </div>
                            </div>
                            <div className="relative overflow-hidden" style={{ height: "calc(310px - 36px)" }}>
                              <img src={images[0]} alt={`${selectedProject.title} desktop`}
                                className="w-full h-full object-cover object-top" />
                            </div>
                          </div>
                        </div>

                        {/* Mobile */}
                        <div className="flex-shrink-0 flex items-end" style={{ width: "120px" }}>
                          <div className="relative w-full rounded-t-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-gray-900" style={{ height: "350px" }}>
                            <div className="absolute top-0 left-0 right-0 h-6 bg-gray-900 z-10 flex items-center justify-center flex-shrink-0">
                              <div className="w-12 h-2 rounded-full bg-gray-700" />
                            </div>
                            <div className="absolute left-0 right-0 bottom-0 overflow-hidden" style={{ top: "24px" }}>
                              <img src={images[1]} alt={`${selectedProject.title} mobile`}
                                className="w-full h-full object-cover object-top" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 right-0 px-8 pb-6 bg-gradient-to-t from-gray-900/95 via-gray-900/50 to-transparent pt-20 pointer-events-none">
                        <div className={`inline-block px-4 py-1 rounded-full ${colorClasses.bg} backdrop-blur-sm border ${colorClasses.border} mb-3`}>
                          <span className={`text-sm font-medium ${colorClasses.text}`}>
                            {categories.find(c => c.id === selectedProject.category)?.name || selectedProject.category}
                          </span>
                        </div>
                        <h2 className="text-4xl font-bold text-white drop-shadow-lg">{selectedProject.title}</h2>
                        {selectedProject.client && <p className="text-gray-300 mt-1">{selectedProject.client}</p>}
                      </div>
                    </div>

                  ) : (
                    /* Slider for 1 or 3+ images */
                    <div className="relative h-96 group/modal">
                      {images.length > 0 ? (
                        <>
                          {images.map((image, imgIndex) => (
                            <div
                              key={imgIndex}
                              className={`absolute inset-0 transition-opacity duration-500 ${modalSlide === imgIndex ? 'opacity-100' : 'opacity-0'}`}
                            >
                              <img src={image} alt={`${selectedProject.title} ${imgIndex + 1}`} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
                            </div>
                          ))}

                          {images.length > 1 && (
                            <>
                              <button onClick={() => prevModalSlide(images.length)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-900 text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover/modal:opacity-100 z-20 shadow-lg border border-white/10">
                                <ChevronLeft className="w-6 h-6" />
                              </button>
                              <button onClick={() => nextModalSlide(images.length)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-900 text-white p-3 rounded-full transition-all duration-200 opacity-0 group-hover/modal:opacity-100 z-20 shadow-lg border border-white/10">
                                <ChevronRight className="w-6 h-6" />
                              </button>
                              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                {images.map((_, imgIndex) => (
                                  <button key={imgIndex} onClick={() => setModalSlide(imgIndex)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                      modalSlide === imgIndex ? `w-8 bg-gradient-to-r ${colorClasses.gradient}` : 'w-1.5 bg-gray-400/60 hover:bg-gray-300/80'
                                    }`}
                                  />
                                ))}
                              </div>
                              <div className="absolute top-4 right-14 bg-gray-900/70 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full z-20 border border-white/10">
                                {modalSlide + 1} / {images.length}
                              </div>
                            </>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                          <span className="text-gray-600">No images</span>
                        </div>
                      )}

                      <div className="absolute bottom-8 left-8 right-8 z-10">
                        <div className={`inline-block px-4 py-1 rounded-full ${colorClasses.bg} backdrop-blur-sm border ${colorClasses.border} mb-4`}>
                          <span className={`text-sm font-medium ${colorClasses.text}`}>
                            {categories.find(c => c.id === selectedProject.category)?.name || selectedProject.category}
                          </span>
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-2">{selectedProject.title}</h2>
                        {selectedProject.client && <p className="text-gray-300">{selectedProject.client}</p>}
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal body */}
                <div className="p-8">
                  {/* Meta row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { icon: <Calendar className={`w-5 h-5 ${colorClasses.text}`} />, label: "Duration", value: selectedProject.duration },
                      { icon: <Users   className={`w-5 h-5 ${colorClasses.text}`} />, label: "Team Size", value: selectedProject.team     },
                      { icon: <Award   className={`w-5 h-5 ${colorClasses.text}`} />, label: "Client",    value: selectedProject.client    },
                      { icon: <Target  className={`w-5 h-5 ${colorClasses.text}`} />, label: "Status",    value: "Completed", valueClass: "text-emerald-400" },
                    ].map((info, i) => (
                      <div key={i} className="proj-modal-info flex items-center gap-3 bg-gray-800/50 rounded-lg p-4">
                        {info.icon}
                        <div>
                          <div className="proj-modal-info-label text-xs text-gray-500">{info.label}</div>
                          <div className={`font-medium text-sm ${info.valueClass || 'text-white'}`}>{info.value || '—'}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedProject.full_description && (
                    <div className="mb-8">
                      <h3 className="proj-modal-section-title text-2xl font-semibold text-white mb-4">Project Overview</h3>
                      <p className="proj-modal-body text-gray-300 leading-relaxed text-lg">{selectedProject.full_description}</p>
                    </div>
                  )}

                  {selectedProject.technologies?.length > 0 && (
                    <div className="mb-8">
                      <h3 className="proj-modal-section-title text-xl font-semibold text-white mb-4">Technologies Used</h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.technologies.map((tech, i) => (
                          <span key={i} className={`px-4 py-2 bg-gradient-to-r ${colorClasses.gradient} text-white rounded-lg font-medium`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {[
                    { title: "Challenges", items: selectedProject.challenges, type: "dot"   },
                    { title: "Solutions",  items: selectedProject.solutions,  type: "check" },
                  ].filter(s => s.items?.length > 0).map(section => (
                    <div key={section.title} className="mb-8">
                      <h3 className="proj-modal-section-title text-xl font-semibold text-white mb-4">{section.title}</h3>
                      <div className="space-y-3">
                        {section.items.map((item, i) => (
                          <div key={i} className="proj-modal-list-item flex items-start gap-3 bg-gray-800/30 rounded-lg p-4">
                            {section.type === "check" ? (
                              <svg className={`w-5 h-5 ${colorClasses.text} mt-0.5 flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            ) : (
                              <div className="w-2 h-2 rounded-full border border-[#44561f] mt-2 flex-shrink-0" style={{ background: 'rgba(68,86,31,0.3)' }} />
                            )}
                            <p className="proj-modal-body text-gray-300">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {selectedProject.results?.length > 0 && (
                    <div className="mb-8">
                      <h3 className="proj-modal-section-title text-xl font-semibold text-white mb-4">Results &amp; Impact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {selectedProject.results.map((result, i) => (
                          <div key={i} className={`bg-gradient-to-br ${colorClasses.gradient} p-6 rounded-xl text-white`}>
                            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
                              <Award className="w-6 h-6" />
                            </div>
                            <p className="font-medium">{result}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-700/50 proj-modal-footer">
                    {selectedProject.live_url && (
                      <a href={selectedProject.live_url} target="_blank" rel="noopener noreferrer"
                        className={`flex-1 min-w-[200px] py-3 px-6 bg-gradient-to-r ${colorClasses.gradient} text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium flex items-center justify-center gap-2`}>
                        <ExternalLink className="w-5 h-5" /> Visit Live Site
                      </a>
                    )}
                    {selectedProject.github_url && (
                      <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer"
                        className="proj-modal-github flex-1 min-w-[200px] py-3 px-6 border-2 border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300 font-medium flex items-center justify-center gap-2">
                        <Github className="w-5 h-5" /> View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <style jsx>{`
              :global(html:not(.dark)) .proj-modal { background: #ffffff !important; border-color: #e5e7eb !important; }
              :global(html:not(.dark)) .proj-modal-info { background: rgba(243,244,246,0.8) !important; }
              :global(html:not(.dark)) .proj-modal-info-label { color: #9ca3af !important; }
              :global(html:not(.dark)) .proj-modal-section-title { color: #111827 !important; }
              :global(html:not(.dark)) .proj-modal-body { color: #374151 !important; }
              :global(html:not(.dark)) .proj-modal-list-item { background: rgba(243,244,246,0.6) !important; }
              :global(html:not(.dark)) .proj-modal-footer { border-color: #e5e7eb !important; }
              :global(html:not(.dark)) .proj-modal-github { border-color: #d1d5db !important; color: #374151 !important; }
              :global(html:not(.dark)) .proj-modal-github:hover { border-color: #9ca3af !important; color: #111827 !important; }
            `}</style>
          </div>
        );
      })()}
    </>
  );
};

export default ProjectsWorks;