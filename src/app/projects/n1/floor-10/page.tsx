import { redirect } from "next/navigation";

export default function FloorPage() {
  redirect("/master-plan?block=n1&floor=10");
}
