import type { Metadata } from "next";
import { pageHasModulePermission } from "@/lib/auth/guards";
import AccessDenied from "@/components/corporate/AccessDenied";
import LeadershipManager from "@/components/corporate/LeadershipManager";

export const metadata: Metadata = { title: "Leadership Management" };

export default async function LeadershipManagementPage() {
  const allowed = await pageHasModulePermission("LEADERSHIP_MANAGEMENT");
  if (!allowed) return <AccessDenied />;
  return <LeadershipManager />;
}