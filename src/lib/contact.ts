import { z } from "zod";

export const MIN_FILL_MS = 3000;

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .max(200, "That email is too long.")
    .pipe(z.email("Please enter a valid email address.")),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least a sentence (10 characters).")
    .max(5000, "Please keep it under 5000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<ContactField, string>>;
      values?: Partial<Record<ContactField, string>>;
    };

export type Screening =
  | { verdict: "ok"; data: ContactInput }
  | { verdict: "spam" }
  | { verdict: "invalid"; state: Extract<ContactState, { status: "error" }> };

type RawSubmission = {
  name?: string;
  email?: string;
  message?: string;
  /** Honeypot: hidden from people, filled in by bots. */
  website?: string;
  /** Milliseconds since epoch, set by the browser when the form mounts. */
  startedAt?: string;
};

/** Pure check of a submission: spam traps first, then field validation. */
export function screenSubmission(raw: RawSubmission, now: number): Screening {
  if (raw.website) return { verdict: "spam" };

  const startedAt = Number(raw.startedAt);
  if (!raw.startedAt || !Number.isFinite(startedAt)) {
    return {
      verdict: "invalid",
      state: {
        status: "error",
        message: "The form needs JavaScript to send. You can also email me directly.",
      },
    };
  }
  if (now - startedAt < MIN_FILL_MS) return { verdict: "spam" };

  const values = { name: raw.name ?? "", email: raw.email ?? "", message: raw.message ?? "" };
  const result = contactSchema.safeParse(values);
  if (!result.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as ContactField;
      fieldErrors[field] ??= issue.message;
    }
    return {
      verdict: "invalid",
      state: { status: "error", message: "Please check the highlighted fields.", fieldErrors, values },
    };
  }
  return { verdict: "ok", data: result.data };
}
