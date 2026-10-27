"use server";

import { screenSubmission, type ContactState } from "@/lib/contact";
import { MailerNotConfiguredError, sendContactEmail } from "@/lib/mailer";

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const field = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : undefined;
  };

  const screening = screenSubmission(
    {
      name: field("name"),
      email: field("email"),
      message: field("message"),
      website: field("website"),
      startedAt: field("startedAt"),
    },
    Date.now(),
  );

  // Bots get the same answer as people so they learn nothing.
  if (screening.verdict === "spam") return { status: "success" };
  if (screening.verdict === "invalid") return screening.state;

  try {
    await sendContactEmail(screening.data);
    return { status: "success" };
  } catch (error) {
    console.error("[contact]", error);
    const values = screening.data;
    if (error instanceof MailerNotConfiguredError) {
      return { status: "error", message: "The form isn't connected yet. Please email me directly.", values };
    }
    return { status: "error", message: "Something went wrong sending your message. Please try again.", values };
  }
}
