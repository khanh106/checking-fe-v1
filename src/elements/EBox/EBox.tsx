import * as React from "react"
import { cn } from "@/lib/utils"

export interface EBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

const EBox = React.forwardRef<HTMLDivElement, EBoxProps>(({ className, as: Component = "div", ...props }, ref) => {
  return <Component className={cn("", className)} ref={ref} {...props} />
})

EBox.displayName = "EBox"

export { EBox }
