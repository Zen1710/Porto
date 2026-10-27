import Image from "next/image";

export function Avatar({ name, photo, size }: { name: string; photo?: string; size: number }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return (
    <span className="relative inline-block shrink-0" style={{ width: size, height: size }}>
      {photo ? (
        <Image
          src={photo}
          alt={name}
          width={size * 2}
          height={size * 2}
          priority
          className="size-full rounded-full object-cover grayscale"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex size-full items-center justify-center rounded-full border border-line bg-wash text-sm font-semibold tracking-tight text-ink"
        >
          {initials}
        </span>
      )}
      <span
        aria-hidden="true"
        className="absolute right-0 bottom-0 size-3.5 rounded-full border-[2.5px] border-paper bg-live"
      />
    </span>
  );
}
