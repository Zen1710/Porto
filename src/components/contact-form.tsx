"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { sendMessage } from "@/app/actions";
import type { ContactField, ContactState } from "@/lib/contact";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "mt-2 block w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink placeholder:text-subtle transition-colors duration-200 hover:border-subtle focus:border-ink focus:ring-1 focus:ring-ink focus:outline-none aria-invalid:border-danger aria-invalid:focus:border-ink";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const startedAt = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // The time trap measures from when the form became usable.
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-xl border border-line px-5 py-6">
        <p className="font-semibold text-ink">Thanks, your message is on its way.</p>
        <p className="mt-1 text-muted">I&apos;ll reply to the email address you gave.</p>
      </div>
    );
  }

  const error = state.status === "error" ? state : undefined;
  const fieldError = (field: ContactField) => error?.fieldErrors?.[field];
  const fieldProps = (field: ContactField) => ({
    id: `contact-${field}`,
    name: field,
    defaultValue: error?.values?.[field],
    "aria-invalid": fieldError(field) ? true : undefined,
    "aria-describedby": fieldError(field) ? `contact-${field}-error` : undefined,
  });

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" field="name" error={fieldError("name")}>
          <input {...fieldProps("name")} type="text" autoComplete="name" required className={inputClass} />
        </Field>
        <Field label="Email" field="email" error={fieldError("email")}>
          <input {...fieldProps("email")} type="email" autoComplete="email" required className={inputClass} />
        </Field>
      </div>
      <Field label="Message" field="message" error={fieldError("message")}>
        <textarea
          {...fieldProps("message")}
          rows={5}
          required
          placeholder="The role, the team, and how to reach you."
          className={`${inputClass} resize-y`}
        />
      </Field>

      {/* Spam traps: a field people never see, and the time the form was opened. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAt} type="hidden" name="startedAt" />

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity duration-200 hover:opacity-85 disabled:cursor-progress disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p aria-live="polite" className="text-sm text-danger">
          {error?.message}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  field,
  error,
  children,
}: {
  label: string;
  field: ContactField;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`contact-${field}`} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`contact-${field}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
