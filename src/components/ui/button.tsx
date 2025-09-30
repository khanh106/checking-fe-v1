import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { EText, ETextProps } from "@/elements/EText/EText"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    // Base layout and typography
    "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded text-sm font-medium shrink-0",

    // Transitions and interactions
    "transition-all hover:cursor-pointer",

    // Focus states
    "outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2",

    // Error states
    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
    "dark:aria-invalid:ring-destructive/40",

    // Disabled states
    "disabled:pointer-events-none disabled:opacity-50",

    // SVG styling
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: ["bg-neutral-10 text-neutral-1", "hover:bg-neutral-10/90", "disabled:text-neutral-4 disabled:bg-neutral-6 disabled:opacity-100"],
        outline: ["border bg-neutral-1", "hover:bg-accent hover:text-neutral-9", "dark:bg-input/30 dark:border-input dark:hover:bg-input/50"],
        ghost: ["hover:bg-neutral-4 hover:text-neutral-9", "dark:hover:bg-accent/50"],
        input: "text-left font-normal",
        secondary: ["bg-neutral-4 text-neutral-10", "hover:bg-neutral-4/90", "disabled:text-neutral-8 disabled:bg-neutral-3 disabled:opacity-100"],
        link: ["text-primary underline font-normal", "disabled:text-neutral-8 disabled:no-underline"],
        success: ["bg-emerald-600 text-white", "hover:bg-emerald-600/90", "disabled:text-emerald-300 disabled:bg-emerald-600 disabled:opacity-100"],
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        icon: "size-11",
        input: "h-10 px-3 py-2.5 w-full",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:size-5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        link: "p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export type ButtonProps = {
  label?: string
  labelTx?: string
  labelTxOptions?: Record<string, string | number>
  _label?: ETextProps
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({ label, labelTx, labelTxOptions, _label, children, className, variant, size, asChild = false, type = "button", ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} type={type}>
      {children ? children : <EText text={label} tx={labelTx} txOptions={labelTxOptions} {..._label} />}
    </Comp>
  )
}

export { Button, buttonVariants }
