"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { PhoneSubmission } from "./lib/phones";

function LeadCard({
  lead,
  index,
  onDelete,
  onStatusChange,
}: {
  lead: PhoneSubmission;
  index: number;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: "new" | "contacted") => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.1 }}
      whileHover={{ x: 2 }}
      className="p-3 rounded border border-outline-variant/50 bg-surface-container-low hover:border-[#1E2D50] hover:bg-[#1E2D50]/30 transition-all"
    >
      <div className="flex justify-between items-start mb-1 gap-2">
        <span className="font-label-md text-xs sm:text-label-md font-bold text-on-surface truncate">
          {lead.name || "Нэрээ үлдээгээгүй"}
        </span>
        {
          <motion.span
            className="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_4px_rgba(0,245,212,0.8)] shrink-0 mt-1"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        }
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-on-surface-variant mb-2">
        <span className="flex items-center gap-1 truncate max-w-[150px] sm:max-w-none">
          <span className="material-symbols-outlined text-[13px] sm:text-[14px] shrink-0">
            call
          </span>
          <span className="truncate">{lead.phone}</span>
        </span>
        <span className="truncate">
          {lead.apartmentId
            ? `${lead.block?.toUpperCase() || ""} ${lead.floor ? `${lead.floor}-р давхар · ` : ""}№${lead.apartmentId}${lead.layout ? ` · ${lead.layout} сууц` : ""}`.trim()
            : "Ерөнхий хүсэлт"}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className={`px-2 py-0.5 rounded text-[10px] font-label-sm shrink-0 ${lead.status === "contacted" ? "bg-surface-variant text-on-surface-variant" : "bg-primary-container/10 text-primary-container"}`}>
          {lead.status === "contacted" ? "Холбогдсон" : "Шинэ хүсэлт"}
        </span>
        <span className="text-[10px] text-on-surface-variant shrink-0">
          {new Date(lead.createdAt).toLocaleString("mn-MN")}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onStatusChange(lead.id, lead.status === "contacted" ? "new" : "contacted")}
        className="mt-2 mr-4 text-xs text-primary-container hover:underline"
      >
        {lead.status === "contacted" ? "Шинэ болгох" : "Холбогдсон болгох"}
      </button>
      <button
        type="button"
        onClick={() => onDelete(lead.id)}
        className="mt-2 text-xs text-error hover:underline"
      >
        Устгах
      </button>
    </motion.div>
  );
}

export default function RecentLeads() {
  const [leads, setLeads] = useState<PhoneSubmission[]>([]);
  const [error, setError] = useState("");
  const [authRequired, setAuthRequired] = useState(false);
  async function refresh() {
    const response = await fetch("/admin/api/get-phonenumber", {
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error || "Хүсэлтүүдийг татаж чадсангүй");
    setLeads(data.phoneNumbers);
  }
  useEffect(() => {
    let active = true;
    let interval: number | undefined;
    const load = async () => {
      try {
        const response = await fetch("/admin/api/get-phonenumber", { cache: "no-store" });
        if (response.status === 401) {
          if (active) setAuthRequired(true);
          if (interval) window.clearInterval(interval);
          return;
        }
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Хүсэлтүүдийг татаж чадсангүй");
        if (active) {
          setLeads(data.phoneNumbers as PhoneSubmission[]);
          setError("");
        }
      } catch (e) {
        if (active) setError(e instanceof Error ? e.message : "Хүсэлтүүдийг татаж чадсангүй");
      }
    };
    fetch("/admin/api/session", { cache: "no-store" })
      .then((response) => response.json())
      .then((session) => {
        if (!active) return;
        if (!session.authenticated) {
          setAuthRequired(true);
          return;
        }
        setAuthRequired(false);
        if (!session.authorized) {
          setError("Та нэвтэрсэн байна. Хэрэглэгчдийн хүсэлтийг харахад админ эрх шаардлагатай.");
          return;
        }
        void load();
        interval = window.setInterval(load, 10_000);
      })
      .catch(() => {
        if (active) setAuthRequired(true);
      });
    return () => {
      active = false;
      if (interval) window.clearInterval(interval);
    };
  }, []);
  async function remove(id: string) {
    const response = await fetch(
      "/admin/api/delete-phonenumber?id=" + encodeURIComponent(id),
      { method: "DELETE" },
    );
    if (response.ok) refresh().catch((e) => setError(e.message));
    else setError("Хүсэлтийг устгаж чадсангүй");
  }
  async function changeStatus(id: string, status: "new" | "contacted") {
    const response = await fetch("/admin/api/update-phonenumber", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!response.ok) {
      setError("Хүсэлтийн төлөвийг хадгалж чадсангүй");
      return;
    }
    setLeads((current) => current.map((lead) => lead.id === id ? { ...lead, status } : lead));
  }
  const newCount = leads.filter((lead) => lead.status !== "contacted").length;

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
        {error && (
          <p role="alert" className="text-sm text-error">
            {error}
          </p>
        )}
        {authRequired && (
          <p className="text-sm text-on-surface-variant">
            Хүсэлтүүдийг харахын тулд <a className="text-primary-container underline" href="/admin/login">админд нэвтэрнэ үү</a>.
          </p>
        )}
        {!leads.length && !error && !authRequired && (
          <p className="text-sm text-on-surface-variant">
            Одоогоор хүсэлт алга.
          </p>
        )}
        {leads.map((lead, index) => (
          <LeadCard key={lead.id} lead={lead} index={index} onDelete={remove} onStatusChange={changeStatus} />
        ))}
      </div>
    </div>
  );
}
