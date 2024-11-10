import NextLink from "next/link";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const dashboardLink = siteConfig.navigations.links["dashboard"];
const signInLink = siteConfig.navigations.links["sign-in"];

export async function Header() {
  return (
    <header className="bg-white/20 shadow-sm dark:bg-black/10">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          {siteConfig.name}
        </h1>
        <div className="flex items-center gap-x-4">
          <SignedIn>
            <div className="flex items-center gap-x-4">
              <Button
                asChild
                variant="secondary"
                className="rounded-full animate-shimmer border border-black/20 dark:border-slate-800 bg-[linear-gradient(110deg,#f5f5f5,45%,#e5e5e5,55%,#f5f5f5)] bg-[length:200%_100%] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] text-gray-700 dark:text-slate-400"
              >
                <NextLink href={dashboardLink.href}>Dashboard</NextLink>
              </Button>
              <UserButton
                showName
                appearance={{
                  elements: {
                    userButtonTrigger:
                      "border border-zinc-300 dark:border-zinc-700 p-0.5 text-sm dark:text-white",
                  },
                }}
              />
            </div>
          </SignedIn>
          <SignedOut>
            <Button
              asChild
              variant="secondary"
              className="rounded-full animate-shimmer border border-black/20 dark:border-slate-800 bg-[linear-gradient(110deg,#f5f5f5,45%,#e5e5e5,55%,#f5f5f5)] bg-[length:200%_100%] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] text-gray-700 dark:text-slate-400"
            >
              <NextLink href={signInLink.href}>Sign in</NextLink>
            </Button>
          </SignedOut>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
