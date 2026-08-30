import type { Metadata } from "next";
import { pageHasModulePermission } from "@/lib/auth/guards";
import ModulePlaceholder from "@/components/corporate/ModulePlaceholder";
import AccessDenied from "@/components/corporate/AccessDenied";

export const metadata: Metadata = { title: "Company Management" };

export default async function CompanyManagementPage() {
  const allowed = await pageHasModulePermission("COMPANY_MANAGEMENT");
  if (!allowed) return <AccessDenied />;
  return (
    <ModulePlaceholder
      module="COMPANY_MANAGEMENT"
      title="COMPANY MANAGEMENT"
      description="Add, edit, and manage the companies displayed publicly — including SHOPTANTRA, live website links, status, and featured placement. Edit-and-save functionality arrives in Phase 4."
    />
  );
}