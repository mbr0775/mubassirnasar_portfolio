// ─── DROP-IN REPLACEMENT for CardImageSection in ProjectsWorks.jsx ───────────
// Replace the entire CardImageSection component with this version.
// Also add this import at the top: import { Monitor, Smartphone } from 'lucide-react';

const CardImageSection = ({ project }) => {
  const images = project.images || [];
  const currentSlide = currentSlides[project.id] || 0;

  /* ── Dual layout: exactly 2 images ── */
  if (images.length === 2) {
    return (
      <div className="relative overflow-hidden bg-gray-900" style={{ height: "260px" }}>
        {/* Tinted backdrop */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} opacity-10`} />

        {/* Grid: desktop left, mobile right */}
        <div className="absolute inset-0 flex items-end gap-0 px-4 pb-0">

          {/* ── Desktop screenshot (browser mockup) ── */}
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
              {/* Desktop screenshot — full image, scroll from top */}
              <div className="relative overflow-hidden" style={{ height: "calc(210px - 28px)" }}>
                <img
                  src={images[0]}
                  alt={`${project.title} desktop`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* ── Mobile screenshot (phone mockup) ── */}
          <div className="flex-shrink-0 flex items-end" style={{ width: "88px", marginLeft: "8px" }}>
            <div
              className="relative w-full rounded-t-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-gray-900"
              style={{ height: "230px" }}
            >
              {/* Notch */}
              <div className="absolute top-0 left-0 right-0 h-5 bg-gray-900 z-10 flex items-center justify-center flex-shrink-0">
                <div className="w-8 h-1.5 rounded-full bg-gray-700" />
              </div>
              {/* Mobile screenshot — starts below notch, shows full portrait */}
              <div
                className="absolute left-0 right-0 bottom-0 overflow-hidden"
                style={{ top: "20px" }}
              >
                <img
                  src={images[1]}
                  alt={`${project.title} mobile`}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Mobile icon label at bottom */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-black/50 backdrop-blur-sm">
                  <Smartphone className="w-2.5 h-2.5 text-white/70" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none" />

        {/* Category badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${colorClasses.bg} backdrop-blur-sm border ${colorClasses.border} z-10`}>
          <span className={`text-xs font-medium ${colorClasses.text}`}>
            {categories.find((c) => c.id === project.category)?.name || project.category}
          </span>
        </div>

        {/* Dual-screen label */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-gray-900/70 backdrop-blur-sm border border-white/10 z-10">
          <Monitor className="w-3 h-3 text-gray-300" />
          <span className="text-[10px] text-gray-300 font-medium">+</span>
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
                currentSlide === imgIndex ? "opacity-100" : "opacity-0"
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
                      setCurrentSlides((prev) => ({ ...prev, [project.id]: imgIndex }));
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === imgIndex
                        ? `w-8 bg-gradient-to-r ${colorClasses.gradient}`
                        : "w-1.5 bg-gray-400/60 hover:bg-gray-300/80"
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
          {categories.find((c) => c.id === project.category)?.name || project.category}
        </span>
      </div>
    </div>
  );
};