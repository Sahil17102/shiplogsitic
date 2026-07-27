import type { Metadata } from "next";
import { Workspace } from "@/components/workspace";

export const metadata: Metadata = { title: "Admin console" };

export default function AdminPage() {
  return <Workspace admin />;
}
