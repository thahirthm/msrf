"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/jpg", "image/png"];

const schema = z.object({
  studentName: z.string().trim().min(2, "Enter the student's full name").max(120, "Name is too long"),
  parentMobile: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, "").replace(/^(\+91|91|0)/, ""))
    .refine((v) => /^[6-9]\d{9}$/.test(v), "Enter a valid 10-digit Indian mobile number"),
  transactionId: z.string().trim().max(80, "Reference is too long").optional(),
  paymentDate: z.string().min(1, "Select the payment date"),
  amount: z
    .string()
    .min(1, "Enter the amount paid")
    .refine((v) => Number(v) > 0 && Number(v) <= 1000000, "Enter a valid amount"),
});

type Errors = {
  studentName?: string | undefined;
  parentMobile?: string | undefined;
  transactionId?: string | undefined;
  paymentDate?: string | undefined;
  amount?: string | undefined;
  screenshot?: string | undefined;
};

const field =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";

export function PaymentProofDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const acceptFile = (candidate: File | undefined) => {
    if (!candidate) return;
    if (!ACCEPTED.includes(candidate.type.toLowerCase())) {
      setErrors((e) => ({ ...e, screenshot: "Only JPG, JPEG or PNG images are allowed" }));
      return;
    }
    if (candidate.size > MAX_BYTES) {
      setErrors((e) => ({ ...e, screenshot: "Image must be 5 MB or smaller" }));
      return;
    }
    setErrors((e) => ({ ...e, screenshot: undefined }));
    setFile(candidate);
    setPreview(URL.createObjectURL(candidate));
  };

  const removeFile = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const reset = () => {
    removeFile();
    setErrors({});
    setProgress(0);
    formRef.current?.reset();
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    acceptFile(event.dataTransfer.files?.[0]);
  };

  const onSubmit = async (event: ChangeEvent<HTMLFormElement> | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget as HTMLFormElement);
    const parsed = schema.safeParse({
      studentName: String(data.get("studentName") ?? ""),
      parentMobile: String(data.get("parentMobile") ?? ""),
      transactionId: String(data.get("transactionId") ?? ""),
      paymentDate: String(data.get("paymentDate") ?? ""),
      amount: String(data.get("amount") ?? ""),
    });

    const nextErrors: Errors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
    }
    if (!file) nextErrors.screenshot = "Upload your payment screenshot";
    setErrors(nextErrors);
    if (!parsed.success || !file) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    setSubmitting(true);
    setProgress(15);
    try {
      const ext = file.type.toLowerCase() === "image/png" ? "png" : "jpg";
      const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
      const upload = await supabase.storage.from("payment-proofs").upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
      if (upload.error) throw upload.error;
      setProgress(70);

      const values = parsed.data;
      const insert = await supabase.from("payment_submissions").insert({
        student_name: values.studentName,
        parent_mobile: values.parentMobile,
        amount: Number(values.amount),
        payment_date: values.paymentDate,
        transaction_id: values.transactionId ? values.transactionId : null,
        screenshot_path: path,
      });
      if (insert.error) throw insert.error;

      setProgress(100);
      toast.success("Payment proof submitted successfully!", {
        description: "Our team will verify your payment and update the payment status shortly.",
      });
      reset();
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("We couldn't submit your payment proof", {
        description: "Please check your connection and try again.",
      });
      setProgress(0);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border-border bg-card sm:max-w-lg">
        <DialogHeader>
          <p className="eyebrow">Payment confirmation</p>
          <DialogTitle className="font-[family-name:var(--font-display)] text-2xl">
            Submit Payment Proof
          </DialogTitle>
          <DialogDescription>
            Share your payment details and screenshot. Our academy team will verify and update your status.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} onSubmit={onSubmit} className="mt-2 space-y-5" noValidate>
          <div>
            <label htmlFor="studentName" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Student name*
            </label>
            <input id="studentName" name="studentName" className={field} placeholder="Full name of the player" />
            {errors.studentName ? <p className="mt-2 text-xs text-destructive">{errors.studentName}</p> : null}
          </div>

          <div>
            <label htmlFor="parentMobile" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Parent / guardian mobile*
            </label>
            <input
              id="parentMobile"
              name="parentMobile"
              type="tel"
              inputMode="tel"
              className={field}
              placeholder="10-digit mobile number"
            />
            {errors.parentMobile ? <p className="mt-2 text-xs text-destructive">{errors.parentMobile}</p> : null}
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Payment screenshot*
            </span>
            {preview ? (
              <div className="mt-2 overflow-hidden rounded-2xl border border-border">
                <img src={preview} alt="Payment screenshot preview" className="max-h-64 w-full object-contain bg-surface" />
                <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
                  <span className="truncate text-xs text-muted-foreground">
                    {file?.name} · {((file?.size ?? 0) / 1024 / 1024).toFixed(2)} MB
                  </span>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="shrink-0 text-xs font-semibold text-destructive hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                className={`mt-2 cursor-pointer rounded-2xl border border-dashed px-6 py-9 text-center transition-colors ${
                  dragging ? "border-accent bg-accent/5" : "border-border hover:border-accent"
                }`}
              >
                <p className="text-sm font-semibold text-foreground">Drag &amp; drop your screenshot</p>
                <p className="mt-1 text-xs text-muted-foreground">or click to browse · JPG, JPEG, PNG · max 5 MB</p>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              className="hidden"
              onChange={(e) => acceptFile(e.target.files?.[0])}
            />
            {errors.screenshot ? <p className="mt-2 text-xs text-destructive">{errors.screenshot}</p> : null}
          </div>

          <div>
            <label htmlFor="transactionId" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Payment reference / transaction ID
            </label>
            <input id="transactionId" name="transactionId" className={field} placeholder="Optional" />
            {errors.transactionId ? <p className="mt-2 text-xs text-destructive">{errors.transactionId}</p> : null}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="paymentDate" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Payment date*
              </label>
              <input
                id="paymentDate"
                name="paymentDate"
                type="date"
                max={new Date().toISOString().slice(0, 10)}
                className={field}
              />
              {errors.paymentDate ? <p className="mt-2 text-xs text-destructive">{errors.paymentDate}</p> : null}
            </div>
            <div>
              <label htmlFor="amount" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Payment amount*
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                min="1"
                step="0.01"
                className={field}
                placeholder="₹ 0.00"
              />
              {errors.amount ? <p className="mt-2 text-xs text-destructive">{errors.amount}</p> : null}
            </div>
          </div>

          {submitting || progress > 0 ? <Progress value={progress} className="h-1.5" /> : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-500 hover:brightness-110 disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit Payment Proof"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
