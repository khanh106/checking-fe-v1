"use client"

import { EText } from "@/elements/EText/EText"
import { Flex } from "@/elements/Flex/Flex"
import Link from "next/link"
import AppDialog from "./AppDialog"
import { ModalUser } from "./ModalUser"

export default function Header() {
  return (
    <>
      <Flex className="sticky inset-x-0 top-0 z-50 w-full" justify="between" as="header">
        <Flex className="gap-2">
          <AppDialog />

          <Link href="/" className="flex items-center gap-2 py-[3px] select-none">
            <EText className="size-10 rounded bg-black p-0.5 text-center leading-9 text-white" text="PS" />
            <EText className="size-10 p-0.5 text-base leading-9 font-[500]" text="PSVN" />
          </Link>
        </Flex>

        <Flex>
          {/* <LanguageToggle /> */}

          {/* <Button size="icon" variant="ghost" className="text-neutral-8 size-14">
            <Alert32Regular className="size-6" />
          </Button> */}

          <ModalUser />
        </Flex>

        {/* <EBox className="t-2 absolute left-1/2 h-10 w-[350px] -translate-x-1/2">
          <SearchRegular className="text-neutral-7 absolute top-1/2 left-6 -translate-y-1/2" />
          <Input className="bg-neutral-2 placeholder:text-neutral-7 h-full rounded-[20px] pr-4 pl-12" placeholderTx="HEADER_INPUT_PLACEHOLDER" />
        </EBox> */}
      </Flex>
    </>
  )
}
