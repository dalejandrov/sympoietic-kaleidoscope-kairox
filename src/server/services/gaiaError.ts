import { ServerSafeError } from "@/server/errors";

type GaiaErrorCode = "OPENAI_UNAVAILABLE" | "EMPTY_RESPONSE";

const gaiaSafeMessages = {
  OPENAI_UNAVAILABLE:
    "GaIA no pudo conectar con OpenAI. Revisa la configuración del servidor.",
  EMPTY_RESPONSE:
    "GaIA no logró estabilizar una respuesta. Intenta generar el relato de nuevo.",
} satisfies Record<GaiaErrorCode, string>;

export function createGaiaServiceError(code: GaiaErrorCode, cause?: unknown) {
  return new ServerSafeError({
    code,
    publicMessage: gaiaSafeMessages[code],
    cause,
  });
}

export const GAIA_FALLBACK_ERROR_MESSAGE =
  "GaIA encontró una interferencia temporal. Intenta generar el relato de nuevo.";
