"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Flex } from "@/elements/Flex/Flex"
import { GridDotsFilled } from "@fluentui/react-icons"
import AppItem from "./AppItem"
import { IconName } from "@/components/Icon/Icon"
import { isAdmin, isStaff } from "@/utils/auth"

export default function AppDialog() {
  const listItems: {
    name: string
    icon: IconName
    href: string
    show?: boolean
  }[] = [
    {
      name: "Booking",
      icon: "ReceiptRegular",
      href: "/booking/cart/",
      show: true,
    },
    {
      name: "Buy Points",
      icon: "GiftCardMoneyRegular",
      href: "/buy-points/point-packages/",
      show: true,
    },
    {
      name: "Organization",
      icon: "PeopleTeamRegular",
      href: "/org-management/staff",
      show: isAdmin() || isStaff(),
    },
    // {
    //   name: "Payroll",
    //   icon: "MoneyHandRegular",
    //   href: "#",
    // },
    {
      name: "Jobs",
      icon: "FolderBriefcaseRegular",
      href: "/job/work-management",
      show: true,
    },
    {
      name: "Wallet",
      icon: "WalletRegular",
      href: "/wallet/personal-wallet",
      show: true,
    },
    // {
    //   name: "Storage",
    //   icon: "CloudRegular",
    //   href: "#",
    // },
    {
      name: "Service",
      icon: "ReceiptSparklesRegular",
      href: "/service",
      show: isAdmin(),
    },
    {
      name: "Account Management",
      icon: "PersonAccountsRegular",
      href: "/user-management/user",
      show: isAdmin(),
    },
    {
      name: "CRM",
      icon: "ChartPersonRegular",
      href: "/crm/contact",
      show: isAdmin(),
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-14 focus-visible:ring-0" size="icon" variant="ghost">
          <GridDotsFilled className="size-7" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="shadow-4 slide-in-from-bottom-4 ml-4" align="start">
        <Flex direction="col" align="start" className="w-lg gap-4 rounded-lg p-4 [&>*]:w-full">
          <ScrollArea className="h-[calc(var(--spacing) * 48 * 2)]">
            <Flex wrap>
              {listItems
                .filter((item) => item.show)
                .map((item, i) => (
                  <AppItem key={i} app={item} />
                ))}
            </Flex>
          </ScrollArea>
        </Flex>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
