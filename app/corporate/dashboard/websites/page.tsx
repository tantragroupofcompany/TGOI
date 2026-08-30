import type { Metadata } from "next";
import { pageHasModulePermission } from "@/lib/auth/guards";
import ModulePlaceholder from "@/components/corporate/ModulePlaceholder";
import AccessDenied from "@/components/corporate/AccessDenied";

export const metadata: Metadata = { title: "Website Links" };

export default async function WebsitesManagementPage() {
  const allowed = await pageHasModulePermission("WEBSITE_MANAGEMENT");
  if (!allowed) return <AccessDenied />;
  return (
    <ModulePlaceholder
      module="WEBSITE_MANAGEMENT"
      title="WEBSITE LINKS"
      description="Manage live business website links used across the public site, such as the SHOPTANTRA link, navigation, and footer. Edit-and-save functionality arrives in Phase 4."
    />
  );
}