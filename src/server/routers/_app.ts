import { toSafeTrpcError } from "@/server/errors";
import { gaiaGenerateInputSchema } from "@/server/routers/gaiaSchema";
import { createGaiaNarrative } from "@/server/services/gaia";
import { GAIA_FALLBACK_ERROR_MESSAGE } from "@/server/services/gaiaError";
import { publicProcedure, router } from "@/server/trpc";

export const appRouter = router({
  gaia: router({
    generate: publicProcedure
      .input(gaiaGenerateInputSchema)
      .mutation(async ({ input }) => {
        try {
          return {
            text: await createGaiaNarrative(input),
          };
        } catch (error) {
          throw toSafeTrpcError(error, GAIA_FALLBACK_ERROR_MESSAGE);
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
