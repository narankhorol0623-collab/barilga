"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import KpiCards from "./KpiCards";
import AnalyticsChart from "./AnalyticsChart";
import MilestoneTracker from "./MilestoneTracker";
import ProjectTable from "./ProjectTable";
import RecentLeads from "./RecentLeads";
import ApartmentManager from "./ApartmentManager";
import type { AdminSection } from "./lib/navigation";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");

  const logout = async () => {
    await fetch("/admin/api/logout", { method: "POST" });
    window.location.assign("/admin/login");
  };

  return (
    <>
      <Sidebar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        onLogout={logout}
      />

      <main className="flex-1 ml-sidebar-expanded flex flex-col h-screen overflow-hidden bg-background relative z-0">
        <TopBar />

        <div className="flex-1 overflow-y-auto custom-scrollbar p-container-padding space-y-6 relative">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-[120px] pointer-events-none -z-10" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-secondary-container/5 rounded-full blur-[100px] pointer-events-none -z-10" />

          {activeSection === "dashboard" && (
            <>
              <KpiCards />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <AnalyticsChart />
                <MilestoneTracker />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ProjectTable />
                <RecentLeads />
              </div>
            </>
          )}

          {activeSection === "projects" && (
            <section className="glass-card p-4 sm:p-5">
              <ProjectTable />
            </section>
          )}
          {activeSection === "inventory" && <ApartmentManager />}
          {activeSection === "leads" && <RecentLeads />}
          {activeSection === "content" && (
            <section className="glass-card p-5 sm:p-7 space-y-5">
              <div>
                <h1 className="text-xl font-bold text-on-surface">
                  Сайтын агуулга
                </h1>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Нийтийн сайтад одоо нийтлэгдсэн хуудсуудыг нээн шалгана уу.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-outline-variant bg-surface-container p-4 hover:border-primary-container"
                >
                  <strong>Нүүр хуудас</strong>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    Төслийн мэдээлэл, компанийн тухай
                  </p>
                </a>
                <a
                  href="/master-plan"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-outline-variant bg-surface-container p-4 hover:border-primary-container"
                >
                  <strong>Байр сонгох</strong>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    Нийтийн байр сонголт ба хүсэлтийн form
                  </p>
                </a>
              </div>
              <p className="text-xs text-on-surface-variant">
                Эдгээр хуудсын агуулгыг засах API одоогоор байхгүй.
              </p>
            </section>
          )}
          {activeSection === "settings" && (
            <section className="glass-card p-5 sm:p-7 space-y-4">
              <div>
                <h1 className="text-xl font-bold text-on-surface">
                  Удирдлагын самбар
                </h1>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Энэ browser session-оос гарах эсвэл мэдээллийг дахин ачаална.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="rounded border border-outline-variant bg-surface-container px-4 py-2 text-sm hover:border-primary-container"
                >
                  Мэдээлэл дахин ачаалах
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded bg-error px-4 py-2 text-sm font-semibold text-white"
                >
                  Гарах
                </button>
              </div>
            </section>
          )}

          <div className="h-6" />
        </div>
      </main>
    </>
  );
}
