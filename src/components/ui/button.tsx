"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "legendary-button inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2 focus-visible:ring-offset-space-900 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-electric-500 text-white hover:bg-electric-600 glow-electric shadow-lg hover:shadow-electric-500/25",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-lg",
        outline: "border-2 border-electric-500/60 text-electric-400 hover:bg-electric-500 hover:text-white hover:border-electric-500 backdrop-blur-sm",
        secondary: "bg-space-700 border border-slate-600/50 text-slate-300 hover:bg-space-600 hover:text-white hover:border-slate-500",
        ghost: "text-slate-400 hover:bg-space-800/50 hover:text-white",
        emerald: "bg-emerald-500 text-white hover:bg-emerald-600 glow-emerald shadow-lg",
        amber: "bg-amber-500 text-space-900 hover:bg-amber-600 glow-amber shadow-lg font-bold",
        invite: "bg-electric-500 text-white hover:bg-electric-600 animate-wallet-invite shadow-2xl",
      },
      size: {
        default: "h-12 px-6 py-3 text-sm",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base",
        xl: "h-16 px-10 py-5 text-lg font-bold",
        icon: "h-12 w-12",
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
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };