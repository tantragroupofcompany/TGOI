"use client";

import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

/** Small shared primitives for the corporate management forms. */

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClasses =
  "w-full rounded-md border border-slate-600 bg-night-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500/30";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClasses} ${props.className ?? ""}`} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClasses} resize-y ${props.className ?? ""}`} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClasses} ${props.className ?? ""}`} />;
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
        checked ? "bg-gold-500" : "bg-slate-600"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export function StatusBanner({
  kind,
  children,
}: {
  kind: "success" | "error";
  children: ReactNode;
}) {
  const styles =
    kind === "success"
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
      : "border-red-500/40 bg-red-500/10 text-red-300";
  return (
    <div role={kind === "error" ? "alert" : "status"} className={`rounded-md border px-4 py-3 text-sm ${styles}`}>
      {children}
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-10 text-slate-400">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 animate-spin">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
      </svg>
      Loading…
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/15 bg-night-900/60 px-6 py-10 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

export function FormButtons({
  onCancel,
  busy,
}: {
  onCancel?: () => void;
  busy?: boolean;
}) {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-6 py-2.5 text-sm font-bold tracking-wide text-night-950 transition hover:bg-gold-400 disabled:opacity-60"
      >
        {busy ? "SAVING…" : "SAVE CHANGES"}
      </button>
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-6 py-2.5 text-sm font-bold tracking-wide text-slate-300 transition hover:border-gold-400 hover:text-gold-300"
        >
          CANCEL
        </button>
      )}
    </div>
  );
}