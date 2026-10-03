"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminThemeToggle from "./AdminThemeToggle";

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <header className="flex items-center justify-between w-full h-16 px-container-padding bg-surface border-b border-outline-variant z-30 flex-shrink-0 relative">
      <div className="flex items-center gap-4 flex-1">
        {/* Desktop / Tablet Search Bar */}
        <div className="relative w-64 max-w-md hidden md:flex items-center">
          {/* <span className="material-symbols-outlined absolute left-3 text-on-surface-variant z-10 pointer-events-none">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-8 py-1.5 bg-surface-container-lowest border border-outline-variant rounded text-on-surface font-body-md focus:outline-none focus:ring-1 focus:ring-primary-container transition-all placeholder:text-on-surface-variant"
            placeholder="Хайх..."
            type="text"
          /> */}
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2 text-on-surface-variant hover:text-on-surface p-0.5 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                close
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Mobile Search Toggle Button */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors md:hidden"
          aria-label="Хайлтыг нээх, хаах"
        >
          <span className="material-symbols-outlined">
            {isSearchOpen ? "close" : "search"}
          </span>
        </button>

        <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <motion.span
            className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-surface"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </button>

        <AdminThemeToggle className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors" />

        <motion.button
          whileHover={{ boxShadow: "0 0 15px color-mix(in srgb, var(--color-primary-container) 30%, transparent)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary-container text-[#080E1E] px-3 sm:px-4 py-2 rounded font-label-md text-label-md font-bold flex items-center gap-2 transition-colors whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span className="hidden xs:inline">Шинэ төсөл нэмэх</span>
          <span className="xs:hidden">Нэмэх</span>
        </motion.button>
      </div>

      {/* Mobile Expandable Search Bar (Smooth Framer Motion) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-surface border-b border-outline-variant p-3 shadow-lg md:hidden overflow-hidden"
          >
            <div className="relative flex items-center w-full">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant pointer-events-none">
                search
              </span>
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2 bg-surface-container-lowest border border-outline-variant rounded text-on-surface font-body-md focus:outline-none focus:border-primary-container transition-all placeholder:text-on-surface-variant"
                placeholder="Хайх..."
                type="text"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 text-on-surface-variant hover:text-on-surface p-0.5 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    close
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
