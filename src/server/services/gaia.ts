import OpenAI from "openai";
import { getServerEnv } from "@/server/config/env";
import {
  buildGaiaInput,
  type GaiaPromptInput,
  SYSTEM_PROMPT_GAIA,
} from "@/server/prompts/gaia";
import { createGaiaServiceError } from "@/server/services/gaiaError";
import { createLocalGaiaNarrative } from "@/server/services/localGaiaFallback";

export async function createGaiaNarrative(input: GaiaPromptInput) {
  const env = getServerEnv();

  if (!env.hasOpenAiApiKey) {
    return createLocalGaiaNarrative(input);
  }

  const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
  });

  const response = await openai.responses
    .create({
      model: env.OPENAI_MODEL,
      instructions: SYSTEM_PROMPT_GAIA,
      input: buildGaiaInput(input),
      max_output_tokens: 260,
      temperature: 0.9,
      top_p: 1,
    })
    .catch((error: unknown) => {
      throw createGaiaServiceError("OPENAI_UNAVAILABLE", error);
    });

  const text = response.output_text?.trim();

  if (!text) {
    throw createGaiaServiceError("EMPTY_RESPONSE");
  }

  return text;
}
