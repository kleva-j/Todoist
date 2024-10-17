import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CONVEX_DEPLOYMENT: z.string().min(10),
    CLERK_SECRET_KEY: z.string().min(10),
    CLERK_WEBHOOK_SECRET: z.string().min(1).max(50),
    CLERK_ISSUER_URL: z.string().url("Must be a valid URL"),
  },
  client: {
    NEXT_PUBLIC_CONVEX_URL: z.string().min(10),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(10),
  },
  runtimeEnv: {
    CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT,
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
    CLERK_ISSUER_URL: process.env.CLERK_ISSUER_URL,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
