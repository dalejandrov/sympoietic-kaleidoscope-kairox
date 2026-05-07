import { TRPCError } from "@trpc/server";
import { describe, expect, it } from "vitest";
import { ServerSafeError, toSafeTrpcError } from "@/server/errors";

describe("server safe errors", () => {
  it("keeps internal details in the cause, not in the public message", () => {
    const internalError = new Error("401 invalid_api_key secret detail");
    const serviceError = new ServerSafeError({
      code: "PROVIDER_FAILED",
      publicMessage: "El proveedor no respondió.",
      cause: internalError,
    });

    expect(serviceError.cause).toBe(internalError);
    expect(serviceError.publicMessage).toBe("El proveedor no respondió.");
    expect(serviceError.publicMessage).not.toContain("invalid_api_key");
  });

  it("maps safe errors to tRPC without exposing raw causes", () => {
    const trpcError = toSafeTrpcError(
      new ServerSafeError({
        code: "PROVIDER_FAILED",
        publicMessage: "El proveedor no respondió.",
        cause: new Error("raw provider failure"),
      }),
    );

    expect(trpcError).toBeInstanceOf(TRPCError);
    expect(trpcError.message).toBe("El proveedor no respondió.");
    expect(trpcError.message).not.toContain("raw provider failure");
  });
});
