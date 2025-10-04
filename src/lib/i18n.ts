import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { locales } from '@/constants/languages';
export const defaultLocale = 'vi';
export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    timeZone: 'Asia/Ho_Chi_Minh',
    messages: {
      ...(await import(`../locales/${locale}/common.json`)).default,
      ...(await import(`../locales/${locale}/layout.json`)).default,
      ...(await import(`../locales/${locale}/dashboard.json`)).default,
      ...(await import(`../locales/${locale}/attendance.json`)).default,
    },
  };
});