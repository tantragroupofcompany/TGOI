import type { Metadata } from "next";
import { pageHasModulePermission } from "@/lib/auth/guards";
import ModulePlaceholder from "@/components/corporate/ModulePlaceholder";
import AccessDenied from "@/components/corporate/AccessDenied";

export const metadata: Metadata = { title: "Contact Management" };

export default async function ContactManagementPage() {
  const allowed = await pageHasModulePermission("CONTACT_MANAGEMENT");
  if (!allowed) return <AccessDenied />;
  return (
    <ModulePlaceholder
      module="CONTACT_MANAGEMENT"
      title="CONTACT MANAGEMENT"
      description="Manage the public contact details — email, phone, office address, and website. Keep verified corporate information current. Edit-and-save functionality arrives in Phase 4."
    />
  );
}