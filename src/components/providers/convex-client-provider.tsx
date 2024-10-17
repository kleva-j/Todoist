"use client";

import type { PropsWithChildren } from "react";

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { env } from "env.mjs";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL! as string);

export function ConvexClientProvider({ children }: PropsWithChildren) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
