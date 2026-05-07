import { chapterQuotes } from "@/lib/chapterQuotes";

export const chapters = [
  {
    id: "bosque_de_cristal",
    name: "Bosque de Cristal",
    mood: "fragilidad luminosa",
    quotes: chapterQuotes.bosque_de_cristal,
  },
  {
    id: "claro_grietas_toxicas",
    name: "Claro de Grietas Tóxicas",
    mood: "alarma mineral",
    quotes: chapterQuotes.claro_grietas_toxicas,
  },
  {
    id: "valle_e_waste",
    name: "Valle de Desechos Electrónicos",
    mood: "memoria eléctrica",
    quotes: chapterQuotes.valle_e_waste,
  },
  {
    id: "megalopolis_de_sombras",
    name: "Megalópolis de Sombras",
    mood: "sombra urbana",
    quotes: chapterQuotes.megalopolis_de_sombras,
  },
  {
    id: "arrecife_cantor",
    name: "Arrecife Cantor",
    mood: "restauración oceánica",
    quotes: chapterQuotes.arrecife_cantor,
  },
  {
    id: "cordillera_nube_semilla",
    name: "Cordillera Nube-Semilla",
    mood: "siembra atmosférica",
    quotes: chapterQuotes.cordillera_nube_semilla,
  },
  {
    id: "megalopolis_biofilica",
    name: "Megápolis Biofílica",
    mood: "ciudad respirante",
    quotes: chapterQuotes.megalopolis_biofilica,
  },
] as const;

export type ChapterId = (typeof chapters)[number]["id"];

export function getChapter(id: ChapterId) {
  return chapters.find((chapter) => chapter.id === id) ?? chapters[0];
}

export function getRandomEnvData() {
  const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    temp: randomInt(-20, 80),
    co2: randomInt(350, 1200),
    pm25: randomInt(5, 75),
    humidity: randomInt(0, 100),
  };
}

export type EnvData = ReturnType<typeof getRandomEnvData>;

export function formatEnvData(envData: EnvData) {
  return `temp=${envData.temp}°C, CO2=${envData.co2}ppm, PM25=${envData.pm25}µg/m³, humedad=${envData.humidity}%`;
}
