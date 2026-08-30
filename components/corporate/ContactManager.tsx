"use client";

import { useCallback, useEffect, useState } from "react";
import { Field, TextInput, TextArea, StatusBanner, LoadingState, FormButtons } from "@/components/corporate/manager-ui";
import type { ContactRecord } from "@/lib/content/types";

/**
 * Contact management — validates via the server API (email, phone, URLs).
 * Social platform links are optional and only shown publicly when set.
 */
export default function ContactManager() {
  const [record, setRecord] = useState<ContactRecord | null>(null);
  const [form, setForm] = useState<ContactRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/corporate/contact", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) {
        setRecord(data.data);
        setForm(data.data);
      } else {
        setError(data.error || "Failed to load contact details.");
      }
    } catch {
      setError("Failed to load contact details.");
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
      const res = await fetch("/api/corporate/contact", {
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
      setSuccess("Contact details updated. The public website now shows the new information.");
    } catch {
      setError("Save failed.");
    } finally {
      setBusy(false);
    }
  }

  if (form === null) return <LoadingState />;

  const update = (key: keyof ContactRecord, value: string) =>
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-white">CONTACT MANAGEMENT</h2>
        <p className="mt-1 text-sm text-slate-400">
          Public contact details shown on /contact and the home page.
        </p>
      </div>

      {error && <StatusBanner kind="error">{error}</StatusBanner>}
      {success && <StatusBanner kind="success">{success}</StatusBanner>}

      <form
        onSubmit={(e) => { e.preventDefault(); void save(); }}
        className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Company Email">
            <TextInput type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="info@tantragroup.com" />
          </Field>
          <Field label="Phone Number">
            <TextInput value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 …" />
          </Field>
        </div>

        <Field label="Office Address">
          <TextArea rows={2} value={form.address} onChange={(e) => update("address", e.target.value)} />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Website">
            <TextInput type="url" value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="https://…" />
          </Field>
          <Field label="Office Hours">
            <TextInput value={form.officeHours} onChange={(e) => update("officeHours", e.target.value)} placeholder="e.g. Mon–Fri, 9 AM – 6 PM IST" />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Instagram URL (optional)">
            <TextInput value={form.instagram} onChange={(e) => update("instagram", e.target.value)} placeholder="https://instagram.com/…" />
          </Field>
          <Field label="Facebook URL (optional)">
            <TextInput value={form.facebook} onChange={(e) => update("facebook", e.target.value)} placeholder="https://facebook.com/…" />
          </Field>
          <Field label="LinkedIn URL (optional)">
            <TextInput value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)} placeholder="https://linkedin.com/…" />
          </Field>
          <Field label="YouTube URL (optional)">
            <TextInput value={form.youtube} onChange={(e) => update("youtube", e.target.value)} placeholder="https://youtube.com/…" />
          </Field>
        </div>

        <Field label="Public Notice">
          <TextArea rows={2} value={form.notice} onChange={(e) => update("notice", e.target.value)} />
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