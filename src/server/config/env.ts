import { z } from "zod";

const serverEnvSchema = z.object({
  OPENAI_API_KEY: z.string().trim().optional(),
  OPENAI_MODEL: z.string().trim().default("gpt-5.2"),
});

export function getServerEnv() {
  const env = serverEnvSchema.parse({
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || undefined,
    OPENAI_MODEL: process.env.OPENAI_MODEL || undefined,
  });

  return {
    ...env,
    hasOpenAiApiKey: Boolean(env.OPENAI_API_KEY),
  };
}
