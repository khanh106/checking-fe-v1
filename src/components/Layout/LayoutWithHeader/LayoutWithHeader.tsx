import { Flex } from "@/elements/Flex/Flex"
import Header from "../Header/Header"

export default function LayoutWithHeader({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Flex className="min-h-screen flex-col gap-8">
      <Header />
      <Flex className="w-full flex-1 flex-col items-start" as="main">
        {children}
      </Flex>
    </Flex>
  )
}
