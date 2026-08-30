"use client";

import { useState, useRef } from "react";

/**
 * Validated image upload control. Posts to the protected /api/corporate/uploads
 * endpoint (server-validates MIME/extension/size) and reports the returned
 * public URL through onChange. Used for leadership photos, company logos, and
 * brand assets.
 */
export default function ImageUpload({
  value,
  onChange,
  label = "Choose image",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setBusy(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/corporate/uploads", { method: "POST", body: formData });
      const data: { ok?: boolean; url?: string; error?: string } = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        setError(data.error || "Upload failed.");
        return;
      }
      onChange(data.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-night-900/60 p-4">
      <div className="flex items-center gap-4">
        {value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-12 w-12 rounded-md bg-slate-800 object-contain" />
        )}
        <div className="flex-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="rounded-md border border-white/15 px-4 py-2 text-xs font-bold tracking-wide text-slate-300 transition hover:border-gold-400 hover:text-gold-300 disabled:opacity-60"
          >
            {busy ? "UPLOADING…" : label}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="ml-3 text-xs font-semibold text-red-300 transition hover:text-red-200"
            >
              Remove
            </button>
          )}
          <p className="mt-2 text-[0.65rem] text-slate-500">
            PNG, JPEG, WebP or GIF · max 2 MB
          </p>
        </div>
      </div>
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
      {value && (
        <p className="mt-2 break-all text-xs text-slate-500">Current: {value}</p>
      )}
    </div>
  );
}