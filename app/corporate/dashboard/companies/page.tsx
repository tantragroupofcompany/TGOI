import type { Metadata } from "next";
import { pageHasModulePermission } from "@/lib/auth/guards";
import AccessDenied from "@/components/corporate/AccessDenied";
import CompanyManager from "@/components/corporate/CompanyManager";

export const metadata: Metadata = { title: "Company Management" };

export default async function CompanyManagementPage() {
  const allowed = await pageHasModulePermission("COMPANY_MANAGEMENT");
  if (!allowed) return <AccessDenied />;
  return <CompanyManager />;
}