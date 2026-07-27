import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-bold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-ink text-white shadow-[0_12px_30px_rgba(8,18,37,.2)] hover:-translate-y-0.5 hover:bg-blue",
        blue: "bg-blue text-white shadow-[0_14px_34px_rgba(37,99,235,.26)] hover:-translate-y-0.5 hover:bg-[#174fc7]",
        outline: "border border-line bg-white/80 text-ink hover:-translate-y-0.5 hover:border-blue/30 hover:bg-sky",
        ghost: "text-ink hover:bg-sky",
      },
      size: {
        default: "h-12 px-5",
        sm: "h-10 px-4 text-xs",
        lg: "h-14 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted">{children}</label>;
}

export const fieldClass =
  "h-12 w-full rounded-2xl border border-line bg-white px-4 text-sm text-ink shadow-sm outline-none transition focus:border-blue/50 focus:ring-4 focus:ring-blue/10 placeholder:text-slate-400";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue/10 bg-white/75 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-blue shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-blue animate-pulseSoft" />
      {children}
    </div>
  );
}
