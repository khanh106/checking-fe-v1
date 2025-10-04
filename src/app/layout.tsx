"use client";

import "./globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import LeftSidebar from "@/components/Layout/LeftSidebar/LeftSidebar";
import Header from "@/components/Layout/Header/Header";
import AppProvider from "@/providers/app-provider";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState("vi");
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const commonMessages = await import(`@/locales/${locale}/common.json`);
        const dashboardMessages = await import(
          `@/locales/${locale}/dashboard.json`
        );
        const attendanceMessages = await import(
          `@/locales/${locale}/attendance.json`
        );
        const workLocationMessages = await import(
          `@/locales/${locale}/work-location.json`
        );
        const guideMessages = await import(`@/locales/${locale}/guide.json`);

        setMessages({
          ...commonMessages.default,
          ...dashboardMessages.default,
          ...attendanceMessages.default,
          ...workLocationMessages.default,
          ...guideMessages.default,
        });
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    loadMessages();
  }, [locale]);

  return (
    <html lang="vi">
      <body>
        <AppProvider messages={messages} locale={locale}>
          <SidebarProvider
            className="block"
            style={{ "--sidebar-width": "11rem" } as React.CSSProperties}
          >
            <header className="fixed top-0 left-0 right-0 z-50 flex h-16 w-full shrink-0 items-center gap-2 border-b bg-white px-4">
              <Header />
            </header>
            <div className="flex h-screen">
              <LeftSidebar />
              <main className="flex-1 overflow-y-auto p-4 pt-20 transition-all duration-300 ease-in-out delay-100 peer-data-[state=expanded]:delay-0 md:pl-[var(--sidebar-width-icon)] peer-data-[state=expanded]:md:pl-[var(--sidebar-width)]">
                {children}
              </main>
            </div>
          </SidebarProvider>
        </AppProvider>
      </body>
    </html>
  );
}
