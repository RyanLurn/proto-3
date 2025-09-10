import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_CONVEX_URL: z.url()
  },
  runtimeEnv: {
    NEXT_PUBLIC_CONVEX_URL: process.env["NEXT_PUBLIC_CONVEX_URL"]
  }
});

export { clientEnv };
