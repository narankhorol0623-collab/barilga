"use client";
import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// 1. Тохирох утгуудын type-ийг зарлана
type SectionType =
  | "dashboard"
  | "projects"
  | "inventory"
  | "content"
  | "leads"
  | "settings";

// 2. Props-ийн interface-ийг үүсгэнэ
interface SidebarProps {
  activeSection: SectionType;
  onNavigate: React.Dispatch<React.SetStateAction<SectionType>>;
  onLogout: () => void;
}

// 3. Nav items массивын төрөл ба утгууд
interface NavItem {
  id: SectionType;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Хяналтын панел", icon: "dashboard" },
  { id: "projects", label: "Төслүүд", icon: "folder" },
  { id: "inventory", label: "Бараа материал", icon: "inventory_2" },
  { id: "content", label: "Контент", icon: "article" },
  { id: "leads", label: "Хүсэлтүүд", icon: "group" },
  { id: "settings", label: "Тохиргоо", icon: "settings" },
];

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function Sidebar({
  activeSection,
  onNavigate,
  onLogout,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Гар утсан дээр харагдах Toggle Button */}
      <button
        type="button"
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-surface text-on-surface border border-outline-variant shadow-md flex items-center justify-center"
        aria-label="Цэс нээх, хаах"
      >
        <span className="material-symbols-outlined">
          {isOpen ? "close" : "menu"}
        </span>
      </button>

      {/* Гар утсан дээр Sidebar нээлттэй үед арын хэсгийг бүдэгрүүлэх Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="md:hidden fixed inset-0 bg-black/50 z-30"
          />
        )}
      </AnimatePresence>

      {/* Responsive Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 h-full z-40 w-sidebar-expanded bg-surface border-r border-outline-variant flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="px-6 py-6 flex items-center justify-center gap-3">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="font-headline-sm text-headline-sm font-bold text-primary flex items-center gap-2"
          >
            <img src="/good-supply-logo.png" alt="" className="h-8 w-auto" />
            <h1 className="text-xl font-bold text-center text-primary uppercase">
              &quot;Гүнд Саплай&quot;
            </h1>
          </motion.span>
        </div>

        <motion.nav
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="flex-1 overflow-y-auto custom-scrollbar py-4 space-y-1"
        >
          {navItems.map((item) => {
            const isActive = item.id === activeSection;
            return (
              <motion.button
                key={item.id}
                type="button"
                variants={itemVariants}
                whileHover={{ x: isActive ? 0 : 4 }}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false); // Цэс дээр дарахад гар утсан дээр sidebar хаагдана
                }}
                className={`relative w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200 ease-in-out group ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-highlight"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 border-l-4 border-primary bg-surface-container-high"
                  />
                )}
                <span
                  className={`relative material-symbols-outlined transition-shadow ${
                    isActive
                      ? "text-primary group-hover:drop-shadow-[0_0_8px_rgba(0,245,212,0.5)]"
                      : ""
                  }`}
                >
                  {item.icon}
                </span>
                <span className="relative font-label-md text-label-md tracking-wider">
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </motion.nav>

        <div className="p-4 border-t border-outline-variant mt-auto bg-surface-container-lowest">
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden border border-outline-variant">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Админ хэрэглэгч"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq8bi31nGME-3BBL_Lewi-4nyhyYLJ2DJk8QH7Jem_80WoPaGfu7Mi98Y0YIwt5yDUNkPtwkN5tWKxUhAmxShXDYKpFTlihdNsh2VKcrC5HonjQ8-OVv-v53JU71NzDC2NueIsJC3F7glY1HH4xId5W3x-BGCts21s-peS-p-i00-3-aFsfcb5LQoEHYNV6mZMK7A7OEGC2mAFaUN9C8n_GefYyMgpanOJ1NgsTtZbftA92_DQW-cF"
              />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-label-md text-label-md font-bold text-on-surface truncate">
                ГҮНД САПЛАЙ — УДИРДЛАГА
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant truncate">
                Администратор
              </p>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="ml-auto text-on-surface-variant hover:text-error transition-colors p-1 flex items-center justify-center"
              title="Гарах"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
