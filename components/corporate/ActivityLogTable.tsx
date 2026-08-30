"use client";

import { useCallback, useEffect, useState } from "react";
import { LoadingState, EmptyState, StatusBanner } from "@/components/corporate/manager-ui";
import type { ActivityEntry } from "@/lib/security/activity-log";

/**
 * Activity log table. Shows user, role, action, module, target, timestamp and
 * status — the log never contains passwords, hashes, access codes or secrets.
 */
export default function ActivityLogTable() {
  const [entries, setEntries] = useState<ActivityEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/corporate/logs", { cache: "no-store" });
      const data = await res.json();
      if (res.ok) setEntries(data.data);
      else setError(data.error || "Failed to load activity log.");
    } catch {
      setError("Failed to load activity log.");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (error) return <StatusBanner kind="error">{error}</StatusBanner>;
  if (entries === null) return <LoadingState />;
  if (entries.length === 0) return <EmptyState message="No recorded activity yet." />;

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-[0.65rem] uppercase tracking-widest text-slate-400">
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Module</th>
              <th className="px-4 py-3">Target</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {entries.map((e) => (
              <tr key={e.id}>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
                  {new Date(e.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-medium text-white">{e.userName ?? "—"}</td>
                <td className="px-4 py-3 text-xs">{e.role ?? "—"}</td>
                <td className="px-4 py-3 text-xs font-semibold text-gold-300">{e.action}</td>
                <td className="px-4 py-3 text-xs">{e.module ?? "—"}</td>
                <td className="max-w-[220px] truncate px-4 py-3 text-xs">{e.target ?? "—"}</td>
                <td className="px-4 py-3 text-xs">
                  <span
                    className={`rounded-full px-2 py-0.5 font-bold uppercase tracking-wide ${
                      e.status === "success"
                        ? "bg-emerald-500/10 text-emerald-300"
                        : e.status === "failed"
                          ? "bg-red-500/10 text-red-300"
                          : "bg-slate-500/10 text-slate-400"
                    }`}
                  >
                    {e.status ?? "—"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}