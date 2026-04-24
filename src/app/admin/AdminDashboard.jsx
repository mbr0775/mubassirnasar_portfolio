"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, ADMIN_EMAIL } from "@/lib/supabase";

const BUCKET = "project-images";

const CATEGORIES = [
  { id: "mobile", name: "Mobile Apps" },
  { id: "fullstack", name: "Full Stack" },
  { id: "marketing", name: "Digital Marketing" },
  { id: "devops", name: "DevOps" },
];

const IMAGE_TYPES = [
  { id: "mobile_app", name: "Mobile App" },
  { id: "website_desktop", name: "Website Desktop View" },
  { id: "website", name: "Website" },
];

const EMPTY_FORM = {
  title: "",
  category: "mobile",
  description: "",
  full_description: "",
  technologies: "",
  stat_key1: "",
  stat_val1: "",
  stat_key2: "",
  stat_val2: "",
  stat_key3: "",
  stat_val3: "",
  duration: "",
  team: "",
  client: "",
  challenges: "",
  solutions: "",
  results: "",
  github_url: "",
  live_url: "",
};

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const toArr = (str) =>
  str
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

const fromArr = (arr) => {
  if (!arr) return "";
  return Array.isArray(arr) ? arr.join("\n") : arr;
};

const statsToForm = (stats) => {
  if (!stats) return {};

  const e = Object.entries(stats);

  return {
    stat_key1: e[0]?.[0] || "",
    stat_val1: e[0]?.[1] || "",
    stat_key2: e[1]?.[0] || "",
    stat_val2: e[1]?.[1] || "",
    stat_key3: e[2]?.[0] || "",
    stat_val3: e[2]?.[1] || "",
  };
};

function ImageTypeBadge({ type }) {
  const label =
    IMAGE_TYPES.find((item) => item.id === type)?.name || "Website";

  return (
    <span className="px-2 py-0.5 rounded-full bg-[#313E17]/40 text-[#a8c5a0] text-[10px] font-bold border border-[#44561f]/40">
      {label}
    </span>
  );
}

function ImageUploader({ images, onChange }) {
  const inputRef = useRef(null);
  const [selectedType, setSelectedType] = useState("website_desktop");
  const [dragOver, setDragOver] = useState(false);

  const upload = useCallback(
    async (files) => {
      const validFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (!validFiles.length) return;

      const localEntries = validFiles.map((file) => ({
        id: uid(),
        url: URL.createObjectURL(file),
        file,
        status: "uploading",
        name: file.name,
        imageType: selectedType,
      }));

      onChange((prev) => [...prev, ...localEntries]);

      for (const entry of localEntries) {
        try {
          const ext = entry.name.split(".").pop();
          const path = `${uid()}.${ext}`;

          const { data, error } = await supabase.storage
            .from(BUCKET)
            .upload(path, entry.file, {
              cacheControl: "3600",
              upsert: false,
            });

          if (error) throw error;

          const {
            data: { publicUrl },
          } = supabase.storage.from(BUCKET).getPublicUrl(data.path);

          onChange((prev) =>
            prev.map((img) =>
              img.id === entry.id
                ? {
                    ...img,
                    url: publicUrl,
                    status: "done",
                    storagePath: data.path,
                    imageType: entry.imageType,
                  }
                : img
            )
          );
        } catch (err) {
          onChange((prev) =>
            prev.map((img) =>
              img.id === entry.id
                ? {
                    ...img,
                    status: "error",
                    errorMsg: err.message,
                  }
                : img
            )
          );
        }
      }
    },
    [onChange, selectedType]
  );

  const removeImage = async (img) => {
    if (img.storagePath) {
      await supabase.storage.from(BUCKET).remove([img.storagePath]);
    }

    if (img.url?.startsWith("blob:")) {
      URL.revokeObjectURL(img.url);
    }

    onChange((prev) => prev.filter((item) => item.id !== img.id));
  };

  const moveImage = (from, to) => {
    onChange((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Select image type before upload
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {IMAGE_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setSelectedType(type.id)}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                selectedType === type.id
                  ? "bg-[#313E17] border-[#44561f] text-[#a8c5a0]"
                  : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, index) => (
            <div
              key={img.id}
              className="relative rounded-xl overflow-hidden border border-gray-700 bg-gray-800"
            >
              <img
                src={img.url}
                alt=""
                className="w-full h-36 object-cover object-top"
              />

              <div className="absolute top-2 left-2">
                <ImageTypeBadge type={img.imageType} />
              </div>

              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-[#a8c5a0] text-[10px] font-bold">
                  COVER
                </div>
              )}

              {img.status === "uploading" && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-semibold">
                  Uploading...
                </div>
              )}

              {img.status === "error" && (
                <div className="absolute inset-0 bg-red-950/80 flex items-center justify-center text-red-300 text-xs font-semibold text-center px-2">
                  {img.errorMsg || "Upload failed"}
                </div>
              )}

              <div className="absolute bottom-2 right-2 flex gap-1">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, index - 1)}
                    className="w-7 h-7 rounded-full bg-gray-900/80 text-white text-xs"
                  >
                    ↑
                  </button>
                )}

                {index < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, index + 1)}
                    className="w-7 h-7 rounded-full bg-gray-900/80 text-white text-xs"
                  >
                    ↓
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => removeImage(img)}
                  className="w-7 h-7 rounded-full bg-red-600 text-white text-xs"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          upload(e.dataTransfer.files);
        }}
        className={`cursor-pointer rounded-2xl border-2 border-dashed px-4 py-8 text-center transition-all ${
          dragOver
            ? "border-[#44561f] bg-[#313E17]/20"
            : "border-gray-700 bg-gray-800/40 hover:border-[#44561f]/70"
        }`}
      >
        <p className="text-sm font-semibold text-white">
          Click or drag images to upload
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Current selected type:{" "}
          <span className="text-[#a8c5a0]">
            {IMAGE_TYPES.find((item) => item.id === selectedType)?.name}
          </span>
        </p>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => upload(e.target.files)}
        />
      </div>
    </div>
  );
}

