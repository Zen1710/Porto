import { describe, expect, it } from "vitest";
import { MIN_FILL_MS, screenSubmission } from "./contact";

const now = 1_800_000_000_000;
const valid = {
  name: "Recruiter",
  email: "recruiter@example.com",
  message: "We have a full-stack role open.",
  website: "",
  startedAt: String(now - 10_000),
};

describe("screenSubmission", () => {
  it("accepts a valid message and trims it", () => {
    const result = screenSubmission({ ...valid, name: "  Recruiter  " }, now);
    expect(result).toEqual({
      verdict: "ok",
      data: { name: "Recruiter", email: "recruiter@example.com", message: "We have a full-stack role open." },
    });
  });

  it("treats a filled honeypot as spam", () => {
    expect(screenSubmission({ ...valid, website: "https://spam.example" }, now).verdict).toBe("spam");
  });

  it("treats a form sent faster than a person could type as spam", () => {
    expect(screenSubmission({ ...valid, startedAt: String(now - MIN_FILL_MS + 1) }, now).verdict).toBe("spam");
  });

  it("asks for JavaScript when the start time is missing", () => {
    const result = screenSubmission({ ...valid, startedAt: undefined }, now);
    expect(result.verdict).toBe("invalid");
  });

  it("reports each invalid field and keeps what was typed", () => {
    const result = screenSubmission({ ...valid, name: "", email: "not-an-email", message: "hi" }, now);
    if (result.verdict !== "invalid") throw new Error("expected invalid");
    expect(Object.keys(result.state.fieldErrors ?? {}).sort()).toEqual(["email", "message", "name"]);
    expect(result.state.values?.email).toBe("not-an-email");
  });
});
