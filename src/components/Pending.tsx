import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Marks information that has not been confirmed yet.
 *
 * Production: renders a neutral, honest note (never a fake value).
 * Development: the same note gets a dotted gold underline; hover it to see
 * which field in src/content to edit.
 */
export function Pending({
  field,
  children = "To be announced",
  className,
}: {
  /** Where to edit the value, e.g. "site.ts → contact.phone". */
  field: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span
      title={import.meta.env.DEV ? `Placeholder — edit src/content/${field}` : undefined}
      className={cn(
        "italic opacity-75",
        import.meta.env.DEV && "underline decoration-gold-500 decoration-dotted underline-offset-4",
        className,
      )}
    >
      {children}
    </span>
  );
}
