"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const avatarVariants = cva("relative flex shrink-0 rounded-full overflow-hidden", {
  variants: {
    variant: {
      default: "size-8",
      group: "size-10",
      userInfo: "size-[60px]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface AvatarProps extends React.ComponentProps<typeof AvatarPrimitive.Root>, VariantProps<typeof avatarVariants> {}

function Avatar({ className, variant, ...props }: AvatarProps) {
  return <AvatarPrimitive.Root data-slot="avatar" className={cn(avatarVariants({ variant }), className)} {...props} />
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image data-slot="avatar-image" className={cn("aspect-square size-full", className)} {...props} />
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("flex size-full items-center justify-center rounded-full border text-xs font-medium", className)}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
