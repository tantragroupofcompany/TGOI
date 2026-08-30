"use client";

import { useCallback, useEffect, useState } from "react";
import { Field, TextInput, TextArea, Select, Toggle, StatusBanner, LoadingState, EmptyState, FormButtons } from "@/components/corporate/manager-ui";
import ImageUpload from "@/components/corporate/ImageUpload";
import type { CompanyRecord } from "@/lib/content/types";

interface FormState {
  name: string;
  logo: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  website: string;
  status: CompanyRecord["status"];
  founded: string;
  displayOrder: number;
  featured: boolean;
  isActive: boolean;
}

const emptyForm: FormState = {
  name: "",
  logo: "",
  shortDescription: "",
  fullDescription: "",
  category: "",
  website: "",
  status: "LIVE",
  founded: "",
  displayOrder: 0,
  featured: false,
  isActive: true,
};

const statusOptions = ["LIVE", "DEVELOPMENT", "COMING_SOON", "INACTIVE"] as const;

export default function CompanyManager() {
  const [records, setRecords] = useState<CompanyRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/corporate/companies", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) setRecords(data.data);
      else setError(data.error || "Failed to load companies.");
    } catch {
      setError("Failed to load companies.");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const formFromRecord = (r: CompanyRecord): FormState => ({
    name: r.name,
    logo: r.logo,
    shortDescription: r.shortDescription,
    fullDescription: r.fullDescription,
    category: r.category,
    website: r.website,
    status: r.status,
    founded: r.founded ?? "",
    displayOrder: r.displayOrder,
    featured: r.featured,
    isActive: r.isActive,
  });

  const startEdit = (r: CompanyRecord) => {
    setEditingId(r.id);
    setCreating(false);
    setConfirmDeleteId(null);
    setForm(formFromRecord(r));
    setSuccess(null);
    setError(null);
  };

  const startCreate = () => {
    setCreating(true);
    setEditingId(null);
    setConfirmDeleteId(null);
    setForm({ ...emptyForm, displayOrder: (records?.length ?? 0) * 10 });
    setSuccess(null);
    setError(null);
  };

  async function save() {
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const isCreate = creating;
      const url = isCreate ? "/api/corporate/companies" : `/api/corporate/companies/${editingId}`;
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
      setSuccess(isCreate ? "Company created." : "Company updated.");
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
      const res = await fetch(`/api/corporate/companies/${id}?confirm=true`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Delete failed.");
        return;
      }
      setSuccess("Company deleted.");
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
          <h2 className="text-xl font-extrabold text-white">COMPANY MANAGEMENT</h2>
          <p className="mt-1 text-sm text-slate-400">
            Companies, brands and ventures displayed on the public website.
          </p>
        </div>
        <button type="button" onClick={startCreate} className="rounded-md bg-gold-500 px-5 py-2.5 text-sm font-bold tracking-wide text-night-950 transition hover:bg-gold-400">
          ADD COMPANY
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
            <Field label="Company Name">
              <TextInput value={form.name} onChange={(e) => update("name", e.target.value)} required />
            </Field>
            <Field label="Category">
              <TextInput value={form.category} onChange={(e) => update("category", e.target.value)} placeholder="e.g. Multi-Vendor E-Commerce Marketplace" />
            </Field>
          </div>

          <Field label="Company Logo">
            <ImageUpload value={form.logo} onChange={(url) => update("logo", url)} label="Upload logo" />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Website URL">
              <TextInput type="url" value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="https://…" />
            </Field>
            <Field label="Status">
              <Select value={form.status} onChange={(e) => update("status", e.target.value)}>
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Short Description (public cards)">
            <TextArea rows={3} value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} />
          </Field>

          <Field label="Full Description">
            <TextArea rows={4} value={form.fullDescription} onChange={(e) => update("fullDescription", e.target.value)} />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Founded Date">
              <TextInput value={form.founded} onChange={(e) => update("founded", e.target.value)} placeholder="e.g. 2026" />
            </Field>
            <Field label="Display Order">
              <TextInput type="number" value={form.displayOrder} onChange={(e) => update("displayOrder", Number(e.target.value) || 0)} />
            </Field>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <Toggle checked={form.featured} onChange={(v) => update("featured", v)} label="Featured" />
              <span className="text-sm text-slate-400">Featured</span>
            </div>
            <div className="flex items-center gap-3">
              <Toggle checked={form.isActive} onChange={(v) => update("isActive", v)} label="Active" />
              <span className="text-sm text-slate-400">Active (public visibility)</span>
            </div>
          </div>

          <FormButtons onCancel={cancel} busy={busy} />
        </form>
      ) : records === null ? (
        <LoadingState />
      ) : list.length === 0 ? (
        <EmptyState message="No companies yet. Add the first company." />
      ) : (
        <div className="space-y-3">
          {list.map((r) => (
            <div key={r.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-white">{r.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {r.category || "No category"} · <span className="text-gold-300">{r.status}</span> · {r.isActive ? "Active" : "Inactive"} · {r.featured ? "Featured" : "Standard"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" onClick={() => startEdit(r)} className="rounded-md border border-white/15 px-4 py-2 text-xs font-bold tracking-wide text-slate-300 transition hover:border-gold-400 hover:text-gold-300">
                    EDIT
                  </button>
                  {confirmDeleteId === r.id ? (
                    <>
                      <button type="button" onClick={() => void remove(r.id)} disabled={busy} className="rounded-md bg-red-500 px-4 py-2 text-xs font-bold tracking-wide text-white transition hover:bg-red-400">
                        CONFIRM DELETE
                      </button>
                      <button type="button" onClick={() => setConfirmDeleteId(null)} className="rounded-md border border-white/15 px-4 py-2 text-xs font-bold tracking-wide text-slate-400">
                        CANCEL
                      </button>
                    </>
                  ) : (
                    <button type="button" onClick={() => setConfirmDeleteId(r.id)} className="rounded-md border border-red-500/40 px-4 py-2 text-xs font-bold tracking-wide text-red-300 transition hover:border-red-400 hover:text-red-200">
                      DELETE
                    </button>
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