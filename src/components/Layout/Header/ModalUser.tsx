"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EBox } from "@/elements/EBox/EBox"
import { EText } from "@/elements/EText/EText"
import { Flex } from "@/elements/Flex/Flex"
import { cn } from "@/lib/utils"
import { useLogout } from "@/services/react-query/psvn-auth/mutations/auth"
import { useStore } from "@/store"
import { ChevronRightFilled, QuestionCircleFilled, SettingsFilled, SignOutFilled } from "@fluentui/react-icons"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useMemo } from "react"

export const ModalUser = () => {
  const t = useTranslations()
  const userInfo = useStore((state) => state.userInfo)
  const avatarFallback = useMemo(() => {
    return (userInfo?.fullName ?? userInfo?.username)?.slice(0, 2).toUpperCase() || ""
  }, [userInfo])

  const { mutate: logout } = useLogout()

  const menuItems = [
    {
      icon: <SettingsFilled className="size-6" />,
      text: t("MODAL_USER_SETTINGS_AND_PRIVACY_BUTTON"),
      href: "#",
    },
    {
      icon: <QuestionCircleFilled className="size-6" />,
      text: t("MODAL_USER_HELP_AND_SUPPORT_BUTTON"),
      href: "#",
    },
    {
      icon: <SignOutFilled className="size-6" />,
      text: t("MODAL_USER_LOGOUT_BUTTON"),
      onClick: () => logout(),
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none focus:outline-none">
        <Flex className="size-14" justify="center">
          <Avatar className="size-8">
            <AvatarImage src={userInfo?.avatar} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        </Flex>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="slide-in-from-bottom-4 mr-4 max-h-[80vh] w-[440px] p-6 pr-3" asChild>
        <Flex direction="col" className="gap-4" align="start">
          <Flex direction="col" className={cn("shadow-4 w-full gap-4 rounded-2xl p-6", "[&>*]:w-full")} align="start">
            <Flex className="border-neutral-4 h-[72px] select-none">
              <Flex className="flex-1">
                <Avatar className="size-12">
                  <AvatarImage src={userInfo?.avatar} alt={userInfo?.username} />
                  <AvatarFallback className="border-neutral-4 bg-neutral-1 border text-sm font-medium">{avatarFallback}</AvatarFallback>
                </Avatar>

                <EBox className="flex-1 px-2 text-sm font-medium">
                  <EText as="p">{userInfo?.fullName || userInfo?.username}</EText>
                  <EText as="p" className="text-[#475467]">
                    {userInfo?.email}
                  </EText>
                </EBox>
              </Flex>
            </Flex>
          </Flex>

          <Flex direction="col" align="start" className="w-full">
            {menuItems.map(({ icon, text, href, onClick }, i) => {
              const content = (
                <>
                  <Flex className="bg-neutral-4 size-10 rounded-full" justify="center">
                    {icon}
                  </Flex>
                  <EText size="sm" weight="medium" className="flex-1 px-2">
                    {text}
                  </EText>
                  {href && <ChevronRightFilled className="size-8" />}
                </>
              )

              return href ? (
                <Flex key={i} className="h-[60px] w-full hover:cursor-pointer" asChild>
                  <Link href={href}>{content}</Link>
                </Flex>
              ) : (
                <Flex key={i} className="h-[60px] w-full hover:cursor-pointer" onClick={onClick}>
                  {content}
                </Flex>
              )
            })}
          </Flex>
        </Flex>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
