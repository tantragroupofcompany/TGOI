import type { Metadata } from "next";
import { pageHasModulePermission } from "@/lib/auth/guards";
import ModulePlaceholder from "@/components/corporate/ModulePlaceholder";
import AccessDenied from "@/components/corporate/AccessDenied";

export const metadata: Metadata = { title: "Branding Management" };

export default async function BrandingManagementPage() {
  const allowed = await pageHasModulePermission("BRANDING_MANAGEMENT");
  if (!allowed) return <AccessDenied />;
  return (
    <ModulePlaceholder
      module="BRANDING_MANAGEMENT"
      title="BRANDING & LOGO MANAGEMENT"
      description="Manage the TGOI brand identity — logos, taglines, and public-facing branding assets. Edit-and-save functionality arrives in Phase 4."
    />
  );
}