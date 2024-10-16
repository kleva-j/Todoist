import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { Providers } from "@/components/providers";
import { geistMono, geistSans } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Todoist",
  description: "Ai-powered task management app.",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
