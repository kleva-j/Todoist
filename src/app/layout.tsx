import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { geistMono, geistSans } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import { ClerkProvider } from "@clerk/nextjs";
import { env } from "env.mjs";

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
        <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
          <Providers>{children}</Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
