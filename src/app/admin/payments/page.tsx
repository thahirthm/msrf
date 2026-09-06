"use client";

import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default AdminPayments;
            }}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-accent hover:text-accent"
          >
            Sign out
          </button>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                tab === item.key
                  ? "bg-accent text-accent-foreground"
                  : "border border-border text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-10 overflow-x-auto rounded-3xl border border-border bg-card">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Parent mobile</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Paid on</th>
                <th className="px-5 py-4">Transaction ID</th>
                <th className="px-5 py-4">Submitted</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.isLoading ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-muted-foreground">
                    Loading submissions…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-muted-foreground">
                    No submissions in this list.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id} className="border-b border-border/60 last:border-0">
                    <td className="px-5 py-4 font-semibold">{row.student_name}</td>
                    <td className="px-5 py-4 text-muted-foreground">+91 {row.parent_mobile}</td>
                    <td className="px-5 py-4">{inr(Number(row.amount))}</td>
                    <td className="px-5 py-4 text-muted-foreground">{dateFmt(row.payment_date)}</td>
                    <td className="px-5 py-4 text-muted-foreground">{row.transaction_id ?? "—"}</td>
                    <td className="px-5 py-4 text-muted-foreground">{dateFmt(row.created_at)}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] ${
                          row.status === "verified"
                            ? "bg-accent/15 text-accent"
                            : row.status === "rejected"
                              ? "bg-destructive/15 text-destructive"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {row.status === "pending" ? "Pending verification" : row.status}
                      </span>
                      {row.rejection_reason ? (
                        <p className="mt-2 max-w-[220px] text-xs text-muted-foreground">{row.rejection_reason}</p>
                      ) : null}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => openScreenshot(row.screenshot_path)}
                          className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:border-accent hover:text-accent"
                        >
                          View screenshot
                        </button>
                        {row.status !== "verified" ? (
                          <button
                            disabled={busyId === row.id}
                            onClick={() => verify(row)}
                            className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground disabled:opacity-60"
                          >
                            Verify
                          </button>
                        ) : null}
                        {row.status !== "rejected" ? (
                          <button
                            disabled={busyId === row.id}
                            onClick={() => {
                              setRejecting(row);
                              setReason("");
                            }}
                            className="rounded-full border border-destructive px-3 py-1.5 text-xs font-semibold text-destructive disabled:opacity-60"
                          >
                            Reject
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={Boolean(viewUrl)} onOpenChange={(open) => !open && setViewUrl(null)}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle>Payment screenshot</DialogTitle>
          </DialogHeader>
          {viewUrl ? (
            <img src={viewUrl} alt="Payment screenshot" className="max-h-[70vh] w-full rounded-2xl object-contain" />
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(rejecting)} onOpenChange={(open) => !open && setRejecting(null)}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle>Reject submission</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Tell the team why {rejecting?.student_name}'s payment proof was rejected.
          </p>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            maxLength={300}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
            placeholder="Reason for rejection"
          />
          <button
            onClick={reject}
            disabled={busyId === rejecting?.id}
            className="mt-2 w-full rounded-full bg-destructive px-6 py-3 text-sm font-semibold text-destructive-foreground disabled:opacity-60"
          >
            Confirm rejection
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
