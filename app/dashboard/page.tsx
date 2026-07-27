import type { Metadata } from "next";
import { Workspace } from "@/components/workspace";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return <Workspace />;
}
