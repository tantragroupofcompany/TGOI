import type { Metadata } from "next";
import { pageHasModulePermission } from "@/lib/auth/guards";
import SettingsManager from "@/components/corporate/SettingsManager";
import AccessDenied from "@/components/corporate/AccessDenied";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsManagementPage() {
  const allowed = await pageHasModulePermission("SETTINGS");
  if (!allowed) return <AccessDenied />;
  return <SettingsManager />;
}