"use client";

import { useCallback, useEffect, useState } from "react";
import { Field, TextInput, Select, Toggle, StatusBanner, LoadingState, EmptyState, FormButtons } from "@/components/corporate/manager-ui";
import type { WebsiteLinkRecord } from "@/lib/content/types";

interface FormState {
  companyId: string;
  url: string;
  label: string;
  displayOrder: number;
  isActive: boolean;
}

const emptyForm: FormState = { companyId: "", url: "", label: "", displayOrder: 0, isActive: true };

export default function WebsiteManager({
  companies,
}: {
  companies: { id: string; name: string }[];
}) {
  const [records, setRecords] = useState<WebsiteLinkRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/corporate/websites", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) setRecords(data.data);
      else setError(data.error || "Failed to load website links.");
    } catch {
      setError("Failed to load website links.");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function startEdit(r: WebsiteLinkRecord) {
    setEditingId(r.id);
    setCreating(false);
    setConfirmDeleteId(null);
    setForm({
      companyId: r.companyId ?? "",
      url: r.url,
      label: r.label,
      displayOrder: r.displayOrder,
      isActive: r.isActive,
    });
  }

  async function save() {
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const isCreate = creating;
      const url = isCreate ? "/api/corporate/websites" : `/api/corporate/websites/${editingId}`;
      const res = await fetch(url, {
        method: isCreate ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Save failed.");
        return;
      }
      setSuccess(isCreate ? "Website link created." : "Website link updated.");
      setCreating(false);
      setEditingId(null);
      await load();
    } catch {
      setError("Save failed.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/corporate/websites/${id}?confirm=true`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Delete failed.");
        return;
      }
      setSuccess("Website link deleted.");
      setConfirmDeleteId(null);
      await load();
    } catch {
      setError("Delete failed.");
    } finally {
      setBusy(false);
    }
  }

  const cancel = () => {
    setCreating(false);
    setEditingId(null);
    setConfirmDeleteId(null);
    setError(null);
  };

  const update = (key: keyof FormState, value: string | number | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const list = records ?? [];
  const formOpen = creating || editingId !== null;
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white">WEBSITE LINK MANAGEMENT</h2>
          <p className="mt-1 text-sm text-slate-400">
            Live business website links shown across the public site.
          </p>
        </div>
        <button
          type="button"
          onClick={() => { setCreating(true); setEditingId(null); setConfirmDeleteId(null); setForm({ ...emptyForm, displayOrder: list.length * 10 }); }}
          className="rounded-md bg-gold-500 px-5 py-2.5 text-sm font-bold tracking-wide text-night-950 transition hover:bg-gold-400"
        >
          ADD LINK
        </button>
      </div>

      {error && <StatusBanner kind="error">{error}</StatusBanner>}
      {success && <StatusBanner kind="success">{success}</StatusBanner>}

      {formOpen ? (
        <form
          onSubmit={(e) => { e.preventDefault(); void save(); }}
          className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Company">
              <Select value={form.companyId} onChange={(e) => update("companyId", e.target.value)}>
                <option value="">— Not linked to a company —</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </Select>
            </Field>
            <Field label="Link Label">
              <TextInput value={form.label} onChange={(e) => update("label", e.target.value)} placeholder="VISIT SHOPTANTRA" required />
            </Field>
          </div>

          <Field label="Website URL">
            <TextInput type="url" value={form.url} onChange={(e) => update("url", e.target.value)} placeholder="https://…" required />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Display Order">
              <TextInput type="number" value={form.displayOrder} onChange={(e) => update("displayOrder", Number(e.target.value) || 0)} />
            </Field>
            <div className="flex items-end gap-3 pb-1">
              <Toggle checked={form.isActive} onChange={(v) => update("isActive", v)} label="Active" />
              <span className="text-sm text-slate-400">Active (public visibility)</span>
            </div>
          </div>

          <FormButtons onCancel={cancel} busy={busy} />
        </form>
      ) : records === null ? (
        <LoadingState />
      ) : list.length === 0 ? (
        <EmptyState message="No website links yet. Add the first link." />
      ) : (
        <div className="space-y-3">
          {list.map((r) => (
            <div key={r.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-white">{r.label}</p>
                  <p className="mt-1 break-all text-xs text-slate-500">{r.url} · {r.isActive ? "Active" : "Inactive"}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" onClick={() => startEdit(r)} className="rounded-md border border-white/15 px-4 py-2 text-xs font-bold tracking-wide text-slate-300 transition hover:border-gold-400 hover:text-gold-300">EDIT</button>
                  {confirmDeleteId === r.id ? (
                    <>
                      <button type="button" onClick={() => void remove(r.id)} disabled={busy} className="rounded-md bg-red-500 px-4 py-2 text-xs font-bold tracking-wide text-white transition hover:bg-red-400">CONFIRM DELETE</button>
                      <button type="button" onClick={() => setConfirmDeleteId(null)} className="rounded-md border border-white/15 px-4 py-2 text-xs font-bold tracking-wide text-slate-400">CANCEL</button>
                    </>
                  ) : (
                    <button type="button" onClick={() => setConfirmDeleteId(r.id)} className="rounded-md border border-red-500/40 px-4 py-2 text-xs font-bold tracking-wide text-red-300 transition hover:border-red-400 hover:text-red-200">DELETE</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}