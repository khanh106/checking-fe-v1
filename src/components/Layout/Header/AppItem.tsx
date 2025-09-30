import Icon, { IconName } from "@/components/Icon/Icon"
import { EText } from "@/elements/EText/EText"
import { Flex } from "@/elements/Flex/Flex"
import Link from "next/link"

interface Props {
  app: {
    name: string
    icon: IconName
    href: string
  }
}

export default function AppItem({ app }: Props) {
  return (
    <Link href={app.href}>
      <Flex direction="col" className="hover:bg-neutral-3 size-24 cursor-pointer gap-2 rounded-xl py-2">
        <Icon name={app.icon} className="size-10" />
        <EText size={"xs"} className="line-clamp-2 w-[75px] text-center" text={app.name} />
      </Flex>
    </Link>
  )
}
