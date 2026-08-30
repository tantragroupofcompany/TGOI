import type { Metadata } from "next";
import { pageHasModulePermission } from "@/lib/auth/guards";
import WebsiteManager from "@/components/corporate/WebsiteManager";
import AccessDenied from "@/components/corporate/AccessDenied";
import { listCompanies } from "@/lib/content/store";

export const metadata: Metadata = { title: "Website Links" };
export const dynamic = "force-dynamic";

export default async function WebsitesManagementPage() {
  const allowed = await pageHasModulePermission("WEBSITE_MANAGEMENT");
  if (!allowed) return <AccessDenied />;
  const companies = listCompanies().map((c) => ({ id: c.id, name: c.name }));
  return <WebsiteManager companies={companies} />;
}