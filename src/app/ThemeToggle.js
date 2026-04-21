"use client";

import { useTheme } from "./context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
        fixed top-4 right-4 z-[9999]
        w-14 h-7
        rounded-full
        border border-gray-300 dark:border-gray-600
        shadow-md hover:shadow-lg
        transition-all duration-300
        flex items-center
        px-1
      "
    >
      {/* Track */}
      <span
        className={`
          absolute inset-0 rounded-full transition-colors duration-300
          ${isDark ? "bg-gray-700" : "bg-gray-100"}
        `}
      />

      {/* Sliding thumb */}
      <span
        className={`
          relative z-10 w-5 h-5 rounded-full shadow-sm
          flex items-center justify-center
          transition-all duration-300 ease-in-out
          ${isDark ? "translate-x-7 bg-gray-900" : "translate-x-0 bg-white"}
        `}
      >
        {isDark ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-blue-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </svg>
        )}
      </span>
    </button>
  );
}