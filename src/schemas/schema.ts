import { z } from "zod";

export const apiResponse = z.object({
  items: z.array(z.object({})),
  metadata: z.object({
    pages: z.number(),
  }),
});
