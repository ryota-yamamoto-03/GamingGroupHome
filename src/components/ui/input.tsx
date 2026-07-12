import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-sky-200/80 bg-white/70 px-4 py-2 text-sm text-slate-800 backdrop-blur-md transition-all placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-300/50 focus-visible:shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
