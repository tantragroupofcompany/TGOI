import type { Metadata } from "next";
import { pageHasModulePermission } from "@/lib/auth/guards";
import AccessDenied from "@/components/corporate/AccessDenied";
import ContactManager from "@/components/corporate/ContactManager";

export const metadata: Metadata = { title: "Contact Management" };

export default async function ContactManagementPage() {
  const allowed = await pageHasModulePermission("CONTACT_MANAGEMENT");
  if (!allowed) return <AccessDenied />;
  return <ContactManager />;
}