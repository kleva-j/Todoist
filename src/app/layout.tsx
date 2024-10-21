import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { geistMono, geistSans } from "@/lib/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import { env } from "env.mjs";

import "./globals.css";

export const metadata: Metadata = {
  title: "Todoist",
  description: "AI-Powered task management app.",
};

const publishableKey = env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY! as string;

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
