import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

type FlexProps<T extends React.ElementType> = {
  as?: T
  asChild?: boolean
  direction?: "row" | "col"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  align?: "start" | "center" | "end" | "stretch"
  wrap?: boolean
  className?: string
  children?: React.ReactNode
} & React.ComponentPropsWithoutRef<T>

const directionMap = {
  row: "flex-row",
  col: "flex-col",
}

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
}

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
}

export const Flex = <T extends React.ElementType = "div">({
  as,
  asChild,
  direction = "row",
  justify = "start",
  align = "center",
  wrap,
  className,
  children,
  ...props
}: FlexProps<T>) => {
  const Component = asChild ? Slot : as || "div"

  return (
    <Component className={cn("flex", directionMap[direction], justifyMap[justify], alignMap[align], wrap && "flex-wrap", className)} {...props}>
      {children}
    </Component>
  )
}
