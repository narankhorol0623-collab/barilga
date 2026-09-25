import { redirect } from "next/navigation";

export default function BlockPage() {
  redirect("/master-plan?block=n1");
}
