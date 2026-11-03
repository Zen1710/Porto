import { checkRateLimit } from "@vercel/firewall";
import { headers } from "next/headers";

/** Must match the Rate limit ID of the `@vercel/firewall` rule in the Vercel dashboard (Firewall → Configure). */
export const CONTACT_RATE_LIMIT_ID = "contact-form";

/**
 * Asks the Vercel Firewall whether this visitor's IP has sent too many messages.
 * Fails open: if the check breaks, the message still goes through, so a firewall
 * hiccup never silences a real recruiter.
 */
export async function isContactRateLimited(): Promise<boolean> {
  // The firewall only exists on Vercel; local dev and `next start` skip the check.
  if (!process.env.VERCEL) return false;

  try {
    const { rateLimited } = await checkRateLimit(CONTACT_RATE_LIMIT_ID, {
      headers: await headers(),
      timeout: 2000,
    });
    return rateLimited;
  } catch (error) {
    console.error("[contact] rate limit check failed", error);
    return false;
  }
}
