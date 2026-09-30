"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { salesTrend } from "./lib/data";

type Range = "Долоо хоног" | "Сар";

export default function AnalyticsChart() {
  const [range, setRange] = useState<Range>("Сар");

  return (
    <div className="lg:col-span-2 glass-card p-4 sm:p-5 flex flex-col w-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="font-headline-sm text-base sm:text-headline-sm font-semibold text-on-surface">
          Борлуулалт ба явцын шинжилгээ
        </h2>
        <div className="flex gap-2 self-start sm:self-auto">
          {(["Долоо хоног", "Сар"] as Range[]).map((option) => (
            <button
              key={option}
              onClick={() => setRange(option)}
              className={`px-3 py-1 rounded font-label-sm text-xs sm:text-label-sm border transition-colors ${
                range === option
                  ? "bg-primary-container/10 text-primary-container border-primary-container/30"
                  : "bg-surface-container text-on-surface border-outline-variant hover:bg-surface-variant"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[220px] sm:min-h-[300px] relative w-full rounded border border-outline-variant/30 bg-surface-container-lowest/50 flex items-center justify-center overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-primary-container/10 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none opacity-20">
          <div className="w-full h-px border-t border-dashed border-outline-variant" />
          <div className="w-full h-px border-t border-dashed border-outline-variant" />
          <div className="w-full h-px border-t border-dashed border-outline-variant" />
          <div className="w-full h-px border-t border-dashed border-outline-variant" />
        </div>

        <svg
          className="w-full h-full absolute inset-0"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <motion.path
            className="drop-shadow-[0_0_8px_rgba(0,245,212,0.5)]"
            d="M 0 80 Q 20 70, 40 40 T 70 30 T 100 10"
            fill="none"
            stroke="#00F5D4"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          {[
            { cx: 40, cy: 40 },
            { cx: 70, cy: 30 },
            { cx: 100, cy: 10 },
          ].map((point, i) => (
            <motion.circle
              key={`${point.cx}-${point.cy}`}
              cx={point.cx}
              cy={point.cy}
              fill="#011134"
              r="1.5"
              stroke="#00F5D4"
              strokeWidth="0.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.9 + i * 0.15 }}
            />
          ))}
        </svg>

        {salesTrend.map((point, i) => {
          const position =
            i === 0
              ? "left-2 sm:left-4"
              : i === salesTrend.length - 1
                ? "right-2 sm:right-4"
                : "left-1/2 -translate-x-1/2";
          return (
            <div
              key={point.label}
              className={`absolute bottom-2 ${position} text-[10px] sm:text-xs text-on-surface-variant font-label-sm truncate max-w-[80px] sm:max-w-none`}
            >
              {point.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
