"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase, ADMIN_EMAIL } from "@/lib/supabase";

// ─── constants ────────────────────────────────────────────────────────────────
const BUCKET = "project-images";

const CATEGORIES = [
  { id: "mobile",    name: "Mobile Apps"      },
  { id: "fullstack", name: "Full Stack"        },
  { id: "marketing", name: "Digital Marketing" },
  { id: "devops",    name: "DevOps"            },
];

const EMPTY_FORM = {
  title: "", category: "mobile",
  description: "", full_description: "",
  technologies: "",
  stat_key1: "", stat_val1: "",
  stat_key2: "", stat_val2: "",
  stat_key3: "", stat_val3: "",
  duration: "", team: "", client: "",
  challenges: "", solutions: "", results: "",
  github_url: "", live_url: "",
};

// ─── helpers ──────────────────────────────────────────────────────────────────
const toArr   = (str) => str.split(/[,\n]/).map(s => s.trim()).filter(Boolean);
const fromArr = (arr) => (!arr ? "" : Array.isArray(arr) ? arr.join("\n") : arr);
const statsToForm = (stats) => {
  if (!stats) return {};
  const e = Object.entries(stats);
  return {
    stat_key1: e[0]?.[0] || "", stat_val1: e[0]?.[1] || "",
    stat_key2: e[1]?.[0] || "", stat_val2: e[1]?.[1] || "",
    stat_key3: e[2]?.[0] || "", stat_val3: e[2]?.[1] || "",
  };
};
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// ─── Intelligent image analyzer ───────────────────────────────────────────────
// Reads natural dimensions → portrait (ar < 0.75) = mobile, landscape (ar > 1.2) = desktop
function analyzeImage(file) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const ar = img.naturalWidth / img.naturalHeight;
      URL.revokeObjectURL(url);
      const type = ar < 0.75 ? "mobile" : ar > 1.2 ? "desktop" : "unknown";
      resolve({ type, aspectRatio: ar, width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ type: "unknown", aspectRatio: 1, width: 0, height: 0 });
    };
    img.src = url;
  });
}

// ─── SmartBadge ───────────────────────────────────────────────────────────────
function SmartBadge({ type }) {
  if (type === "mobile") return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-[10px] font-bold">
      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18" strokeLinecap="round" strokeWidth="3"/>
      </svg>
      MOBILE
    </span>
  );
  if (type === "desktop") return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-[10px] font-bold">
      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
      DESKTOP
    </span>
  );
  return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-500/20 border border-gray-400/40 text-gray-400 text-[10px] font-bold">
      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
      </svg>
      AUTO
    </span>
  );
}

