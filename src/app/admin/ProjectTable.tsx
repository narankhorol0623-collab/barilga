"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "./lib/data";
import type { Project, ProjectStatus } from "./lib/types";

type Filter = "Бүгд" | "Борлуулагдаж буй" | "Төлөвлөгдсөн";

const statusBadge: Record<ProjectStatus, string> = {
  "Идэвхтэй борлуулалт":
    "bg-primary-container/10 text-primary-container border-primary-container/30",
  "Урьдчилсан борлуулалт":
    "bg-surface-variant text-on-surface border-outline-variant",
  "Түр хойшлуулсан":
    "bg-error-container/20 text-error border-error-container/50",
};

const progressBarColor: Record<ProjectStatus, string> = {
  "Идэвхтэй борлуулалт":
    "bg-primary-container shadow-[0_0_4px_rgba(0,245,212,0.5)]",
  "Урьдчилсан борлуулалт": "bg-on-surface-variant",
  "Түр хойшлуулсан": "bg-error",
};

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="hover:bg-[#1E2D50]/50 transition-colors group"
    >
      <td className="py-3 sm:py-4 px-3 sm:px-5">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-[180px] sm:min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded overflow-hidden border border-outline-variant bg-surface-variant flex items-center justify-center shrink-0">
            {project.thumbnail ? (
              <img
                alt={`${project.name} зургийн өнгөц харагдац`}
                className="w-full h-full object-cover"
                src={project.thumbnail}
              />
            ) : (
              <span className="material-symbols-outlined text-on-surface-variant text-sm sm:text-base">
                domain
              </span>
            )}
          </div>
          <div className="truncate">
            <p className="font-bold text-xs sm:text-base text-on-surface truncate">
              {project.name}
            </p>
            <p className="text-[10px] sm:text-xs text-on-surface-variant font-label-sm truncate">
              {project.category}
            </p>
          </div>
        </div>
      </td>
      <td className="py-3 sm:py-4 px-3 sm:px-5 text-xs sm:text-body-md text-on-surface-variant whitespace-nowrap">
        {project.location}
      </td>
      <td className="py-3 sm:py-4 px-3 sm:px-5 whitespace-nowrap min-w-[120px] sm:min-w-0">
        <div className="flex items-center gap-2">
          <div className="w-12 sm:w-16 h-1 bg-surface-variant rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${progressBarColor[project.status]}`}
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{
                duration: 0.8,
                delay: 0.15 + index * 0.08,
                ease: "easeOut",
              }}
            />
          </div>
          <span
            className={`text-[10px] sm:text-xs font-label-sm ${
              project.status === "Түр хойшлуулсан"
                ? "text-error"
                : "text-primary-container"
            }`}
          >
            {project.progress}%
          </span>
        </div>
      </td>
      <td className="py-3 sm:py-4 px-3 sm:px-5 whitespace-nowrap">
        <span
          className={`px-1.5 sm:px-2 py-0.5 sm:py-1 border rounded font-label-sm text-[10px] sm:text-label-sm ${statusBadge[project.status]}`}
        >
          {project.status}
        </span>
      </td>
      <td className="py-3 sm:py-4 px-3 sm:px-5 text-right whitespace-nowrap">
        <button className="p-1 sm:p-1.5 text-on-surface-variant hover:text-primary-container transition-colors rounded hover:bg-surface-variant">
          <span className="material-symbols-outlined text-xs sm:text-sm">
            edit
          </span>
        </button>
      </td>
    </motion.tr>
  );
}

export default function ProjectTable() {
  const [filter, setFilter] = useState<Filter>("Бүгд");
  const filteredProjects = projects.filter((project) => {
    if (filter === "Борлуулагдаж буй") {
      return project.status === "Идэвхтэй борлуулалт";
    }
    if (filter === "Төлөвлөгдсөн") {
      return project.status === "Урьдчилсан борлуулалт";
    }
    return true;
  });

  return (
    <div className="lg:col-span-2 glass-card flex flex-col overflow-hidden w-full">
      <div className="p-4 sm:p-5 border-b border-outline-variant flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 bg-surface-container-low/50">
        <h2 className="font-headline-sm text-base sm:text-headline-sm font-semibold text-on-surface">
          Төслийн төлөв
        </h2>
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
          {(["Бүгд", "Борлуулагдаж буй", "Төлөвлөгдсөн"] as Filter[]).map(
            (option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-2.5 sm:px-3 py-1 rounded font-label-sm text-xs sm:text-label-sm whitespace-nowrap transition-colors ${
                  filter === option
                    ? "bg-surface-container text-primary-container border border-outline-variant border-b-2 border-b-primary-container"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {option}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-full">
          <thead>
            <tr className="bg-surface-container-lowest/80 border-b border-outline-variant text-on-surface-variant font-label-sm text-[10px] sm:text-label-sm uppercase tracking-wider">
              <th className="py-2.5 sm:py-3 px-3 sm:px-5 font-medium">Төсөл</th>
              <th className="py-2.5 sm:py-3 px-3 sm:px-5 font-medium">
                Байршил
              </th>
              <th className="py-2.5 sm:py-3 px-3 sm:px-5 font-medium">Явц</th>
              <th className="py-2.5 sm:py-3 px-3 sm:px-5 font-medium">Төлөв</th>
              <th className="py-2.5 sm:py-3 px-3 sm:px-5 font-medium text-right">
                Үйлдэл
              </th>
            </tr>
          </thead>
          <tbody className="font-body-md text-body-md divide-y divide-outline-variant/50">
            {filteredProjects.map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-3 border-t border-outline-variant flex justify-center bg-surface-container-lowest/30">
        <button className="text-xs font-label-sm text-primary-container hover:text-primary transition-colors flex items-center gap-1">
          Бүх төслийг харах{" "}
          <span className="material-symbols-outlined text-[14px]">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}