function TagInput({ label, value, onChange, placeholder, hint }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 outline-none focus:border-[#44561f] resize-none"
      />

      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list");
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageEntries, setImageEntries] = useState([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCat, setFilterCat] = useState("all");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session || session.user.email !== ADMIN_EMAIL) {
        router.replace("/login");
      } else {
        setUser(session.user);
        setAuthLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session || session.user.email !== ADMIN_EMAIL) {
        router.replace("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setProjects(data || []);

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!authLoading) fetchProjects();
  }, [authLoading, fetchProjects]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const openAdd = () => {
    setEditingProject(null);
    setForm(EMPTY_FORM);
    setImageEntries([]);
    setView("add");
  };

  const openEdit = (project) => {
    setEditingProject(project);

    setForm({
      title: project.title || "",
      category: project.category || "mobile",
      description: project.description || "",
      full_description: project.full_description || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : "",
      challenges: fromArr(project.challenges),
      solutions: fromArr(project.solutions),
      results: fromArr(project.results),
      duration: project.duration || "",
      team: project.team || "",
      client: project.client || "",
      github_url: project.github_url || "",
      live_url: project.live_url || "",
      ...statsToForm(project.stats),
    });

    const existingEntries = (
      project.image_meta?.length
        ? project.image_meta
        : (project.images || []).map((url) => ({
            url,
            type: "website",
          }))
    ).map((item) => ({
      id: uid(),
      url: item.url,
      status: "existing",
      imageType: item.type || "website",
      storagePath: item.url?.includes(`/${BUCKET}/`)
        ? item.url.split(`/${BUCKET}/`)[1]?.split("?")[0]
        : null,
    }));

    setImageEntries(existingEntries);
    setView("edit");
  };

  const buildPayload = () => {
    const stats = {};

    if (form.stat_key1 && form.stat_val1) stats[form.stat_key1] = form.stat_val1;
    if (form.stat_key2 && form.stat_val2) stats[form.stat_key2] = form.stat_val2;
    if (form.stat_key3 && form.stat_val3) stats[form.stat_key3] = form.stat_val3;

    const finalImages = imageEntries.filter(
      (img) => img.status === "done" || img.status === "existing"
    );

    const images = finalImages.map((img) => img.url);

    const image_meta = finalImages.map((img) => ({
      url: img.url,
      type: img.imageType || "website",
    }));

    return {
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      full_description: form.full_description.trim(),
      technologies: toArr(form.technologies),
      images,
      image_meta,
      stats,
      duration: form.duration.trim(),
      team: form.team.trim(),
      client: form.client.trim(),
      challenges: toArr(form.challenges),
      solutions: toArr(form.solutions),
      results: toArr(form.results),
      github_url: form.github_url.trim(),
      live_url: form.live_url.trim(),
    };
  };

  const handleSave = async () => {
    if (!form.title || !form.description) {
      showToast("Title and description are required.", "error");
      return;
    }

    if (imageEntries.some((img) => img.status === "uploading")) {
      showToast("Please wait. Images are still uploading.", "error");
      return;
    }

    setSaving(true);

    const payload = buildPayload();
    let error;

    if (view === "edit" && editingProject) {
      ({ error } = await supabase
        .from("projects")
        .update(payload)
        .eq("id", editingProject.id));
    } else {
      ({ error } = await supabase.from("projects").insert([payload]));
    }

    setSaving(false);

    if (error) {
      showToast(error.message, "error");
      return;
    }

    showToast(view === "edit" ? "Project updated!" : "Project added!");
    setView("list");
    fetchProjects();
  };

  const handleDelete = async (id) => {
    const project = projects.find((p) => p.id === id);

    if (project?.images?.length) {
      const paths = project.images
        .filter((url) => url.includes(`/${BUCKET}/`))
        .map((url) => url.split(`/${BUCKET}/`)[1]?.split("?")[0])
        .filter(Boolean);

      if (paths.length) {
        await supabase.storage.from(BUCKET).remove(paths);
      }
    }

    const { error } = await supabase.from("projects").delete().eq("id", id);

    setDeleteConfirm(null);

    if (error) {
      showToast(error.message, "error");
      return;
    }

    showToast("Project deleted.");
    fetchProjects();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const displayed = projects.filter((project) => {
    const matchesCat = filterCat === "all" || project.category === filterCat;

    const matchesSearch =
      !searchTerm ||
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCat && matchesSearch;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#44561f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-950 text-white"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl ${
            toast.type === "error" ? "bg-red-600" : "bg-[#44561f]"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-sm w-full border border-gray-700">
            <h3 className="text-lg font-bold mb-2">Delete Project?</h3>
            <p className="text-gray-400 text-sm mb-6">
              This will permanently delete the project and its uploaded images.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-600 text-gray-300 text-sm font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="border-b border-gray-800 bg-gray-900/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Admin Dashboard</h1>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          <div className="flex items-center gap-3">
            {view !== "list" && (
              <button
                onClick={() => setView("list")}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white"
              >
                Back
              </button>
            )}

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm text-gray-400 hover:text-white"
            >
              View Site
            </a>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {view === "list" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total Projects" value={projects.length} />
              <StatCard
                label="Mobile Apps"
                value={projects.filter((p) => p.category === "mobile").length}
              />
              <StatCard
                label="Full Stack"
                value={
                  projects.filter((p) => p.category === "fullstack").length
                }
              />
              <StatCard
                label="Marketing"
                value={
                  projects.filter((p) => p.category === "marketing").length
                }
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-700 text-sm text-white outline-none focus:border-[#44561f]"
              />

              <div className="flex gap-2 flex-wrap">
                {["all", ...CATEGORIES.map((c) => c.id)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCat(cat)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium ${
                      filterCat === cat
                        ? "bg-gradient-to-r from-[#313E17] to-[#44561f] text-white"
                        : "bg-gray-900 border border-gray-700 text-gray-400"
                    }`}
                  >
                    {cat === "all"
                      ? "All"
                      : CATEGORIES.find((c) => c.id === cat)?.name}
                  </button>
                ))}
              </div>

              <button
                onClick={openAdd}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#313E17] to-[#44561f] text-white text-sm font-semibold"
              >
                Add Project
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-24">
                <div className="w-8 h-8 border-2 border-[#44561f] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : displayed.length === 0 ? (
              <div className="text-center py-24 border-2 border-dashed border-gray-800 rounded-2xl">
                <p className="text-gray-500">No projects found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {displayed.map((project) => (
                  <div
                    key={project.id}
                    className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden"
                  >
                    <div className="h-44 bg-gray-800">
                      {project.images?.[0] ? (
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-600 text-sm">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-2">
                        {project.title}
                      </h3>

                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies?.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-gray-800 text-gray-300 text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-gray-800">
                        <button
                          onClick={() => openEdit(project)}
                          className="flex-1 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => setDeleteConfirm(project.id)}
                          className="flex-1 py-2 rounded-xl bg-gray-800 hover:bg-red-900/40 text-red-400 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {(view === "add" || view === "edit") && (
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold">
                {view === "edit" ? "Edit Project" : "Add New Project"}
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                {view === "edit"
                  ? `Editing: ${editingProject?.title}`
                  : "Fill in the details for your new project."}
              </p>
            </div>

            <div className="space-y-6">
              <Panel title="Basic Information">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Project Title *"
                      value={form.title}
                      onChange={(value) =>
                        setForm({ ...form, title: value })
                      }
                      placeholder="E-Commerce App"
                    />

                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                        Category
                      </label>

                      <select
                        value={form.category}
                        onChange={(e) =>
                          setForm({ ...form, category: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white outline-none"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <TagInput
                    label="Short Description *"
                    value={form.description}
                    onChange={(value) =>
                      setForm({ ...form, description: value })
                    }
                    placeholder="A brief description shown on the project card..."
                  />

                  <TagInput
                    label="Full Description"
                    value={form.full_description}
                    onChange={(value) =>
                      setForm({ ...form, full_description: value })
                    }
                    placeholder="Detailed project description..."
                  />
                </div>
              </Panel>

              <Panel title="Project Images">
                <p className="text-xs text-gray-500 mb-5">
                  Select image type first, then upload. First image is the
                  cover.
                </p>

                <ImageUploader
                  images={imageEntries}
                  onChange={setImageEntries}
                />
              </Panel>

              <Panel title="Project Details">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Client"
                    value={form.client}
                    onChange={(value) =>
                      setForm({ ...form, client: value })
                    }
                    placeholder="Client Name"
                  />

                  <Input
                    label="Duration"
                    value={form.duration}
                    onChange={(value) =>
                      setForm({ ...form, duration: value })
                    }
                    placeholder="6 months"
                  />

                  <Input
                    label="Team Size"
                    value={form.team}
                    onChange={(value) => setForm({ ...form, team: value })}
                    placeholder="5 developers"
                  />
                </div>
              </Panel>

              <Panel title="Stats">
                <div className="space-y-3">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="grid grid-cols-2 gap-3">
                      <Input
                        label={`Stat ${n} Label`}
                        value={form[`stat_key${n}`]}
                        onChange={(value) =>
                          setForm({ ...form, [`stat_key${n}`]: value })
                        }
                        placeholder="users"
                      />

                      <Input
                        label={`Stat ${n} Value`}
                        value={form[`stat_val${n}`]}
                        onChange={(value) =>
                          setForm({ ...form, [`stat_val${n}`]: value })
                        }
                        placeholder="50K+"
                      />
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="Technologies">
                <TagInput
                  label="Technologies"
                  value={form.technologies}
                  onChange={(value) =>
                    setForm({ ...form, technologies: value })
                  }
                  placeholder="React, Next.js, Supabase"
                  hint="Separate by comma or new line."
                />
              </Panel>

              <Panel title="Challenges, Solutions, Results">
                <div className="space-y-4">
                  <TagInput
                    label="Challenges"
                    value={form.challenges}
                    onChange={(value) =>
                      setForm({ ...form, challenges: value })
                    }
                    placeholder="Challenge 1..."
                  />

                  <TagInput
                    label="Solutions"
                    value={form.solutions}
                    onChange={(value) =>
                      setForm({ ...form, solutions: value })
                    }
                    placeholder="Solution 1..."
                  />

                  <TagInput
                    label="Results"
                    value={form.results}
                    onChange={(value) =>
                      setForm({ ...form, results: value })
                    }
                    placeholder="Result 1..."
                  />
                </div>
              </Panel>

              <Panel title="Links">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="GitHub URL"
                    value={form.github_url}
                    onChange={(value) =>
                      setForm({ ...form, github_url: value })
                    }
                    placeholder="https://github.com/..."
                  />

                  <Input
                    label="Live URL"
                    value={form.live_url}
                    onChange={(value) =>
                      setForm({ ...form, live_url: value })
                    }
                    placeholder="https://..."
                  />
                </div>
              </Panel>

              <div className="flex gap-3">
                <button
                  onClick={() => setView("list")}
                  className="flex-1 py-3.5 rounded-xl border border-gray-700 text-gray-300 font-semibold text-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={
                    saving ||
                    imageEntries.some((img) => img.status === "uploading")
                  }
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#313E17] to-[#44561f] text-white font-semibold text-sm disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : imageEntries.some((img) => img.status === "uploading")
                    ? "Uploading images..."
                    : view === "edit"
                    ? "Update Project"
                    : "Add Project"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap");

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-3">
        {label}
      </p>
      <p className="text-3xl font-extrabold">{value}</p>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
      <h3 className="text-sm font-bold text-[#a8c5a0] uppercase tracking-wider mb-5">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 outline-none focus:border-[#44561f]"
      />
    </div>
  );
}