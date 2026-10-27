const monthYear = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });
const fullDate = new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export const formatMonth = (date: Date) => monthYear.format(date);
export const formatDate = (date: Date) => fullDate.format(date);

/** "2024-08" → "Aug 2024" */
export function formatYearMonth(value: string) {
  return monthYear.format(new Date(`${value}-01T00:00:00Z`));
}

export function formatRange(start: string, end?: string) {
  return `${formatYearMonth(start)} — ${end ? formatYearMonth(end) : "Present"}`;
}

export const padNumber = (n: number) => String(n).padStart(2, "0");
