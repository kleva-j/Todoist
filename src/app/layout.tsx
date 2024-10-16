import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import { geistMono, geistSans } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Todoist",
  description: "Ai-powered task management app.",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
