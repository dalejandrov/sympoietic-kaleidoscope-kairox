import { TRPCError } from "@trpc/server";

const DEFAULT_SAFE_MESSAGE =
  "Ocurrió un error inesperado. Intenta de nuevo en unos segundos.";

type ServerSafeErrorOptions<TCode extends string> = {
  code: TCode;
  publicMessage: string;
  cause?: unknown;
};

export class ServerSafeError<TCode extends string = string> extends Error {
  readonly code: TCode;
  readonly cause?: unknown;
  readonly publicMessage: string;

  constructor({ code, publicMessage, cause }: ServerSafeErrorOptions<TCode>) {
    super(publicMessage);
    this.name = "ServerSafeError";
    this.code = code;
    this.cause = cause;
    this.publicMessage = publicMessage;
  }
}

export function toSafeTrpcError(
  error: unknown,
  fallbackMessage = DEFAULT_SAFE_MESSAGE,
) {
  if (error instanceof TRPCError) {
    return error;
  }

  if (error instanceof ServerSafeError) {
    return new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.publicMessage,
      cause: error,
    });
  }

  return new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: fallbackMessage,
  });
}
