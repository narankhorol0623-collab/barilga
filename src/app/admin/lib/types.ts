export type ProjectStatus =
  | "Идэвхтэй борлуулалт"
  | "Урьдчилсан борлуулалт"
  | "Түр хойшлуулсан";

export interface Project {
  id: string;
  name: string;
  category: string;
  location: string;
  progress: number;
  status: ProjectStatus;
  thumbnail?: string;
}

export type MilestoneState = "active" | "planning" | "hold";

export interface Milestone {
  id: string;
  projectName: string;
  stage: string;
  state: MilestoneState;
  progress: number | null;
}

export type LeadStage = "Холбогдсон" | "Дахин холбогдох" | "Хаагдсан";

export interface Lead {
  id: string;
  name: string;
  contact: string;
  contactIcon: "call" | "mail";
  project: string;
  stage: LeadStage;
  timeAgo: string;
  isNew: boolean;
}

export interface KpiStat {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  icon: string;
  accent: "primary" | "secondary" | "primaryFixed" | "tertiary";
  trend: "up" | "flat";
  trendLabel: string;
}
