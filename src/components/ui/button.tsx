import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-500 bg-[length:200%_100%] text-white shadow-[0_8px_30px_-6px_rgba(14,165,233,0.55)] hover:bg-[position:100%_0] hover:shadow-[0_10px_40px_-4px_rgba(14,165,233,0.75)] hover:-translate-y-0.5",
        glass:
          "border border-white/60 bg-white/50 text-sky-900 backdrop-blur-xl shadow-[0_4px_24px_-8px_rgba(14,165,233,0.35)] hover:bg-white/80 hover:border-cyan-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_-8px_rgba(14,165,233,0.5)]",
        outline:
          "border border-cyan-400/60 bg-transparent text-cyan-700 hover:bg-cyan-50 hover:border-cyan-500",
        ghost: "text-sky-900 hover:bg-sky-100/60",
      },
      size: {
        default: "h-11 px-7",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
