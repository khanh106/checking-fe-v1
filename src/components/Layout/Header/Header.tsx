"use client";

import { EText } from "@/elements/EText/EText";
import Link from "next/link";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import AppDialog from "./AppDialog";
import { ModalUser } from "./ModalUser";
import { useState, useEffect, useRef } from "react";
import AppItem from "./AppItem";
import { IconName } from "@/components/Icon/Icon";
import { isAdmin, isStaff } from "@/utils/auth";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isFull } = useSidebar();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, buttonRef]);

  const listItems: {
    name: string;
    icon: IconName;
    href: string;
    show?: boolean;
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
  ];

  return (
    <div className="relative flex w-full items-center justify-between">
      {/* Left Group */}
      <div className="flex items-center gap-2">
        <div className="-ml-6">
          <SidebarTrigger className="md:hidden" />
        </div>
        <AppDialog ref={buttonRef} onClick={() => setIsMenuOpen(!isMenuOpen)} />
        <Link href="/" className="flex items-center gap-2 py-[3px] select-none">
          <EText
            className="size-10 rounded bg-green-600 p-0.5 text-center leading-9 text-white"
            text="TR"
          />
          <EText
            className="size-10 p-0.5 text-base leading-9 font-[500]"
            text="TIRA"
          />
        </Link>
      </div>

      {/* Right Group */}
      <div className="flex items-center">
        <ModalUser />
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full z-50 mt-2 rounded-lg border bg-background p-4 shadow-lg"
          style={{
            left: isFull ? "calc(var(--sidebar-width) + 2rem)" : "2rem",
          }}
        >
          <div className="flex w-[500px] flex-col items-start gap-4 rounded-lg [&>*]:w-full">
            <EText
              as="p"
              className="text-sm text-neutral-9"
              text="Khám phá thêm các dịch vụ của chúng tôi"
            />
            <ScrollArea className="h-[240px]">
              <div className="flex flex-wrap">
                {listItems
                  .filter((item) => item.show)
                  .map((item, i) => (
                    <AppItem key={i} app={item} />
                  ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
}
