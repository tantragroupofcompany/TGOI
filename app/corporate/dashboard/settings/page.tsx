import type { Metadata } from "next";
import { pageHasModulePermission } from "@/lib/auth/guards";
import ModulePlaceholder from "@/components/corporate/ModulePlaceholder";
import AccessDenied from "@/components/corporate/AccessDenied";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsManagementPage() {
  const allowed = await pageHasModulePermission("SETTINGS");
  if (!allowed) return <AccessDenied />;
  return (
    <ModulePlaceholder
      module="SETTINGS"
      title="SETTINGS"
      description="Corporate management settings — account preferences, session policy, and future configuration. Edit-and-save functionality arrives in Phase 4."
    />
  );
}