import { describe, expect, it } from "vitest";
import { chapters } from "@/lib/chapters";
import { createGaiaRequest } from "@/lib/gaiaRequest";

describe("createGaiaRequest", () => {
  it("builds a complete client request for GaIA", () => {
    const request = createGaiaRequest("Una memoria breve", "arrecife_cantor");
    const chapter = chapters.find((item) => item.id === request.chapter);

    expect(request.memory).toBe("Una memoria breve");
    expect(request.chapter).toBe("arrecife_cantor");
    expect(request.chapterName).toBe("Arrecife Cantor");
    expect(chapter?.quotes).toContain(request.ecoQuote);
    expect(request.envData.temp).toBeGreaterThanOrEqual(-20);
    expect(request.envData.co2).toBeGreaterThanOrEqual(350);
  });
});
