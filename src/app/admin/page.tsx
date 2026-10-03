import { redirect } from "next/navigation";
import { getAdminToken } from "@/lib/admin";
import DashboardPage from "./DashboardPage";

export default async function Page() {
  let token: string | null = null;
  try {
    token = await getAdminToken();
  } catch {
    // Deny access when the authentication service is unavailable.
  }
  if (!token) redirect("/admin/login");
  return <DashboardPage />;
}
