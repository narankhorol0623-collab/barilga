"use client";

import { useState } from "react";
import LoginPage from "./LoginPage";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import KpiCards from "./KpiCards";
import AnalyticsChart from "./AnalyticsChart";
import MilestoneTracker from "./MilestoneTracker";
import ProjectTable from "./ProjectTable";
import RecentLeads from "./RecentLeads";

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
        <LoginPage onLogin={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  return (
    <>
      <Sidebar />

      <main className="flex-1 ml-sidebar-expanded flex flex-col h-screen overflow-hidden bg-background relative z-0">
        <TopBar />

        <div className="flex-1 overflow-y-auto custom-scrollbar p-container-padding space-y-6 relative">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-container/5 rounded-full blur-[120px] pointer-events-none -z-10" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-secondary-container/5 rounded-full blur-[100px] pointer-events-none -z-10" />

          <KpiCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AnalyticsChart />
            <MilestoneTracker />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ProjectTable />
            <RecentLeads />
          </div>

          <div className="h-6" />
        </div>
      </main>
    </>
  );
}
