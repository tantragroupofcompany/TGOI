"use client";

import { useCallback, useEffect, useState } from "react";
import { Field, TextInput, StatusBanner, LoadingState, FormButtons } from "@/components/corporate/manager-ui";
import ImageUpload from "@/components/corporate/ImageUpload";
import type { BrandingRecord } from "@/lib/content/types";

/**
 * Branding management. Logo/favicon uploads are server-validated; once saved,
 * the Navbar, Footer, and metadata pick the values up automatically.
 */
export default function BrandingManager() {
  const [record, setRecord] = useState<BrandingRecord | null>(null);
  const [form, setForm] = useState<BrandingRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/corporate/branding", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) {
        setRecord(data.data);
        setForm(data.data);
      } else {
        setError(data.error || "Failed to load branding.");
      }
    } catch {
      setError("Failed to load branding.");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/corporate/branding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Save failed.");
        return;
      }
      setRecord(data.data);
      setForm(data.data);
      setSuccess("Branding saved. The website navbar, footer and title now use the new values.");
    } catch {
      setError("Save failed.");
    } finally {
      setBusy(false);
    }
  }

  if (form === null) return <LoadingState />;

  const update = (key: keyof BrandingRecord, value: string) =>
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-white">BRANDING &amp; LOGO MANAGEMENT</h2>
        <p className="mt-1 text-sm text-slate-400">
          Parent company identity applied across the public website.
        </p>
      </div>

      {error && <StatusBanner kind="error">{error}</StatusBanner>}
      {success && <StatusBanner kind="success">{success}</StatusBanner>}

      <form
        onSubmit={(e) => { e.preventDefault(); void save(); }}
        className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Company Name">
            <TextInput value={form.companyName} onChange={(e) => update("companyName", e.target.value)} required />
          </Field>
          <Field label="Short Name">
            <TextInput value={form.shortName} onChange={(e) => update("shortName", e.target.value)} required />
          </Field>
        </div>

        <Field label="Tagline">
          <TextInput value={form.tagline} onChange={(e) => update("tagline", e.target.value)} />
        </Field>

        <Field label="Parent Company Logo">
          <ImageUpload value={form.logoPath} onChange={(url) => update("logoPath", url)} label="Upload logo" />
        </Field>

        <Field label="Website Favicon">
          <ImageUpload value={form.faviconPath} onChange={(url) => update("faviconPath", url)} label="Upload favicon" />
        </Field>

        <FormButtons busy={busy} />
      </form>

      {record && (
        <p className="text-xs text-slate-500">
          Last updated: {new Date(record.updatedAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}