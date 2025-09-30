"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"
import { EText, ETextProps } from "@/elements/EText/EText"

export type LabelProps = Omit<
  React.ComponentProps<typeof LabelPrimitive.Root> &
    ETextProps & {
      withAsterisk?: boolean
      eTextClassName?: string
    },
  "asChild"
>

function Label({ className, children, withAsterisk = false, eTextClassName, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "cursor-pointer select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children ? children : <EText className={eTextClassName} {...props} />}
      {withAsterisk && <span className="text-red-5"> *</span>}
    </LabelPrimitive.Root>
  )
}

export { Label }
