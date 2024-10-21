import NextLink from "next/link";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site.config";

const signInLink = siteConfig.navigations.links["sign-in"];
const dashboardLink = siteConfig.navigations.links["dashboard"];

export async function Header() {
  return (
    <header className="bg-white shadow-sm dark:bg-black">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
          {siteConfig.name}
        </h1>
        <div className="flex items-center gap-x-4">
          <SignedIn>
            <div className="flex items-center gap-x-4">
              <Button asChild variant="secondary">
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
            <Button asChild variant="secondary">
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
