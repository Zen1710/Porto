import { getTech } from "@/lib/tech";
import { BrandIcon } from "./icons";

export function TechChip({ name }: { name: string }) {
  const tech = getTech(name);
  return (
    // inline-block (not flex) keeps the chip on the sentence's text baseline, with or without an icon.
    <span className="inline-block whitespace-nowrap rounded-md border border-line bg-wash px-[0.4em] py-[0.05em] text-[0.92em] leading-[1.45] font-medium text-ink">
      {tech.icon && (
        <BrandIcon
          icon={tech.icon}
          viewBox={tech.viewBox}
          className={`mr-[0.35em] inline-block ${tech.viewBox ? "h-[0.62em] w-auto align-[0.02em]" : "size-[0.95em] align-[-0.13em]"}`}
        />
      )}
      {tech.label}
    </span>
  );
}

/** Renders "A, B, and C" with each item as a chip, using English list rules. */
export function ChipList({ items }: { items: string[] }) {
  const parts = new Intl.ListFormat("en", { type: "conjunction" }).formatToParts(items);
  return (
    <>
      {parts.map((part, i) =>
        part.type === "element" ? <TechChip key={i} name={part.value} /> : <span key={i}>{part.value}</span>,
      )}
    </>
  );
}
