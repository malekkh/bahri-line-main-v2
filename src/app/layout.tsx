import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

const gotham = localFont({
  src: [
    {
      path: "../fonts/gotham-light-webfont.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/gotham-book-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/gotham-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/gotham-bold-webfont.woff2",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${gotham.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
