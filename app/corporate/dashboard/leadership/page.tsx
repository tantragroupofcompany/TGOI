import type { Metadata } from "next";
import { pageHasModulePermission } from "@/lib/auth/guards";
import ModulePlaceholder from "@/components/corporate/ModulePlaceholder";
import AccessDenied from "@/components/corporate/AccessDenied";

export const metadata: Metadata = { title: "Leadership Management" };

export default async function LeadershipManagementPage() {
  const allowed = await pageHasModulePermission("LEADERSHIP_MANAGEMENT");
  if (!allowed) return <AccessDenied />;
  return (
    <ModulePlaceholder
      module="LEADERSHIP_MANAGEMENT"
      title="LEADERSHIP MANAGEMENT"
      description="Manage the leadership profiles shown on the public website — Founder, Chairman, and CEO & MD. Edit-and-save functionality arrives in Phase 4."
    />
  );
}