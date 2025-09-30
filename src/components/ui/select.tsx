"use client"

import * as SelectPrimitive from "@radix-ui/react-select"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Checkmark16Regular, ChevronDown16Regular, ChevronDownRegular, ChevronUp16Regular } from "@fluentui/react-icons"

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  iconClassName,
  showIcon = true,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
  iconClassName?: string
  showIcon?: boolean
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        // Base layout and styling
        "flex w-fit cursor-pointer items-center justify-between gap-1 rounded px-3 py-2.5 text-sm whitespace-nowrap",

        // Transitions and interactions
        "transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50",

        // Size variants
        "data-[size=default]:h-11 data-[size=sm]:h-8",

        // Focus states
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-2",

        // Placeholder styling
        "data-[placeholder]:text-muted-foreground",

        // Error states
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",

        // Dark mode
        "dark:aria-invalid:ring-destructive/40 dark:bg-input/30 dark:hover:bg-input/50",

        // Select value styling
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1",

        // SVG styling
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[size=sm]:[&_svg]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      {showIcon && (
        <SelectPrimitive.Icon asChild>
          <ChevronDownRegular className={cn("size-6", iconClassName)} />
        </SelectPrimitive.Icon>
      )}
    </SelectPrimitive.Trigger>
  )
}

interface SelectContentProps extends React.ComponentProps<typeof SelectPrimitive.Content> {
  scrollable?: "bar" | "arrow"
}

function SelectContent({ className, children, position = "popper", scrollable = "bar", ...props }: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          // Animation states
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",

          // Slide animations
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",

          // Base styling
          "bg-neutral-1 shadow-4 relative z-50 rounded",
          "max-h-(--radix-select-content-available-height) min-w-[8rem]",
          "origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto",
          "max-w-[var(--radix-select-trigger-width)]",

          // Position-specific transforms
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          scrollable === "bar" && "scrollbar-thin",

          className,
        )}
        position={position}
        {...props}
      >
        {scrollable === "arrow" && <SelectScrollUpButton />}
        <SelectPrimitive.Viewport
          className={cn(
            "py-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
            scrollable === "bar" && "!overflow-visible",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        {scrollable === "arrow" && <SelectScrollDownButton />}
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return <SelectPrimitive.Label data-slot="select-label" className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)} {...props} />
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // Base layout
        "relative flex w-full items-center gap-2 rounded-sm py-1.5 pr-8 pl-4 text-sm",

        // Text colors
        "text-neutral-9 [&_svg:not([class*='text-'])]:text-neutral-10",

        // Interactive states
        "cursor-pointer outline-hidden select-none",
        "focus:bg-accent focus:text-accent-foreground",

        // Disabled states
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",

        // SVG styling
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        // Nested span styling
        "*:[span]:last:flex *:[span]:last:max-w-full *:[span]:last:items-center *:[span]:last:gap-2",
        "[&>span>span]:truncate",

        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Checkmark16Regular className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return <SelectPrimitive.Separator data-slot="select-separator" className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)} {...props} />
}

function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton data-slot="select-scroll-up-button" className={cn("flex items-center justify-center py-1", className)} {...props}>
      <ChevronUp16Regular className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton data-slot="select-scroll-down-button" className={cn("flex items-center justify-center py-1", className)} {...props}>
      <ChevronDown16Regular className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
