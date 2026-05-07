import { describe, expect, it } from "vitest";
import { chapters, formatEnvData, getChapter } from "@/lib/chapters";

describe("chapters", () => {
  it("preserves the complete quote catalog migrated from old", () => {
    expect(chapters).toHaveLength(7);

    for (const chapter of chapters) {
      expect(chapter.quotes.length).toBeGreaterThan(20);
    }
  });

  it("formats environmental data like the old prompt expected", () => {
    expect(
      formatEnvData({
        temp: 31,
        co2: 612,
        pm25: 18,
        humidity: 64,
      }),
    ).toBe("temp=31°C, CO2=612ppm, PM25=18µg/m³, humedad=64%");
  });

  it("returns a valid fallback chapter", () => {
    expect(getChapter("bosque_de_cristal").name).toBe("Bosque de Cristal");
  });
});
