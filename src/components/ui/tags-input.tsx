import { cn } from "@/lib/utils"
import * as TagsInputPrimitive from "@diceui/tags-input"
import { Dismiss12Regular } from "@fluentui/react-icons"
import * as React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const TagsInput = React.forwardRef<React.ComponentRef<typeof TagsInputPrimitive.Root>, React.ComponentPropsWithoutRef<typeof TagsInputPrimitive.Root>>(
  ({ className, ...props }, ref) => (
    <TagsInputPrimitive.Root data-slot="tags-input" ref={ref} className={cn("flex w-full flex-col gap-2", className)} {...props} />
  ),
)
TagsInput.displayName = TagsInputPrimitive.Root.displayName

const TagsInputLabel = React.forwardRef<React.ComponentRef<typeof TagsInputPrimitive.Label>, React.ComponentPropsWithoutRef<typeof TagsInputPrimitive.Label>>(
  ({ className, ...props }, ref) => (
    <TagsInputPrimitive.Label
      data-slot="tags-input-label"
      ref={ref}
      className={cn(
        "select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
)
TagsInputLabel.displayName = TagsInputPrimitive.Label.displayName

const TagsInputList = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
  <div
    data-slot="tags-input-list"
    ref={ref}
    className={cn(
      "bg-neutral-1 flex min-h-11 w-full flex-wrap items-center gap-1 rounded px-3 py-2.5",
      "selection:bg-primary selection:text-primary-foreground transition-[color,box-shadow,border] outline-none",
      "focus-within:ring-ring/50 focus-within:border-transparent focus-within:ring-2",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
))
TagsInputList.displayName = "TagsInputList"

const TagsInputInput = React.forwardRef<React.ComponentRef<typeof TagsInputPrimitive.Input>, React.ComponentPropsWithoutRef<typeof TagsInputPrimitive.Input>>(
  ({ className, ...props }, ref) => (
    <TagsInputPrimitive.Input
      data-slot="tags-input-input"
      ref={ref}
      className={cn("placeholder:text-neutral-6 flex-1 bg-transparent text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    />
  ),
)
TagsInputInput.displayName = TagsInputPrimitive.Input.displayName

const TagsInputItem = React.forwardRef<React.ComponentRef<typeof TagsInputPrimitive.Item>, React.ComponentPropsWithoutRef<typeof TagsInputPrimitive.Item>>(
  ({ className, children, ...props }, ref) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <TagsInputPrimitive.Item
            data-slot="tags-input-item"
            ref={ref}
            className={cn(
              "text-neutral-8 bg-neutral-2 border-neutral-5 inline-flex max-w-32 items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium",
              "data-editing:ring-ring [&[data-highlighted]:not([data-editing])]:bg-accent [&[data-highlighted]:not([data-editing])]:text-accent-foreground",
              "focus:outline-hidden data-disabled:cursor-not-allowed data-disabled:opacity-50 data-editable:select-none data-editing:bg-transparent data-editing:ring-1",
              className,
            )}
            {...props}
          >
            <TagsInputPrimitive.ItemText className="truncate overflow-hidden text-ellipsis whitespace-nowrap">{children}</TagsInputPrimitive.ItemText>
            <TagsInputPrimitive.ItemDelete className="ring-offset-background inline-flex size-3 shrink-0 items-center rounded-sm opacity-70 transition-opacity hover:opacity-100 data-disabled:hidden">
              <Dismiss12Regular className="size-3" />
            </TagsInputPrimitive.ItemDelete>
          </TagsInputPrimitive.Item>
        </TooltipTrigger>
        <TooltipContent>
          <p>{children}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
)
TagsInputItem.displayName = TagsInputPrimitive.Item.displayName

const TagsInputClear = React.forwardRef<React.ComponentRef<typeof TagsInputPrimitive.Clear>, React.ComponentPropsWithoutRef<typeof TagsInputPrimitive.Clear>>(
  ({ className, ...props }, ref) => <TagsInputPrimitive.Clear data-slot="tags-input-clear" ref={ref} className={cn(className)} {...props} />,
)
TagsInputClear.displayName = TagsInputPrimitive.Clear.displayName

export { TagsInput, TagsInputClear, TagsInputInput, TagsInputItem, TagsInputLabel, TagsInputList }