// ─── ImageUploader ─────────────────────────────────────────────────────────────
function ImageUploader({ images, onChange }) {
  const inputRef  = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [dragIdx,  setDragIdx]  = useState(null);
  const [overIdx,  setOverIdx]  = useState(null);
  const [previewSlide, setPreviewSlide] = useState(0);

  const upload = useCallback(async (files) => {
    // Analyze all files first (aspect ratio detection)
    const analyzed = await Promise.all(
      Array.from(files).map(async (f) => {
        const info = await analyzeImage(f);
        return {
          id: uid(),
          url: URL.createObjectURL(f),
          file: f,
          status: "uploading",
          progress: 0,
          name: f.name,
          imageType: info.type,
          aspectRatio: info.aspectRatio,
          dimensions: { w: info.width, h: info.height },
        };
      })
    );

    onChange((prev) => {
      const next = [...prev, ...analyzed];
      // Auto-sort: desktop first, mobile second when exactly 2 images
      if (next.length === 2) {
        const desktop = next.find(i => i.imageType === "desktop");
        const mobile  = next.find(i => i.imageType === "mobile");
        if (desktop && mobile) return [desktop, mobile];
      }
      return next;
    });

    // Upload each to Supabase storage
    for (const entry of analyzed) {
      const ext  = entry.name.split(".").pop();
      const path = `${uid()}.${ext}`;
      try {
        const { data, error } = await supabase.storage
          .from(BUCKET)
          .upload(path, entry.file, { cacheControl: "3600", upsert: false });
        if (error) throw error;
        const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
        onChange(prev => prev.map(img =>
          img.id === entry.id
            ? { ...img, url: publicUrl, status: "done", progress: 100, storagePath: data.path }
            : img
        ));
      } catch (err) {
        onChange(prev => prev.map(img =>
          img.id === entry.id ? { ...img, status: "error", errorMsg: err.message } : img
        ));
      }
    }
  }, [onChange]);

  const handleFiles = (files) => {
    const valid = Array.from(files).filter(f => f.type.startsWith("image/"));
    if (valid.length) upload(valid);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = async (img) => {
    if (img.storagePath) await supabase.storage.from(BUCKET).remove([img.storagePath]);
    if (img.url?.startsWith("blob:")) URL.revokeObjectURL(img.url);
    onChange(prev => prev.filter(i => i.id !== img.id));
    setPreviewSlide(0);
  };

  const handleDragStart = (e, idx) => { setDragIdx(idx); e.dataTransfer.effectAllowed = "move"; };
  const handleDragEnter = (e, idx) => { e.preventDefault(); setOverIdx(idx); };
  const handleDragEnd   = () => {
    if (dragIdx !== null && overIdx !== null && dragIdx !== overIdx) {
      onChange(prev => {
        const arr = [...prev];
        const [moved] = arr.splice(dragIdx, 1);
        arr.splice(overIdx, 0, moved);
        return arr;
      });
    }
    setDragIdx(null);
    setOverIdx(null);
  };

  const visibleImages = images.filter(img =>
    img.status === "done" || img.status === "existing" || img.status === "uploading"
  );

  const currentImg    = visibleImages[previewSlide];
  const isMobileSized  = currentImg?.imageType === "mobile"  || (currentImg?.aspectRatio && currentImg.aspectRatio < 0.75);
  const isDesktopSized = currentImg?.imageType === "desktop" || (currentImg?.aspectRatio && currentImg.aspectRatio > 1.2);

  return (
    <div className="space-y-4">
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Project Images
        <span className="ml-2 text-gray-600 normal-case font-normal">
          · AI detects mobile vs desktop automatically
        </span>
      </label>

      {/* ── Intelligent preview showcase ── */}
      {visibleImages.length > 0 && (
        <div className="rounded-2xl overflow-hidden border border-gray-700 bg-gray-800/60">

          {/* Main preview */}
          <div className="relative group/preview bg-gray-900" style={{ minHeight: "280px" }}>

            {/* ── Mobile frame ── */}
            {isMobileSized && (
              <div className="flex items-center justify-center py-6">
                <div className="relative" style={{ width: "160px" }}>
                  <div
                    className="relative rounded-[28px] overflow-hidden shadow-2xl border-[3px] border-gray-600 bg-gray-900"
                    style={{ aspectRatio: "9/19.5" }}
                  >
                    {/* Notch */}
                    <div className="absolute top-0 left-0 right-0 h-6 bg-gray-900 z-10 flex items-center justify-center">
                      <div className="w-14 h-2.5 rounded-full bg-gray-700" />
                    </div>
                    {/* Screen */}
                    <div className="absolute inset-0 mt-6 overflow-hidden">
                      {currentImg?.status === "uploading" ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                          <svg className="w-6 h-6 text-[#a8c5a0] animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                          </svg>
                        </div>
                      ) : (
                        <img src={currentImg?.url} alt="Mobile preview" className="w-full h-full object-cover object-top" />
                      )}
                    </div>
                    {/* Home indicator */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-gray-500/60 z-10" />
                  </div>
                  {/* Reflection */}
                  <div className="absolute -bottom-4 left-4 right-4 h-8 rounded-full bg-black/20 blur-md" />
                </div>
              </div>
            )}

            {/* ── Desktop / browser frame ── */}
            {isDesktopSized && (
              <div className="p-4">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-gray-800">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-700/80 border-b border-white/5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                    <div className="flex-1 mx-2 h-4 rounded bg-gray-600/60 flex items-center px-2 gap-1.5">
                      <svg className="w-2.5 h-2.5 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <div className="h-1.5 w-20 bg-gray-500/50 rounded" />
                    </div>
                    <svg className="w-3 h-3 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </div>
                  {/* Screen */}
                  <div className="relative overflow-hidden" style={{ maxHeight: "220px" }}>
                    {currentImg?.status === "uploading" ? (
                      <div className="h-40 flex items-center justify-center bg-gray-800">
                        <svg className="w-6 h-6 text-[#a8c5a0] animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                        </svg>
                      </div>
                    ) : (
                      <img src={currentImg?.url} alt="Desktop preview" className="w-full object-cover object-top" style={{ maxHeight: "220px" }} />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Fallback: plain image ── */}
            {!isMobileSized && !isDesktopSized && (
              <div className="relative" style={{ height: "280px" }}>
                {currentImg?.status === "uploading" ? (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-800">
                    <svg className="w-8 h-8 text-[#a8c5a0] animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    <span className="text-sm text-white font-semibold">Uploading…</span>
                  </div>
                ) : (
                  <img src={currentImg?.url} alt="Preview" className="w-full h-full object-contain" style={{ background: "#111827" }} />
                )}
              </div>
            )}

            {/* Navigation arrows */}
            {visibleImages.length > 1 && (
              <>
                <button type="button"
                  onClick={() => setPreviewSlide(s => (s - 1 + visibleImages.length) % visibleImages.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-900/80 hover:bg-gray-800 text-white flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-all shadow-lg border border-white/10 z-20">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button type="button"
                  onClick={() => setPreviewSlide(s => (s + 1) % visibleImages.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-900/80 hover:bg-gray-800 text-white flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-all shadow-lg border border-white/10 z-20">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
                <div className="absolute top-2 right-2 bg-gray-900/70 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full border border-white/10 z-20">
                  {previewSlide + 1} / {visibleImages.length}
                </div>
              </>
            )}

            {/* Cover badge */}
            {previewSlide === 0 && (
              <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-[#313E17]/90 text-[#a8c5a0] text-xs font-bold z-20">
                COVER
              </div>
            )}

            {/* Delete button */}
            {currentImg?.status !== "uploading" && (
              <button type="button"
                onClick={() => removeImage(currentImg)}
                className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-all shadow-lg z-20">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>

          {/* ── Detected type info bar ── */}
          {currentImg && (
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/60 border-t border-gray-700/50">
              <SmartBadge type={currentImg.imageType || "unknown"} />
              {currentImg.dimensions && (
                <span className="text-xs text-gray-500">
                  {currentImg.dimensions.w} × {currentImg.dimensions.h}px
                  {currentImg.aspectRatio && ` · ${currentImg.aspectRatio.toFixed(2)} ratio`}
                </span>
              )}
              {currentImg.imageType === "mobile"  && <span className="text-xs text-blue-400/80 ml-auto">→ Will show in phone frame</span>}
              {currentImg.imageType === "desktop" && <span className="text-xs text-purple-400/80 ml-auto">→ Will show in browser frame</span>}
            </div>
          )}

          {/* ── Thumbnail strip ── */}
          <div className="flex gap-2 p-3 bg-gray-900/50 overflow-x-auto">
            {visibleImages.map((img, idx) => (
              <div
                key={img.id}
                draggable={img.status !== "uploading"}
                onDragStart={e => handleDragStart(e, idx)}
                onDragEnter={e => handleDragEnter(e, idx)}
                onDragOver={e => e.preventDefault()}
                onDragEnd={handleDragEnd}
                onClick={() => setPreviewSlide(idx)}
                className={`relative flex-shrink-0 w-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  previewSlide === idx ? "border-[#44561f] ring-1 ring-[#44561f]/50" : "border-gray-700 hover:border-gray-500"
                } ${overIdx === idx && dragIdx !== idx ? "scale-90 border-[#a8c5a0]" : ""}`}
                style={{ height: img.imageType === "mobile" ? "84px" : "56px" }}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover object-top" />

                {/* Type dot indicator */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-1">
                  {img.imageType === "mobile"  && <div className="w-1 h-3 rounded-full bg-blue-400/80" />}
                  {img.imageType === "desktop" && <div className="w-5 h-1 rounded-full bg-purple-400/80" />}
                </div>

                {img.status === "uploading" && (
                  <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#a8c5a0] animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                  </div>
                )}
                {img.status === "error" && (
                  <div className="absolute inset-0 bg-red-900/70 flex items-center justify-center">
                    <svg className="w-3 h-3 text-red-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  </div>
                )}
                {idx === 0 && (
                  <div className="absolute top-0 left-0 right-0 bg-[#313E17]/80 text-[#a8c5a0] text-[8px] font-bold text-center py-0.5">
                    COVER
                  </div>
                )}
              </div>
            ))}

            {/* Add more button */}
            <div
              onClick={() => inputRef.current?.click()}
              className="flex-shrink-0 w-16 h-14 rounded-lg border-2 border-dashed border-gray-700 hover:border-[#44561f]/60 bg-gray-800/30 hover:bg-gray-800/50 flex flex-col items-center justify-center cursor-pointer transition-all group"
            >
              <svg className="w-4 h-4 text-gray-500 group-hover:text-[#a8c5a0] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span className="text-[9px] text-gray-600 group-hover:text-gray-400 mt-0.5">Add</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Drop zone ── */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 w-full rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 py-6 px-4 ${
          dragOver
            ? "border-[#44561f] bg-[#313E17]/20 scale-[1.01]"
            : "border-gray-700 bg-gray-800/40 hover:border-[#44561f]/60 hover:bg-gray-800/60"
        }`}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${dragOver ? "bg-[#313E17]/60" : "bg-gray-700/60"}`}>
          <svg className={`w-5 h-5 transition-colors ${dragOver ? "text-[#a8c5a0]" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-white">
            {visibleImages.length > 0
              ? dragOver ? "Drop to add more" : "Click or drag to add more images"
              : dragOver ? "Drop images here" : "Click or drag images to upload"}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">JPG, PNG, WebP, GIF · max 10 MB · Auto-detects mobile/desktop</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-3 rounded-sm bg-blue-400/40 border border-blue-400/30" />
            Portrait → Phone frame
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-2.5 rounded-sm bg-purple-400/40 border border-purple-400/30" />
            Landscape → Browser frame
          </span>
        </div>
        <input ref={inputRef} type="file" multiple accept="image/*" className="hidden"
          onChange={e => handleFiles(e.target.files)} />
      </div>

      {visibleImages.length > 0 && (
        <p className="text-xs text-gray-500 text-center">
          {visibleImages.length} image{visibleImages.length !== 1 ? "s" : ""} · Drag thumbnails to reorder · First = cover
          {visibleImages.length === 2 && " · Desktop + Mobile → dual showcase on portfolio"}
        </p>
      )}
    </div>
  );
}

// ─── TagInput ─────────────────────────────────────────────────────────────────
function TagInput({ label, value, onChange, placeholder, hint }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} placeholder={placeholder}
        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 outline-none focus:border-[#44561f] focus:ring-1 focus:ring-[#44561f] resize-none transition-colors" />
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

// ─── Main AdminDashboard ──────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [user,           setUser]           = useState(null);
  const [authLoading,    setAuthLoading]    = useState(true);
  const [projects,       setProjects]       = useState([]);
  const [loading,        setLoading]        = useState(false);
  const [view,           setView]           = useState("list");
  const [editingProject, setEditingProject] = useState(null);
  const [form,           setForm]           = useState(EMPTY_FORM);
  const [imageEntries,   setImageEntries]   = useState([]);
  const [saving,         setSaving]         = useState(false);
  const [toast,          setToast]          = useState(null);
  const [deleteConfirm,  setDeleteConfirm]  = useState(null);
  const [searchTerm,     setSearchTerm]     = useState("");
  const [filterCat,      setFilterCat]      = useState("all");

  // ── Auth guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session || session.user.email !== ADMIN_EMAIL) {
        router.replace("/login");
      } else {
        setUser(session.user);
        setAuthLoading(false);
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session || session.user.email !== ADMIN_EMAIL) router.replace("/login");
    });
    return () => subscription.unsubscribe();
  }, [router]);

  // ── Fetch projects ──────────────────────────────────────────────────────────
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setProjects(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { if (!authLoading) fetchProjects(); }, [authLoading, fetchProjects]);

  // ── Toast ────────────────────────────────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Open forms ──────────────────────────────────────────────────────────────
  const openAdd = () => {
    setEditingProject(null);
    setForm(EMPTY_FORM);
    setImageEntries([]);
    setView("add");
  };

  const openEdit = (project) => {
    setEditingProject(project);
    setForm({
      title:            project.title            || "",
      category:         project.category         || "mobile",
      description:      project.description      || "",
      full_description: project.full_description || "",
      technologies:     Array.isArray(project.technologies) ? project.technologies.join(", ") : "",
      challenges:       fromArr(project.challenges),
      solutions:        fromArr(project.solutions),
      results:          fromArr(project.results),
      duration:         project.duration         || "",
      team:             project.team             || "",
      client:           project.client           || "",
      github_url:       project.github_url       || "",
      live_url:         project.live_url         || "",
      ...statsToForm(project.stats),
    });
    const existingEntries = (project.images || []).map(url => ({
      id:          uid(),
      url,
      status:      "existing",
      imageType:   "unknown",
      aspectRatio: null,
      dimensions:  null,
      storagePath: url.includes(`/${BUCKET}/`)
        ? url.split(`/${BUCKET}/`)[1]?.split("?")[0]
        : null,
    }));
    setImageEntries(existingEntries);
    setView("edit");
  };

  // ── Build DB payload ────────────────────────────────────────────────────────
  const buildPayload = () => {
    const stats = {};
    if (form.stat_key1 && form.stat_val1) stats[form.stat_key1] = form.stat_val1;
    if (form.stat_key2 && form.stat_val2) stats[form.stat_key2] = form.stat_val2;
    if (form.stat_key3 && form.stat_val3) stats[form.stat_key3] = form.stat_val3;
    const images = imageEntries
      .filter(img => img.status === "done" || img.status === "existing")
      .map(img => img.url);
    return {
      title:            form.title.trim(),
      category:         form.category,
      description:      form.description.trim(),
      full_description: form.full_description.trim(),
      technologies:     toArr(form.technologies),
      images,
      stats,
      duration:         form.duration.trim(),
      team:             form.team.trim(),
      client:           form.client.trim(),
      challenges:       toArr(form.challenges),
      solutions:        toArr(form.solutions),
      results:          toArr(form.results),
      github_url:       form.github_url.trim(),
      live_url:         form.live_url.trim(),
    };
  };

  // ── Save ────────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!form.title || !form.description) {
      showToast("Title and description are required.", "error"); return;
    }
    if (imageEntries.some(img => img.status === "uploading")) {
      showToast("Please wait — images are still uploading.", "error"); return;
    }
    setSaving(true);
    const payload = buildPayload();
    let error;
    if (view === "edit" && editingProject) {
      ({ error } = await supabase.from("projects").update(payload).eq("id", editingProject.id));
    } else {
      ({ error } = await supabase.from("projects").insert([payload]));
    }
    setSaving(false);
    if (error) { showToast(error.message, "error"); return; }
    showToast(view === "edit" ? "Project updated!" : "Project added!");
    setView("list");
    fetchProjects();
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    const project = projects.find(p => p.id === id);
    if (project?.images?.length) {
      const paths = project.images
        .filter(url => url.includes(`/${BUCKET}/`))
        .map(url => url.split(`/${BUCKET}/`)[1]?.split("?")[0])
        .filter(Boolean);
      if (paths.length) await supabase.storage.from(BUCKET).remove(paths);
    }
    const { error } = await supabase.from("projects").delete().eq("id", id);
    setDeleteConfirm(null);
    if (error) { showToast(error.message, "error"); return; }
    showToast("Project deleted.");
    fetchProjects();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // ── Filtered display ────────────────────────────────────────────────────────
  const displayed = projects.filter(p => {
    const matchesCat    = filterCat === "all" || p.category === filterCat;
    const matchesSearch = !searchTerm ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client?.toLowerCase().includes(searchTerm.toLowerCase());
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
    <div className="min-h-screen bg-gray-950 text-white" style={{ fontFamily: "'Sora', sans-serif" }}>

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-semibold shadow-2xl transition-all animate-slide-in ${toast.type === "error" ? "bg-red-600" : "bg-[#44561f]"}`}>
          {toast.type === "error"
            ? <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            : <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
          }
          {toast.msg}
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-sm w-full border border-gray-700 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Delete Project?</h3>
            <p className="text-gray-400 text-sm mb-6">This will permanently delete the project and all its uploaded images. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl border border-gray-600 text-gray-300 text-sm font-semibold hover:border-gray-500 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#313E17] to-[#44561f] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            </div>
            <span className="font-bold text-white text-lg">Admin Dashboard</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#313E17]/40 text-[#a8c5a0] text-xs font-medium border border-[#44561f]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {user?.email}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {view !== "list" && (
              <button onClick={() => setView("list")} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Back
              </button>
            )}
            <a href="/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              View Site
            </a>
            <button onClick={handleLogout} className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* ══════ LIST VIEW ══════════════════════════════════════════════════ */}
        {view === "list" && (
          <>
            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Projects", value: projects.length,                                    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
                { label: "Mobile Apps",    value: projects.filter(p => p.category === "mobile").length,    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
                { label: "Full Stack",     value: projects.filter(p => p.category === "fullstack").length, icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                { label: "Marketing",      value: projects.filter(p => p.category === "marketing").length, icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
              ].map(s => (
                <div key={s.label} className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{s.label}</span>
                    <div className="w-8 h-8 rounded-lg bg-[#313E17]/40 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#a8c5a0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={s.icon}/></svg>
                    </div>
                  </div>
                  <p className="text-3xl font-extrabold text-white">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" placeholder="Search projects…" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900 border border-gray-700 text-sm text-white placeholder-gray-500 outline-none focus:border-[#44561f] transition-colors" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {["all", ...CATEGORIES.map(c => c.id)].map(cat => (
                  <button key={cat} onClick={() => setFilterCat(cat)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${filterCat === cat ? "bg-gradient-to-r from-[#313E17] to-[#44561f] text-white" : "bg-gray-900 border border-gray-700 text-gray-400 hover:text-white"}`}>
                    {cat === "all" ? "All" : CATEGORIES.find(c => c.id === cat)?.name}
                  </button>
                ))}
              </div>
              <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#313E17] to-[#44561f] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg whitespace-nowrap">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Project
              </button>
            </div>

            {/* Cards grid */}
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <div className="w-8 h-8 border-2 border-[#44561f] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : displayed.length === 0 ? (
              <div className="text-center py-24 border-2 border-dashed border-gray-800 rounded-2xl">
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
                <p className="text-gray-500 font-medium mb-4">{projects.length === 0 ? "No projects yet. Add your first!" : "No projects match your filter."}</p>
                {projects.length === 0 && (
                  <button onClick={openAdd} className="px-6 py-2.5 bg-gradient-to-r from-[#313E17] to-[#44561f] text-white rounded-xl text-sm font-semibold">Add Your First Project</button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {displayed.map(project => (
                  <div key={project.id} className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden hover:border-[#44561f]/50 transition-all group">
                    <div className="h-44 relative overflow-hidden bg-gray-800">
                      {project.images?.[0] ? (
                        <>
                          <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          {project.images.length > 1 && (
                            <div className="absolute top-3 right-3 flex items-center gap-1 bg-gray-900/70 backdrop-blur-sm text-gray-300 text-xs px-2 py-1 rounded-full border border-white/10">
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                              {project.images.length}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                          <svg className="w-10 h-10 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                          <span className="text-xs text-gray-600">No images</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#313E17]/80 text-[#a8c5a0] text-xs font-semibold backdrop-blur-sm">
                          {CATEGORIES.find(c => c.id === project.category)?.name || project.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-white text-lg mb-1 line-clamp-1">{project.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-3">{project.description}</p>
                      {project.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.technologies.slice(0, 3).map(t => (
                            <span key={t} className="px-2 py-0.5 bg-gray-800 text-gray-300 text-xs rounded-md border border-gray-700">{t}</span>
                          ))}
                          {project.technologies.length > 3 && <span className="px-2 py-0.5 text-gray-500 text-xs">+{project.technologies.length - 3} more</span>}
                        </div>
                      )}
                      <div className="flex gap-2 pt-4 border-t border-gray-800">
                        <button onClick={() => openEdit(project)} className="flex-1 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium transition-colors flex items-center justify-center gap-1.5">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          Edit
                        </button>
                        <button onClick={() => setDeleteConfirm(project.id)} className="flex-1 py-2 rounded-xl bg-gray-800 hover:bg-red-900/40 text-gray-400 hover:text-red-400 text-sm font-medium transition-colors flex items-center justify-center gap-1.5">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
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

        {/* ══════ ADD / EDIT VIEW ════════════════════════════════════════════ */}
        {(view === "add" || view === "edit") && (
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">{view === "edit" ? "Edit Project" : "Add New Project"}</h2>
              <p className="text-gray-400 text-sm mt-1">{view === "edit" ? `Editing: ${editingProject?.title}` : "Fill in the details for your new project."}</p>
            </div>

            <div className="space-y-6">

              {/* Basic Info */}
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-sm font-bold text-[#a8c5a0] uppercase tracking-wider mb-5">Basic Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Project Title *</label>
                      <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="E-Commerce App"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 outline-none focus:border-[#44561f] focus:ring-1 focus:ring-[#44561f] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Category</label>
                      <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white outline-none focus:border-[#44561f] transition-colors">
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <TagInput label="Short Description *" value={form.description} onChange={v => setForm({ ...form, description: v })}
                    placeholder="A brief description shown on the project card…" hint="1-2 sentences for the portfolio card." />
                  <TagInput label="Full Description" value={form.full_description} onChange={v => setForm({ ...form, full_description: v })}
                    placeholder="Detailed description for the project modal…" hint="Full paragraph for the project detail view." />
                </div>
              </div>

              {/* Images */}
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-sm font-bold text-[#a8c5a0] uppercase tracking-wider mb-1">Project Images</h3>
                <p className="text-xs text-gray-500 mb-5">
                  Upload <span className="text-[#a8c5a0] font-semibold">2 images</span> for the dual showcase —
                  <span className="text-white font-semibold"> portrait = mobile phone frame</span>,
                  <span className="text-white font-semibold"> landscape = browser frame</span>.
                  Images are auto-detected and sorted. 3+ images use a slider.
                </p>
                <ImageUploader images={imageEntries} onChange={setImageEntries} />
              </div>

              {/* Project Details */}
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-sm font-bold text-[#a8c5a0] uppercase tracking-wider mb-5">Project Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { key: "client",   label: "Client",    placeholder: "Client Name"  },
                    { key: "duration", label: "Duration",  placeholder: "6 months"     },
                    { key: "team",     label: "Team Size", placeholder: "5 developers" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{f.label}</label>
                      <input type="text" value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 outline-none focus:border-[#44561f] transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-sm font-bold text-[#a8c5a0] uppercase tracking-wider mb-5">Stats (up to 3)</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Stat {n} Label</label>
                        <input type="text" value={form[`stat_key${n}`]} onChange={e => setForm({ ...form, [`stat_key${n}`]: e.target.value })}
                          placeholder={["users", "rating", "downloads"][n - 1]}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 outline-none focus:border-[#44561f] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Stat {n} Value</label>
                        <input type="text" value={form[`stat_val${n}`]} onChange={e => setForm({ ...form, [`stat_val${n}`]: e.target.value })}
                          placeholder={["50K+", "4.8", "100K+"][n - 1]}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 outline-none focus:border-[#44561f] transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-sm font-bold text-[#a8c5a0] uppercase tracking-wider mb-5">Technologies</h3>
                <TagInput label="Tech Stack" value={form.technologies} onChange={v => setForm({ ...form, technologies: v })}
                  placeholder="React Native, Firebase, Stripe" hint="Separate with commas." />
              </div>

              {/* Challenges / Solutions / Results */}
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-sm font-bold text-[#a8c5a0] uppercase tracking-wider mb-5">Challenges, Solutions & Results</h3>
                <div className="space-y-4">
                  <TagInput label="Challenges" value={form.challenges} onChange={v => setForm({ ...form, challenges: v })}
                    placeholder="Implementing real-time sync…" hint="One per line." />
                  <TagInput label="Solutions" value={form.solutions} onChange={v => setForm({ ...form, solutions: v })}
                    placeholder="Built a custom WebSocket system…" hint="One per line." />
                  <TagInput label="Results" value={form.results} onChange={v => setForm({ ...form, results: v })}
                    placeholder="50,000+ active users in 3 months…" hint="One per line." />
                </div>
              </div>

              {/* Links */}
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <h3 className="text-sm font-bold text-[#a8c5a0] uppercase tracking-wider mb-5">Links</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: "live_url",   label: "Live URL",   placeholder: "https://myproject.com"        },
                    { key: "github_url", label: "GitHub URL", placeholder: "https://github.com/user/repo" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{f.label}</label>
                      <input type="url" value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 outline-none focus:border-[#44561f] transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pb-8">
                <button onClick={() => setView("list")} className="flex-1 py-3.5 rounded-xl border border-gray-700 text-gray-300 font-semibold text-sm hover:border-gray-600 hover:text-white transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || imageEntries.some(img => img.status === "uploading")}
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#313E17] to-[#44561f] text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-opacity flex items-center justify-center gap-2 shadow-lg"
                >
                  {saving ? (
                    <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>Saving…</>
                  ) : imageEntries.some(img => img.status === "uploading") ? (
                    <><svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>Uploading images…</>
                  ) : (
                    view === "edit" ? "Update Project" : "Add Project"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        .line-clamp-1{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        @keyframes slide-in{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .animate-slide-in{animation:slide-in .2s ease-out}
      `}</style>
    </div>
  );
}