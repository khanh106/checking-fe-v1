"use client"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Checkmark20Regular } from "@fluentui/react-icons"

interface CheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  size?: "sm" | "md" | "lg"
}

const sizeMap = {
  sm: {
    box: "size-4",
    icon: "size-[14px]",
  },
  md: {
    box: "size-5",
    icon: "size-[18px]",
  },
  lg: {
    box: "size-6",
    icon: "size-[22px]",
  },
}

function Checkbox({ className, size = "md", ...props }: CheckboxProps) {
  const boxSize = sizeMap[size]?.box || sizeMap.md.box
  const iconSize = sizeMap[size]?.icon || sizeMap.md.icon
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-neutral-5 dark:bg-input/30 data-[state=checked]:bg-neutral-8 data-[state=checked]:text-neutral-1 dark:data-[state=checked]:bg-neutral-10 data-[state=checked]:border-neutral-8 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shrink-0 cursor-pointer rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        boxSize,
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="flex items-center justify-center text-current transition-none">
        <Checkmark20Regular className={cn(iconSize, "data-[state=checked]:text-neutral-1")} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
