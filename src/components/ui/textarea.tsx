import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[140px] w-full rounded-xl border border-sky-200/80 bg-white/70 px-4 py-3 text-sm text-slate-800 backdrop-blur-md transition-all placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-cyan-400 focus-visible:ring-2 focus-visible:ring-cyan-300/50 focus-visible:shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
