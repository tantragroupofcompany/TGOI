"use client";

import { useCallback, useEffect, useState } from "react";
import { Field, TextInput, TextArea, Select, Toggle, StatusBanner, LoadingState, EmptyState, FormButtons } from "@/components/corporate/manager-ui";
import ImageUpload from "@/components/corporate/ImageUpload";
import type { LeadershipRecord } from "@/lib/content/types";

interface FormState {
  roleKey: string;
  roleLabel: string;
  fullName: string;
  photo: string;
  photoAlt: string;
  shortIntro: string;
  biography: string;
  insightHeading: string;
  insightStatement: string;
  messageHeading: string;
  message: string;
  displayOrder: number;
  isActive: boolean;
}

const emptyForm: FormState = {
  roleKey: "FOUNDER",
  roleLabel: "FOUNDER",
  fullName: "",
  photo: "",
  photoAlt: "",
  shortIntro: "",
  biography: "",
  insightHeading: "Leadership Vision",
  insightStatement: "",
  messageHeading: "Leadership Message",
  message: "",
  displayOrder: 0,
  isActive: true,
};

const roleKeyOptions = ["FOUNDER", "CHAIRMAN", "CEO", "MD"];

export default function LeadershipManager() {
  const [records, setRecords] = useState<LeadershipRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/corporate/leadership", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) setRecords(data.data);
      else setError(data.error || "Failed to load leadership.");
    } catch {
      setError("Failed to load leadership.");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function formFromRecord(r: LeadershipRecord): FormState {
    return {
      roleKey: r.roleKey,
      roleLabel: r.roleLabel,
      fullName: r.fullName,
      photo: r.photo ?? "",
      photoAlt: r.photoAlt,
      shortIntro: r.shortIntro,
      biography: r.biography,
      insightHeading: r.insightHeading,
      insightStatement: r.insightStatement,
      messageHeading: r.messageHeading,
      message: r.message,
      displayOrder: r.displayOrder,
      isActive: r.isActive,
    };
  }

  function startEdit(r: LeadershipRecord) {
    setEditingId(r.id);
    setCreating(false);
    setConfirmDeleteId(null);
    setForm(formFromRecord(r));
    setSuccess(null);
    setError(null);
  }

  function startCreate() {
    setCreating(true);
    setEditingId(null);
    setConfirmDeleteId(null);
    setForm({ ...emptyForm, displayOrder: (records?.length ?? 0) * 10 });
    setSuccess(null);
    setError(null);
  }

  async function save() {
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const isCreate = creating;
      const url = isCreate ? "/api/corporate/leadership" : `/api/corporate/leadership/${editingId}`;
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
      setSuccess(isCreate ? "Leadership member created." : "Leadership member updated.");
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
      const res = await fetch(`/api/corporate/leadership/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Delete failed.");
        return;
      }
      setSuccess("Leadership member deleted.");
      setConfirmDeleteId(null);
      await load();
    } catch {
      setError("Delete failed.");
    } finally {
      setBusy(false);
    }
  }

  function cancel() {
    setCreating(false);
    setEditingId(null);
    setConfirmDeleteId(null);
    setError(null);
  }

  const update = (key: keyof FormState, value: string | number | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white">LEADERSHIP MANAGEMENT</h2>
          <p className="mt-1 text-sm text-slate-400">
            Founder, Chairman and CEO &amp; MD profiles shown on the public website.
          </p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-5 py-2.5 text-sm font-bold tracking-wide text-night-950 transition hover:bg-gold-400"
        >
          ADD LEADERSHIP MEMBER
        </button>
      </div>

      {error && <StatusBanner kind="error">{error}</StatusBanner>}
      {success && <StatusBanner kind="success">{success}</StatusBanner>}

      {creating || editingId ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void save();
          }}
          className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Role Key">
              <Select
                value={form.roleKey}
                onChange={(e) => {
                  update("roleKey", e.target.value);
                  update("roleLabel", e.target.value === "CEO" ? "CEO & MANAGING DIRECTOR" : e.target.value);
                }}
              >
                {roleKeyOptions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </Select>
            </Field>
            <Field label="Role Label (public display)">
              <TextInput value={form.roleLabel} onChange={(e) => update("roleLabel", e.target.value)} required />
            </Field>
          </div>

          <Field label="Full Name">
            <TextInput value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required />
          </Field>

          <Field label="Profile Photo">
            <ImageUpload value={form.photo} onChange={(url) => update("photo", url)} label="Upload photo" />
          </Field>

          <Field label="Photo Alt Text">
            <TextInput value={form.photoAlt} onChange={(e) => update("photoAlt", e.target.value)} placeholder="Describe the photo" />
          </Field>

          <Field label="Short Introduction (home page card)">
            <TextArea rows={2} value={form.shortIntro} onChange={(e) => update("shortIntro", e.target.value)} />
          </Field>

          <Field label="Full Biography">
            <TextArea rows={5} value={form.biography} onChange={(e) => update("biography", e.target.value)} />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Insight Heading">
              <TextInput value={form.insightHeading} onChange={(e) => update("insightHeading", e.target.value)} />
            </Field>
            <Field label="Message Heading">
              <TextInput value={form.messageHeading} onChange={(e) => update("messageHeading", e.target.value)} />
            </Field>
          </div>

          <Field label="Insight / Vision Statement">
            <TextArea rows={3} value={form.insightStatement} onChange={(e) => update("insightStatement", e.target.value)} />
          </Field>

          <Field label="Leadership Message">
            <TextArea rows={3} value={form.message} onChange={(e) => update("message", e.target.value)} />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Display Order">
              <TextInput
                type="number"
                value={form.displayOrder}
                onChange={(e) => update("displayOrder", Number(e.target.value) || 0)}
              />
            </Field>
            <div className="flex items-end gap-3 pb-1">
              <Toggle checked={form.isActive} onChange={(v) => update("isActive", v)} label="Active" />
              <span className="text-sm text-slate-400">{form.isActive ? "Active" : "Inactive"}</span>
            </div>
          </div>

          <FormButtons onCancel={cancel} busy={busy} />
        </form>
      ) : records === null ? (
        <LoadingState />
      ) : records.length === 0 ? (
        <EmptyState message="No leadership members yet. Add the first one." />
      ) : (
        <div className="space-y-3">
          {records.map((r) => (
            <div key={r.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gold-400">{r.roleLabel}</p>
                  <p className="mt-1 font-semibold text-white">{r.fullName}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {r.isActive ? "Active" : "Inactive"} · order {r.displayOrder}
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