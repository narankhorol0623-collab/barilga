"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminThemeToggle from "./AdminThemeToggle";
import type { PhoneSubmission } from "./lib/phones";

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<PhoneSubmission[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let active = true;
    let hasInitialSnapshot = false;
    const knownIds = new Set<string>();

    const loadNotifications = async () => {
      try {
        const response = await fetch("/admin/api/get-phonenumber", {
          cache: "no-store",
        });
        if (!response.ok) return;
        const data = (await response.json()) as {
          phoneNumbers: PhoneSubmission[];
        };
        if (!active || !Array.isArray(data.phoneNumbers)) return;

        const incoming = data.phoneNumbers;
        if (hasInitialSnapshot) {
          const newSubmissions = incoming.filter(
            (submission) => !knownIds.has(submission.id),
          );
          if (newSubmissions.length) {
            setUnreadCount((count) => count + newSubmissions.length);
          }
        }
        incoming.forEach((submission) => knownIds.add(submission.id));
        hasInitialSnapshot = true;
        setNotifications(incoming.slice(0, 8));
      } catch {
        // Keep the last notification list if a poll temporarily fails.
      }
    };

    void loadNotifications();
    const interval = window.setInterval(loadNotifications, 10_000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

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

        <button
          type="button"
          onClick={() => {
            setIsNotificationsOpen((open) => !open);
            setUnreadCount(0);
          }}
          aria-label={`Мэдэгдэл${unreadCount ? `, ${unreadCount} уншаагүй` : ""}`}
          aria-expanded={isNotificationsOpen}
          className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors relative"
        >
          <span className="material-symbols-outlined">notifications</span>
          {unreadCount > 0 && (
            <motion.span
              className="absolute -top-0.5 -right-1 min-w-4 h-4 px-1 bg-error rounded-full ring-2 ring-surface text-[10px] leading-4 text-white text-center"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.span>
          )}
        </button>

        <AnimatePresence>
          {isNotificationsOpen && (
            <motion.section
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="absolute right-20 sm:right-28 top-14 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-lg border border-outline-variant bg-surface-container shadow-xl"
              aria-label="Утасны дугаарын мэдэгдлүүд"
            >
              <div className="flex items-center justify-between border-b border-outline-variant px-4 py-3">
                <h2 className="text-sm font-semibold text-on-surface">
                  Шинэ хүсэлтүүд
                </h2>
                <span className="text-xs text-on-surface-variant">
                  Сүүлийн 8
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto custom-scrollbar p-2">
                {notifications.length ? (
                  notifications.map((submission) => (
                    <div
                      key={submission.id}
                      className="rounded-md px-3 py-2 hover:bg-surface-container-high"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-on-surface">
                          {submission.phone}
                        </span>
                        {submission.status === "new" && (
                          <span
                            className="h-2 w-2 shrink-0 rounded-full bg-primary-container"
                            aria-label="Шинэ"
                          />
                        )}
                      </div>
                      <p className="mt-1 text-xs text-on-surface-variant">
                        {submission.apartmentId
                          ? `${submission.block?.toUpperCase() || ""} ${submission.floor ? `${submission.floor}-р давхар · ` : ""}№${submission.apartmentId}`.trim()
                          : "Ерөнхий утасны хүсэлт"}
                        {" · "}
                        {new Date(submission.createdAt).toLocaleString("mn-MN")}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="px-3 py-6 text-center text-sm text-on-surface-variant">
                    Одоогоор шинэ хүсэлт алга.
                  </p>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <AdminThemeToggle className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors" />
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
