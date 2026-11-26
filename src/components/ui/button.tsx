import type { ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/btn relative isolate inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-full font-sans text-[0.9375rem] font-semibold tracking-[0.01em]",
    "transition-[background-color,color,border-color,box-shadow,transform] duration-500 ease-(--ease-expo) active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-500 [&_svg]:ease-(--ease-expo)",
    // Fill that rises from below on hover
    "before:absolute before:inset-0 before:-z-10 before:translate-y-[101%] before:rounded-[inherit] before:transition-transform before:duration-700 before:ease-(--ease-expo) hover:before:translate-y-0",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-forest-600 text-white before:bg-forest-800 hover:shadow-[0_18px_40px_-18px_rgb(15_92_44/0.7)] hover:[&_svg]:translate-x-1",
        gold: "bg-gold-400 text-ink-900 before:bg-gold-300 hover:shadow-[0_18px_44px_-16px_rgb(240_180_41/0.75)] hover:[&_svg]:translate-x-1",
        outline:
          "border border-forest-600/30 text-forest-700 before:bg-forest-600 hover:border-forest-600 hover:text-white",
        outlineLight:
          "border border-ivory-50/30 text-ivory-50 backdrop-blur-sm before:bg-ivory-50 hover:border-ivory-50 hover:text-forest-950",
        ghost: "px-0! text-forest-900 before:hidden hover:text-gold-700 hover:[&_svg]:translate-x-1",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5 text-[0.8125rem]",
        lg: "h-14 px-9 text-[0.9375rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
