"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Github,
  Monitor,
  Smartphone,
  Users,
  Award,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setProject(data);

      setLoading(false);
    };

    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#44561f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-4">
        <p>Project not found.</p>

        <button
          onClick={() => router.push("/")}
          className="px-5 py-2 rounded-xl bg-[#313E17] text-[#a8c5a0]"
        >
          Go Home
        </button>
      </div>
    );
  }

  const imageMeta =
    project.image_meta?.length
      ? project.image_meta
      : (project.images || []).map((url) => ({
          url,
          type: "website",
        }));

  const desktopImages = imageMeta.filter(
    (img) => img.type === "website_desktop"
  );

  const mobileImages = imageMeta.filter((img) => img.type === "mobile_app");

  const websiteImages = imageMeta.filter((img) => img.type === "website");

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <section className="mb-12">
          <p className="text-[#a8c5a0] text-sm font-semibold uppercase tracking-wider mb-2">
            {project.category}
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {project.title}
          </h1>

          <p className="text-gray-400 max-w-3xl leading-relaxed">
            {project.full_description || project.description}
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#313E17] to-[#44561f] text-white font-semibold"
              >
                <ExternalLink className="w-4 h-4" />
                Live Preview
              </a>
            )}

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-700 text-gray-300 hover:text-white"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <InfoCard
            icon={<Calendar className="w-5 h-5 text-[#a8c5a0]" />}
            label="Duration"
            value={project.duration}
          />

          <InfoCard
            icon={<Users className="w-5 h-5 text-[#a8c5a0]" />}
            label="Team"
            value={project.team}
          />

          <InfoCard
            icon={<Award className="w-5 h-5 text-[#a8c5a0]" />}
            label="Client"
            value={project.client}
          />

          <InfoCard
            icon={<ExternalLink className="w-5 h-5 text-[#a8c5a0]" />}
            label="Status"
            value="Completed"
          />
        </section>

        <ImageGroup
          title="Website Desktop View"
          images={desktopImages}
          type="desktop"
        />

        <ImageGroup
          title="Mobile App Screens"
          images={mobileImages}
          type="mobile"
        />

        <ImageGroup
          title="Website Screens"
          images={websiteImages}
          type="website"
        />

        {project.technologies?.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold mb-4">Technologies</h2>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        <ProjectListSection title="Challenges" items={project.challenges} />
        <ProjectListSection title="Solutions" items={project.solutions} />
        <ProjectListSection title="Results" items={project.results} />
      </div>
    </main>
  );
}

function ImageGroup({ title, images, type }) {
  if (!images.length) return null;

  const isMobile = type === "mobile";
  const isDesktop = type === "desktop";

  return (
    <section className="mt-14">
      <div className="flex items-center gap-2 mb-5">
        {isMobile && <Smartphone className="w-5 h-5 text-[#a8c5a0]" />}
        {isDesktop && <Monitor className="w-5 h-5 text-[#a8c5a0]" />}
        {!isMobile && !isDesktop && (
          <ExternalLink className="w-5 h-5 text-[#a8c5a0]" />
        )}

        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div
        className={
          isMobile
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
            : "grid grid-cols-1 md:grid-cols-2 gap-6"
        }
      >
        {images.map((img, index) => (
          <div
            key={`${img.url}-${index}`}
            className={
              isMobile
                ? "rounded-[2rem] overflow-hidden border-4 border-gray-800 bg-gray-900 shadow-2xl"
                : "rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 shadow-2xl"
            }
          >
            {isDesktop && (
              <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 border-b border-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <div className="ml-2 flex-1 h-4 rounded bg-gray-700" />
              </div>
            )}

            {isMobile && (
              <div className="h-7 bg-gray-900 flex items-center justify-center">
                <div className="w-14 h-2 rounded-full bg-gray-700" />
              </div>
            )}

            <img
              src={img.url}
              alt={`${title} ${index + 1}`}
              className="w-full object-cover object-top"
            />

            {isMobile && (
              <div className="h-5 bg-gray-900 flex items-center justify-center">
                <div className="w-10 h-1 rounded-full bg-gray-700" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-gray-900 border border-gray-800 p-5">
      <div className="mb-3">{icon}</div>

      <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
        {label}
      </p>

      <p className="text-white font-semibold">{value || "—"}</p>
    </div>
  );
}

function ProjectListSection({ title, items }) {
  if (!items?.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="rounded-xl bg-gray-900 border border-gray-800 px-4 py-3 text-gray-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}