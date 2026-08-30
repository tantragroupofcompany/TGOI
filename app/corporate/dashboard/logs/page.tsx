import type { Metadata } from "next";
import { pageHasModulePermission } from "@/lib/auth/guards";
import ModulePlaceholder from "@/components/corporate/ModulePlaceholder";
import AccessDenied from "@/components/corporate/AccessDenied";

export const metadata: Metadata = { title: "Activity Logs" };

export default async function ActivityLogsPage() {
  const allowed = await pageHasModulePermission("ACTIVITY_LOGS");
  if (!allowed) return <AccessDenied />;
  return (
    <ModulePlaceholder
      module="ACTIVITY_LOGS"
      title="ACTIVITY LOGS"
      description="Security and management activity records. The secure logging foundation is active today; the full review UI arrives in Phase 4."
    />
  );
}