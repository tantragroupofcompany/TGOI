import type { Metadata } from "next";
import { pageHasModulePermission } from "@/lib/auth/guards";
import ActivityLogTable from "@/components/corporate/ActivityLogTable";
import AccessDenied from "@/components/corporate/AccessDenied";

export const metadata: Metadata = { title: "Activity Logs" };

export default async function ActivityLogsPage() {
  const allowed = await pageHasModulePermission("ACTIVITY_LOGS");
  if (!allowed) return <AccessDenied />;
  return <ActivityLogTable />;
}