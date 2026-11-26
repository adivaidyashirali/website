import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const fieldBase =
  "mt-2 w-full rounded-xl border border-ivory-300 bg-ivory-100 px-4 py-3 text-base text-ink-900 placeholder:text-ink-500/70 transition-[border-color,box-shadow,background-color] duration-300 focus:border-forest-600 focus:bg-white focus:shadow-[0_0_0_4px_rgb(21_128_61/0.12)] focus:outline-none focus-visible:outline-none aria-invalid:border-copper-500";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldBase, "min-h-32 resize-y", className)} {...props} />;
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select className={cn(fieldBase, "h-12 appearance-none pr-10", className)} {...props}>
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 12 8"
        className="pointer-events-none absolute right-4 top-1/2 mt-1 h-2 w-3 -translate-y-1/2 text-ink-500"
      >
        <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn("eyebrow block text-[0.6875rem] text-ink-700", className)}
      {...props}
    />
  );
}
