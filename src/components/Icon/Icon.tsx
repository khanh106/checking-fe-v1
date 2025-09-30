"use client"

import * as FluentIcons from "@fluentui/react-icons"
import type { ComponentProps } from "react"

export type IconName = keyof typeof FluentIcons

type IconProps = {
  name: IconName
} & React.ComponentProps<"svg">

export default function Icon({ name, ...props }: IconProps) {
  const IconComponent = FluentIcons[name] as React.FC<ComponentProps<"svg">>

  if (!IconComponent) return null

  return <IconComponent {...props} />
}
