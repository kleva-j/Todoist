"use client";

import type { PropsWithChildren } from "react";

import { ConvexProvider, ConvexReactClient } from "convex/react";

import { env } from "env.mjs";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: PropsWithChildren) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
