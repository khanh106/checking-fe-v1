"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface InputProps extends React.ComponentProps<"input"> {
  placeholderTx?: string
}

export const inputCn = cn(
  "bg-neutral-1 dark:bg-input/30 flex h-11 w-full min-w-0 rounded px-3 py-2.5 text-sm",
  "placeholder:text-neutral-6 selection:bg-primary selection:text-primary-foreground transition-[color,box-shadow] outline-none",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
)

function Input({ className, type, placeholder, placeholderTx, ...props }: InputProps) {
  const t = useTranslations()

  const placeholderText = placeholderTx ? t(placeholderTx) : placeholder
  return <input type={type} data-slot="input" className={cn(inputCn, className)} placeholder={placeholderText} {...props} />
}

export { Input }
