import { redirect } from "next/navigation";
import { getAdminToken } from "@/lib/admin";
import DashboardPage from "./DashboardPage";

export default async function Page() {
  if (!(await getAdminToken())) redirect("/admin/login");

  return <DashboardPage />;
}
