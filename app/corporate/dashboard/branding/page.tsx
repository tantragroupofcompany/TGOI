import type { Metadata } from "next";
import { pageHasModulePermission } from "@/lib/auth/guards";
import AccessDenied from "@/components/corporate/AccessDenied";
import BrandingManager from "@/components/corporate/BrandingManager";

export const metadata: Metadata = { title: "Branding Management" };

export default async function BrandingManagementPage() {
  const allowed = await pageHasModulePermission("BRANDING_MANAGEMENT");
  if (!allowed) return <AccessDenied />;
  return <BrandingManager />;
}