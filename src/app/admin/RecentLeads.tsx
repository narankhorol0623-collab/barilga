"use client";

import { motion } from "framer-motion";
import { leads } from "./lib/data";
import type { Lead, LeadStage } from "./lib/types";

const stageBadge: Record<LeadStage, string> = {
  Холбогдсон: "bg-surface-variant text-on-surface",
  "Дахин холбогдох":
    "bg-error-container/20 border border-error-container/50 text-error",
  Хаагдсан: "bg-surface-variant text-on-surface-variant",
};

function LeadCard({ lead, index }: { lead: Lead; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.1 }}
      whileHover={{ x: 2 }}
      className={`p-3 rounded border border-outline-variant/50 bg-surface-container-low hover:border-[#1E2D50] hover:bg-[#1E2D50]/30 transition-all cursor-pointer ${
        lead.stage === "Хаагдсан" ? "opacity-75" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-1 gap-2">
        <span className="font-label-md text-xs sm:text-label-md font-bold text-on-surface truncate">
          {lead.name}
        </span>
        {lead.isNew && (
          <motion.span
            className="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_4px_rgba(0,245,212,0.8)] shrink-0 mt-1"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-on-surface-variant mb-2">
        <span className="flex items-center gap-1 truncate max-w-[150px] sm:max-w-none">
          <span className="material-symbols-outlined text-[13px] sm:text-[14px] shrink-0">
            {lead.contactIcon}
          </span>
          <span className="truncate">{lead.contact}</span>
        </span>
        <span className="truncate">{lead.project}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-label-sm shrink-0 ${stageBadge[lead.stage]}`}
        >
          {lead.stage}
        </span>
        <span className="text-[10px] text-on-surface-variant shrink-0">
          {lead.timeAgo}
        </span>
      </div>
    </motion.div>
  );
}

export default function RecentLeads() {
  const newCount = leads.filter((lead) => lead.isNew).length;

  return (
    <div className="glass-card p-4 sm:p-5 flex flex-col w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4 sm:mb-6 border-b border-outline-variant pb-3 sm:pb-4 gap-2">
        <h2 className="font-headline-sm text-base sm:text-headline-sm font-semibold text-on-surface flex items-center gap-2 truncate">
          <span className="material-symbols-outlined text-secondary text-lg sm:text-xl shrink-0">
            group
          </span>
          <span className="truncate">Сүүлийн хүсэлтүүд</span>
        </h2>
        <span className="px-2 py-0.5 bg-secondary/10 text-secondary border border-secondary/30 rounded font-label-sm text-[10px] sm:text-xs shrink-0">
          Шинэ: {newCount}
        </span>
      </div>
      <div className="flex-1 space-y-3 sm:space-y-4 overflow-y-auto custom-scrollbar pr-1 sm:pr-2 max-h-[350px] sm:max-h-none">
        {leads.map((lead, index) => (
          <LeadCard key={lead.id} lead={lead} index={index} />
        ))}
      </div>
    </div>
  );
}
