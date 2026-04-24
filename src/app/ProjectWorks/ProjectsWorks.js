"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const ProjectsWorks = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(new Set());
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const headerRef = useRef(null);
  const projectRefs = useRef([]);

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "fullstack", name: "Full Stack" },
    { id: "marketing", name: "Digital Marketing" },
    { id: "devops", name: "DevOps" },
  ];

  const colorClasses = {
    gradient: "from-[#313E17] to-[#44561f]",
    hover: "hover:shadow-[#313E17]/25",
    border: "border-[#313E17]/50",
    bg: "bg-[#313E17]/10",
    text: "text-[#a8c5a0]",
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setProjects(data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const opts = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const headerObs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsHeaderVisible(true);
    }, opts);

    const projObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.projectId;
          setVisibleProjects((prev) => new Set([...prev, id]));
        }
      });
    }, opts);

    if (headerRef.current) headerObs.observe(headerRef.current);

    projectRefs.current.forEach((ref) => {
      if (ref) projObs.observe(ref);
    });

    return () => {
      headerObs.disconnect();
      projObs.disconnect();
    };
  }, [projects]);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const CardImageSection = ({ project }) => {
    const images = project.images || [];
    const [slide, setSlide] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);

    const goTo = (idx) =>
      setSlide(Math.max(0, Math.min(idx, images.length - 1)));

    const prev = (e) => {
      e.preventDefault();
      e.stopPropagation();
      goTo(slide - 1);
    };

    const next = (e) => {
      e.preventDefault();
      e.stopPropagation();
      goTo(slide + 1);
    };

    const onPointerDown = (e) => {
      setDragging(true);
      setDragStartX(e.clientX);
    };

    const onPointerUp = (e) => {
      if (!dragging) return;

      setDragging(false);

      const delta = dragStartX - e.clientX;

      if (delta > 40) goTo(slide + 1);
      if (delta < -40) goTo(slide - 1);
    };

    const catLabel =
      categories.find((c) => c.id === project.category)?.name ||
      project.category;

    if (!images.length) {
      return (
        <div className="relative h-56 bg-gray-800/60 flex flex-col items-center justify-center gap-2">
          <span className="text-xs text-gray-600">No images</span>

          <div
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${colorClasses.bg} border ${colorClasses.border}`}
          >
            <span className={`text-xs font-medium ${colorClasses.text}`}>
              {catLabel}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="relative overflow-hidden select-none h-60">
        <div
          className="absolute inset-0 flex transition-transform duration-500 ease-[cubic-bezier(.25,.46,.45,.94)]"
          style={{ transform: `translateX(-${slide * 100}%)` }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {images.map((src, index) => (
            <div key={index} className="relative flex-shrink-0 w-full h-full">
              <img
                src={src}
                alt={`${project.title} ${index + 1}`}
                className="w-full h-full object-cover object-top pointer-events-none"
                draggable={false}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              disabled={slide === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-gray-900/70 text-white flex items-center justify-center border border-white/10 opacity-0 group-hover/card:opacity-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={next}
              disabled={slide === images.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-gray-900/70 text-white flex items-center justify-center border border-white/10 opacity-0 group-hover/card:opacity-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    goTo(index);
                  }}
                  className={`rounded-full transition-all ${
                    index === slide
                      ? `w-5 h-1.5 bg-gradient-to-r ${colorClasses.gradient}`
                      : "w-1.5 h-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>

            <div className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded-full bg-gray-900/70 border border-white/10 text-white text-[10px] font-semibold">
              {slide + 1}/{images.length}
            </div>
          </>
        )}

        <div
          className={`absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full ${colorClasses.bg} backdrop-blur-sm border ${colorClasses.border}`}
        >
          <span className={`text-xs font-medium ${colorClasses.text}`}>
            {catLabel}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="projects"
      className="proj-section min-h-screen bg-gray-900 flex flex-col items-center py-16 px-4 md:ml-64 snap-start relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#313E17]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-[#313E17]/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl w-full relative z-10">
        <div
          ref={headerRef}
          className={`text-center mb-12 transform transition-all duration-1000 ease-out ${
            isHeaderVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="proj-heading text-5xl font-light text-white mb-4 font-sans tracking-tight relative">
            Featured Works
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-[#313E17] to-[#44561f] rounded-full" />
          </h1>

          <p className="proj-subtext text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mt-4">
            Explore my portfolio of successful projects across mobile
            development, web applications, marketing campaigns, and cloud
            infrastructure.
          </p>
        </div>

        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transform transition-all duration-1000 delay-200 ${
            isHeaderVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`proj-filter-btn px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-[#313E17] to-[#44561f] text-white shadow-lg"
                  : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 border border-gray-700 proj-filter-inactive"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-[#44561f] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">No projects found.</p>
          </div>
        )}

        {!loading && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => (projectRefs.current[index] = el)}
                data-project-id={project.id}
                className={`group/card transform transition-all duration-1000 ease-out ${
                  visibleProjects.has(project.id)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`proj-card bg-gray-800/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-[#44561f]/40 hover:shadow-2xl ${colorClasses.hover} transition-all duration-500 transform hover:-translate-y-1`}
                >
                  <CardImageSection project={project} />

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="proj-card-title text-xl font-bold text-white leading-snug group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-[#a8c5a0] group-hover/card:to-[#44561f] transition-all duration-300">
                        {project.title}
                      </h3>

                      {project.images?.length > 1 && (
                        <span className="flex-shrink-0 mt-1 px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-400 text-[10px] font-medium border border-gray-600/30">
                          {project.images.length} photos
                        </span>
                      )}
                    </div>

                    <p className="proj-card-desc text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {project.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="proj-tech-tag px-2.5 py-0.5 bg-gray-700/40 text-gray-300 text-xs rounded-md border border-gray-600/30"
                          >
                            {tech}
                          </span>
                        ))}

                        {project.technologies.length > 4 && (
                          <span className="px-2.5 py-0.5 text-gray-500 text-xs">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 mt-1">
                      <Link
                        href={`/projects/${project.id}`}
                        className={`flex-1 py-2 px-4 bg-gradient-to-r ${colorClasses.gradient} text-white rounded-xl hover:shadow-lg hover:shadow-[#313E17]/20 transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-1.5`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        View Project
                      </Link>

                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="proj-github-btn py-2 px-3.5 border border-gray-600 text-gray-400 rounded-xl hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className={`text-center mt-16 transform transition-all duration-1000 delay-300 ${
            isHeaderVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="proj-cta bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h3 className="proj-cta-title text-2xl font-semibold text-white mb-4">
              Have a Project in Mind?
            </h3>

            <p className="proj-cta-text text-gray-400 mb-6 max-w-2xl mx-auto">
              Let&apos;s work together to create something extraordinary that
              exceeds your expectations.
            </p>

            <button className="bg-gradient-to-r from-[#313E17] to-[#44561f] text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium">
              Start a Conversation
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(html:not(.dark)) .proj-section {
          background: linear-gradient(
            135deg,
            #f6f8f1 0%,
            #eef2e5 50%,
            #f8faf4 100%
          ) !important;
        }

        :global(html:not(.dark)) .proj-heading {
          color: #111827 !important;
        }

        :global(html:not(.dark)) .proj-subtext {
          color: #4b5563 !important;
        }

        :global(html:not(.dark)) .proj-filter-inactive {
          background: rgba(255, 255, 255, 0.7) !important;
          border-color: #e5e7eb !important;
          color: #374151 !important;
        }

        :global(html:not(.dark)) .proj-card {
          background: rgba(255, 255, 255, 0.85) !important;
          border-color: #e5e7eb !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06) !important;
        }

        :global(html:not(.dark)) .proj-card-title {
          color: #111827 !important;
        }

        :global(html:not(.dark)) .proj-card-desc {
          color: #4b5563 !important;
        }

        :global(html:not(.dark)) .proj-tech-tag {
          background: rgba(243, 244, 246, 0.8) !important;
          color: #374151 !important;
          border-color: #d1d5db !important;
        }

        :global(html:not(.dark)) .proj-github-btn {
          border-color: #d1d5db !important;
          color: #6b7280 !important;
        }

        :global(html:not(.dark)) .proj-cta {
          background: rgba(255, 255, 255, 0.7) !important;
          border-color: #e5e7eb !important;
        }

        :global(html:not(.dark)) .proj-cta-title {
          color: #111827 !important;
        }

        :global(html:not(.dark)) .proj-cta-text {
          color: #4b5563 !important;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ProjectsWorks;