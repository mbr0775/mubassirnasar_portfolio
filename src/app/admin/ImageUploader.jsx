"use client";

import { useState, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const BUCKET = "project-images";
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// ─── Intelligent image analyzer ───────────────────────────────────────────────
// Returns: { type: "mobile" | "desktop" | "unknown", aspectRatio: number }
function analyzeImage(file) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const ar = img.naturalWidth / img.naturalHeight;
      URL.revokeObjectURL(url);
      // Portrait-ish (ar < 0.75) → likely mobile screenshot
      // Landscape (ar > 1.2) → likely desktop screenshot
      // In between → ambiguous
      const type = ar < 0.75 ? "mobile" : ar > 1.2 ? "desktop" : "unknown";
      resolve({ type, aspectRatio: ar, width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve({ type: "unknown", aspectRatio: 1 }); };
    img.src = url;
  });
}

// ─── SmartBadge ───────────────────────────────────────────────────────────────
function SmartBadge({ type }) {
  if (type === "mobile") return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-[10px] font-bold">
      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeLinecap="round" strokeWidth="3"/></svg>
      MOBILE
    </span>
  );
  if (type === "desktop") return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-[10px] font-bold">
      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
      DESKTOP
    </span>
  );
  return (
    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-500/20 border border-gray-400/40 text-gray-400 text-[10px] font-bold">
      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01" strokeLinecap="round"/></svg>
      AUTO
    </span>
  );
}

