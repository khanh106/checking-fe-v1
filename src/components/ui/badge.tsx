import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground text-neutral-8 [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        tag: "border-neutral-5 bg-neutral-2 text-neutral-8 focus-visible:border-ring  focus-visible:ring-[1px]",
        gray: "border-transparent bg-neutral-6 text-primary-foreground",
        blue: "border-transparent bg-blue-6 text-primary-foreground",
        red: "border-transparent bg-red-6 text-primary-foreground",
        green: "border-transparent bg-[#52C41A] text-primary-foreground",
        cyan: "border-transparent bg-cyan-6 text-primary-foreground",
        yellow: "border-transparent bg-warning text-primary-foreground",
        pink: "border-transparent bg-[#FF18C5] text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export const statusVariantMap: Record<string, VariantProps<typeof badgeVariants>["variant"]> = {
  NEW: "gray",
  ACTIVE: "blue",
  INACTIVE: "red",
  INPROGRESS: "cyan",
  COMPLETED: "blue",
  CANCELLED: "yellow",
  BAN: "red",
  PENDING: "yellow",
  WAIT: "yellow",
}

export const statusVariantServiceMap: Record<string, VariantProps<typeof badgeVariants>["variant"]> = {
  NEW: "gray",
  ACTIVE: "blue",
  INACTIVE: "red",
}
export const statusTransactionMap: Record<string, VariantProps<typeof badgeVariants>["variant"]> = {
  COMPLETED: "blue",
  FAILED: "red",
  INPROGRESS: "cyan",
}
export const statusVariantOrderMap: Record<string, VariantProps<typeof badgeVariants>["variant"]> = {
  NEW: "gray",
  QUOTE: "yellow",
  UNPAID: "red",
  PROCESSING: "cyan",
  HANDOVER: "green",
  COMPLETED: "pink",
  REVISIONS: "blue",
  // CANCELLED: "gray",
}

function Badge({ className, variant, asChild = false, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
