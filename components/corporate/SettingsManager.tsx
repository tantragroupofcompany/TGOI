"use client";

import { useCallback, useEffect, useState } from "react";
import { Field, TextInput, TextArea, Select, StatusBanner, LoadingState, FormButtons } from "@/components/corporate/manager-ui";
import type { SettingsRecord } from "@/lib/content/types";

/**
 * Settings management (Founder only via RBAC).
 *
 * Only controlled content settings are exposed here. Security secrets
 * (database passwords, session secrets, API keys, access codes) can never be
 * read, edited, or exposed through this form.
 */
export default function SettingsManager() {
  const [record, setRecord] = useState<SettingsRecord | null>(null);
  const [form, setForm] = useState<SettingsRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/corporate/settings", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) {
        setRecord(data.data);
        setForm(data.data);
      } else {
        setError(data.error || "Failed to load settings.");
      }
    } catch {
      setError("Failed to load settings.");
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
      const res = await fetch("/api/corporate/settings", {
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
      setSuccess("Settings saved.");
    } catch {
      setError("Save failed.");
    } finally {
      setBusy(false);
    }
  }

  if (form === null) return <LoadingState />;

  const update = (key: keyof SettingsRecord, value: string) =>
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-white">SETTINGS</h2>
        <p className="mt-1 text-sm text-slate-400">
          Controlled company settings (Founder access only).
        </p>
      </div>

      {error && <StatusBanner kind="error">{error}</StatusBanner>}
      {success && <StatusBanner kind="success">{success}</StatusBanner>}

      <form
        onSubmit={(e) => { e.preventDefault(); void save(); }}
        className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Website Name">
            <TextInput value={form.websiteName} onChange={(e) => update("websiteName", e.target.value)} required />
          </Field>
          <Field label="Company Tagline">
            <TextInput value={form.tagline} onChange={(e) => update("tagline", e.target.value)} />
          </Field>
        </div>

        <Field label="Default Website Information (hero intro)">
          <TextArea rows={3} value={form.defaultInfo} onChange={(e) => update("defaultInfo", e.target.value)} />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Public Visibility">
            <Select value={form.publicVisibility} onChange={(e) => update("publicVisibility", e.target.value)}>
              <option value="public">Public</option>
              <option value="draft">Draft mode</option>
            </Select>
          </Field>
          <Field label="Content Display">
            <Select value={form.contentDisplay} onChange={(e) => update("contentDisplay", e.target.value)}>
              <option value="standard">Standard</option>
              <option value="minimal">Minimal</option>
            </Select>
          </Field>
        </div>

        <FormButtons onCancel={() => setForm(record)} busy={busy} />
      </form>

      <p className="rounded-lg border border-white/10 bg-night-900/60 px-4 py-3 text-xs leading-relaxed text-slate-500">
        Security configuration (database passwords, session secrets, API keys,
        GitHub tokens, payment credentials, and the corporate access code)
        cannot be changed here and is never exposed to any corporate form.
      </p>
    </div>
  );
}