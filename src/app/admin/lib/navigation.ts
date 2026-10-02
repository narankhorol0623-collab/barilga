export const adminNavItems = [
  { id: "dashboard", icon: "dashboard", label: "Хяналтын самбар" },
  { id: "projects", icon: "architecture", label: "Төслүүд" },
  { id: "inventory", icon: "inventory_2", label: "Борлуулалт ба үлдэгдэл" },
  { id: "content", icon: "edit_note", label: "Агуулгын удирдлага" },
  { id: "leads", icon: "group", label: "Хэрэглэгч ба хүсэлтүүд" },
  { id: "settings", icon: "settings", label: "Тохиргоо" },
] as const;

export type AdminSection = (typeof adminNavItems)[number]["id"];
