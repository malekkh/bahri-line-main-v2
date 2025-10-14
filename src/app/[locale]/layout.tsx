import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

const gotham = localFont({
  src: [
    {
      path: "../../fonts/gotham-light-webfont.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/gotham-book-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/gotham-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/gotham-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gotham",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Bahri Line",
  description: "Modern Next.js application with TypeScript and React Query",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Locale = 'en' | 'ar';

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body
        className={`${gotham.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

