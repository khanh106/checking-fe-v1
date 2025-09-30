"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as React from "react"

import Icon, { IconName } from "@/components/Icon/Icon"
import { cn } from "@/lib/utils"
import { DismissRegular } from "@fluentui/react-icons"
import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/25",
        className,
      )}
      {...props}
    />
  )
}

const dialogContentVariants = cva(
  [
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "bg-neutral-1 shadow-4 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border duration-200",
  ],
  {
    variants: {
      size: {
        default: "lg:max-w-3xl p-6",
        sm: "sm:max-w-lg p-4",
        lg: "xl:max-w-5xl p-4",
        xl: "max-w-[1120px] p-6",
        full: "max-w-full h-full m-0 max-h-full rounded-none",
        responsive: "w-full max-w-[95vw] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[900px] xl:max-w-[1120px] p-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

function DialogContent({
  className,
  children,
  hiddenCloseButton,
  size = "default",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  hiddenCloseButton?: boolean
} & VariantProps<typeof dialogContentVariants>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content data-slot="dialog-content" className={cn(dialogContentVariants({ size }), className)} {...props}>
        {children}
        {!hiddenCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 flex size-9 cursor-pointer items-center justify-center rounded-lg opacity-70 shadow-xs transition-opacity hover:opacity-100 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <DismissRegular className="size-5" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

interface DialogHeaderProps extends React.ComponentProps<"div"> {
  iconName?: IconName
  showIcon?: boolean
  hiddenBorder?: boolean
}

function DialogHeader({ className, iconName = "TaskListAddRegular", showIcon = true, children, hiddenBorder, ...props }: DialogHeaderProps) {
  const Content = () => (
    <div className={cn("flex flex-col gap-1 text-center sm:text-left", className)} {...props}>
      {children}
    </div>
  )

  return (
    <Slot data-slot="dialog-header">
      {showIcon ? (
        <div className={cn("flex gap-4", hiddenBorder || "border-b pb-4")}>
          <div className="border-neutral-4 flex size-12 shrink-0 items-center justify-center rounded-[10px] border shadow-xs">
            <Icon name={iconName} className="size-6" />
          </div>

          <Content />
        </div>
      ) : (
        <Content />
      )}
    </Slot>
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-footer" className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn("text-[20px] leading-7 font-medium", className)} {...props} />
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description data-slot="dialog-description" className={cn("text-neutral-7 text-sm", className)} {...props} />
}

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger }
