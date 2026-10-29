/**
 * Marks where real assets are still needed. Rendered in development (or
 * when NEXT_PUBLIC_SHOW_PLACEHOLDERS=true) and omitted from production
 * builds, so unfinished slots are never presented as completed work.
 */
export const showPlaceholders =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

export function Placeholder({
  label,
  note,
  className = "",
  ratio = "16/10",
}: {
  label: string;
  note: string;
  className?: string;
  ratio?: string;
}) {
  if (!showPlaceholders) return null;
  return (
    <div
      role="note"
      className={`hatch flex flex-col justify-between rounded-[6px] border border-dashed border-current/30 p-5 text-current ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span className="eyebrow inline-flex w-fit items-center gap-2 bg-accent px-2 py-1 text-paper">
        Asset needed
      </span>
      <div>
        <p className="font-medium">{label}</p>
        <p className="mt-1 text-sm opacity-70">{note}</p>
      </div>
    </div>
  );
}
