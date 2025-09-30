"use client"

import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { useTranslations } from "next-intl"

const textVariants = cva("", {
  variants: {
    // variant: {
    //   normalXs: "font-normal text-xs",
    //   normalSm: "font-normal text-sm",
    //   normalBase: "font-normal text-base",
    //   normalLg: "font-normal text-lg",
    //   semiboldXl: "font-semibold text-xl",
    // TODO: more variant
    // primary: "text-primary",
    // secondary: "text-secondary-foreground",
    // muted: "text-muted-foreground",
    // destructive: "text-destructive",
    // success: "text-green-600 dark:text-green-400",
    // warning: "text-yellow-600 dark:text-yellow-400",
    // },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "heading-28": "text-[28px] leading-9",
    },
    weight: {
      default: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    // variant: "normalBase",
    size: "default",
    weight: "default",
  },
})

export type ETextVariantType = VariantProps<typeof textVariants>

export type ETextProps = React.ComponentProps<"span"> &
  ETextVariantType & {
    text?: string | number | null
    tx?: string
    txOptions?: Record<string, string | number>
    as?: React.ElementType
    asChild?: boolean
  }

export const EText = ({ text, tx, txOptions, size, weight, className, as = "span", asChild = false, children, ...rest }: ETextProps) => {
  const t = useTranslations()
  const content = children || (typeof text === "number" || text ? text.toString() : tx ? (txOptions ? t(tx, txOptions) : t(tx)) : "")

  const Component = asChild ? Slot : as

  return (
    <Component className={cn(textVariants({ size, weight, className }))} {...rest}>
      {content}
    </Component>
  )
}
