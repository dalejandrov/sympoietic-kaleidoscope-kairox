import { describe, expect, it } from "vitest";
import { gaiaGenerateInputSchema } from "@/server/routers/gaiaSchema";

describe("gaiaGenerateInputSchema", () => {
  it("accepts a valid generation request", () => {
    const parsed = gaiaGenerateInputSchema.parse({
      memory: "Una memoria",
      chapter: "bosque_de_cristal",
      envData: {
        temp: 25,
        co2: 500,
        pm25: 12,
        humidity: 80,
      },
      ecoQuote: "Los árboles de sílice cantan cuando el tiempo se fractura.",
    });

    expect(parsed.memory).toBe("Una memoria");
  });

  it("rejects memories longer than the old UI limit", () => {
    expect(() =>
      gaiaGenerateInputSchema.parse({
        memory: "x".repeat(241),
        chapter: "bosque_de_cristal",
        envData: {
          temp: 25,
          co2: 500,
          pm25: 12,
          humidity: 80,
        },
        ecoQuote: "Los árboles de sílice cantan cuando el tiempo se fractura.",
      }),
    ).toThrow();
  });
});
