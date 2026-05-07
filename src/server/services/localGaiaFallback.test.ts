import { describe, expect, it } from "vitest";
import { createLocalGaiaNarrative } from "@/server/services/localGaiaFallback";

describe("createLocalGaiaNarrative", () => {
  it("returns one paragraph that preserves the eco quote", () => {
    const text = createLocalGaiaNarrative({
      memory: "Recordé un patio con sombra",
      chapter: "bosque_de_cristal",
      envData: {
        temp: 28,
        co2: 700,
        pm25: 20,
        humidity: 50,
      },
      ecoQuote:
        "Aquí los árboles son espejos; mírate antes de dar el siguiente paso.",
    });

    expect(text).toContain(
      "*Aquí los árboles son espejos; mírate antes de dar el siguiente paso.*",
    );
    expect(text).not.toContain("\n");
    expect(text).toContain("futuro posible mejor");
  });
});