// ─── ImageUploader ─────────────────────────────────────────────────────────────
export function ImageUploader({ images, onChange }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);
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
      // Auto-sort: put desktop first, mobile second (only when exactly 2 images)
      if (next.length === 2) {
        const hasDesktop = next.find((i) => i.imageType === "desktop");
        const hasMobile = next.find((i) => i.imageType === "mobile");
        if (hasDesktop && hasMobile) {
          return [hasDesktop, hasMobile];
        }
      }
      return next;
    });

    // Upload each to Supabase
    for (const entry of analyzed) {
      const ext = entry.name.split(".").pop();
      const path = `${uid()}.${ext}`;
      try {
        const { data, error } = await supabase.storage
          .from(BUCKET)
          .upload(path, entry.file, { cacheControl: "3600", upsert: false });
        if (error) throw error;
        const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
        onChange((prev) =>
          prev.map((img) =>
            img.id === entry.id
              ? { ...img, url: publicUrl, status: "done", progress: 100, storagePath: data.path }
              : img
          )
        );
      } catch (err) {
        onChange((prev) =>
          prev.map((img) =>
            img.id === entry.id ? { ...img, status: "error", errorMsg: err.message } : img
          )
        );
      }
    }
  }, [onChange]);

  const handleFiles = (files) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
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
    onChange((prev) => prev.filter((i) => i.id !== img.id));
    setPreviewSlide(0);
  };

  const handleDragStart = (e, idx) => { setDragIdx(idx); e.dataTransfer.effectAllowed = "move"; };
  const handleDragEnter = (e, idx) => { e.preventDefault(); setOverIdx(idx); };
  const handleDragEnd = () => {
    if (dragIdx !== null && overIdx !== null && dragIdx !== overIdx) {
      onChange((prev) => {
        const arr = [...prev];
        const [moved] = arr.splice(dragIdx, 1);
        arr.splice(overIdx, 0, moved);
        return arr;
      });
    }
    setDragIdx(null);
    setOverIdx(null);
  };

  const visibleImages = images.filter(
    (img) => img.status === "done" || img.status === "existing" || img.status === "uploading"
  );

  const currentImg = visibleImages[previewSlide];

  // Determine showcase preview type
  const isMobileSized = currentImg?.imageType === "mobile" ||
    (currentImg?.aspectRatio && currentImg.aspectRatio < 0.75);
  const isDesktopSized = currentImg?.imageType === "desktop" ||
    (currentImg?.aspectRatio && currentImg.aspectRatio > 1.2);

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
                  {/* Phone shell */}
                  <div className="relative rounded-[28px] overflow-hidden shadow-2xl border-[3px] border-gray-600 bg-gray-900"
                    style={{ aspectRatio: "9/19.5" }}>
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
                        <img src={currentImg?.url} alt="Mobile preview"
                          className="w-full h-full object-cover object-top" />
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

            {/* ── Desktop/browser frame ── */}
            {isDesktopSized && (
              <div className="p-4">
                <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-gray-800">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-700/80 border-b border-white/5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                    <div className="flex-1 mx-2 h-4 rounded bg-gray-600/60 flex items-center px-2 gap-1.5">
                      <svg className="w-2.5 h-2.5 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <div className="h-1.5 w-20 bg-gray-500/50 rounded" />
                    </div>
                    <svg className="w-3 h-3 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
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
                      <img src={currentImg?.url} alt="Desktop preview"
                        className="w-full object-cover object-top" style={{ maxHeight: "220px" }} />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Fallback: plain preview ── */}
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
                  <img src={currentImg?.url} alt="Preview"
                    className="w-full h-full object-contain" style={{ background: "#111827" }} />
                )}
              </div>
            )}

            {/* Navigation arrows */}
            {visibleImages.length > 1 && (
              <>
                <button type="button"
                  onClick={() => setPreviewSlide((s) => (s - 1 + visibleImages.length) % visibleImages.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-900/80 hover:bg-gray-800 text-white flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-all shadow-lg border border-white/10 z-20">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button type="button"
                  onClick={() => setPreviewSlide((s) => (s + 1) % visibleImages.length)}
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
              {currentImg.imageType === "mobile" && (
                <span className="text-xs text-blue-400/80 ml-auto">→ Will show in phone frame</span>
              )}
              {currentImg.imageType === "desktop" && (
                <span className="text-xs text-purple-400/80 ml-auto">→ Will show in browser frame</span>
              )}
            </div>
          )}

          {/* ── Thumbnail strip ── */}
          <div className="flex gap-2 p-3 bg-gray-900/50 overflow-x-auto">
            {visibleImages.map((img, idx) => (
              <div
                key={img.id}
                draggable={img.status !== "uploading"}
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragEnter={(e) => handleDragEnter(e, idx)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={handleDragEnd}
                onClick={() => setPreviewSlide(idx)}
                className={`relative flex-shrink-0 w-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  previewSlide === idx ? "border-[#44561f] ring-1 ring-[#44561f]/50" : "border-gray-700 hover:border-gray-500"
                } ${overIdx === idx && dragIdx !== idx ? "scale-90 border-[#a8c5a0]" : ""}`}
                style={{ height: img.imageType === "mobile" ? "84px" : "56px" }}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover object-top" />

                {/* Type indicator overlay */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-1">
                  {img.imageType === "mobile" && (
                    <div className="w-1 h-3 rounded-full bg-blue-400/80" />
                  )}
                  {img.imageType === "desktop" && (
                    <div className="w-5 h-1 rounded-full bg-purple-400/80" />
                  )}
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
                    <svg className="w-3 h-3 text-red-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                )}
                {idx === 0 && (
                  <div className="absolute top-0 left-0 right-0 bg-[#313E17]/80 text-[#a8c5a0] text-[8px] font-bold text-center py-0.5">
                    COVER
                  </div>
                )}
              </div>
            ))}

            {/* Add more */}
            <div onClick={() => inputRef.current?.click()}
              className="flex-shrink-0 w-16 h-14 rounded-lg border-2 border-dashed border-gray-700 hover:border-[#44561f]/60 bg-gray-800/30 hover:bg-gray-800/50 flex flex-col items-center justify-center cursor-pointer transition-all group">
              <svg className="w-4 h-4 text-gray-500 group-hover:text-[#a8c5a0] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span className="text-[9px] text-gray-600 group-hover:text-gray-400 mt-0.5">Add</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Drop zone ── */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
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
          <p className="text-xs text-gray-500 mt-0.5">
            JPG, PNG, WebP, GIF · max 10 MB · Auto-detects mobile/desktop
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <span className="w-2 h-3 rounded-sm bg-blue-400/40 border border-blue-400/30" />
            Portrait → Mobile frame
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-2.5 rounded-sm bg-purple-400/40 border border-purple-400/30" />
            Landscape → Browser frame
          </span>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {visibleImages.length > 0 && (
        <p className="text-xs text-gray-500 text-center">
          {visibleImages.length} image{visibleImages.length !== 1 ? "s" : ""} ·
          Drag thumbnails to reorder · First image = cover
          {visibleImages.length === 2 && " · Desktop+Mobile will show dual showcase"}
        </p>
      )}
    </div>
  );
}