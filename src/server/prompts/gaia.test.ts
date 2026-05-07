import { describe, expect, it } from "vitest";
import { buildGaiaInput, SYSTEM_PROMPT_GAIA } from "@/server/prompts/gaia";

describe("GaIA prompt", () => {
  it("keeps the old system prompt contract", () => {
    expect(SYSTEM_PROMPT_GAIA).toContain("Eres **GaIA**");
    expect(SYSTEM_PROMPT_GAIA).toContain("110‑130 palabras");
    expect(SYSTEM_PROMPT_GAIA).toContain("<ECO_QUOTE>");
    expect(SYSTEM_PROMPT_GAIA).toContain("No expliques tu proceso");
  });

  it("builds semantic input tags for the model", () => {
    expect(
      buildGaiaInput({
        memory: "Vi lluvia sobre concreto caliente",
        chapter: "megalopolis_de_sombras",
        envData: {
          temp: 31,
          co2: 612,
          pm25: 18,
          humidity: 64,
        },
        ecoQuote: "La ciudad late, pero ya no respira.",
      }),
    ).toBe(`<CHAPTER>: Megalópolis de Sombras
<CHAPTER_ID>: megalopolis_de_sombras
<MEMORY>: "Vi lluvia sobre concreto caliente"
<ENV_DATA>: temp=31°C, CO2=612ppm, PM25=18µg/m³, humedad=64%
<ECO_QUOTE>: "La ciudad late, pero ya no respira."`);
  });
});
