import { getChapter } from "@/lib/chapters";
import type { GaiaPromptInput } from "@/server/prompts/gaia";

export function createLocalGaiaNarrative(input: GaiaPromptInput) {
  const chapter = getChapter(input.chapter);
  const env = input.envData;

  return `GaIA registra tu recuerdo en el pulso de ${chapter.name}, donde un calor de ${env.temp}°C palpita como una membrana sensible, ${env.co2} ppm de CO2 flotan como partículas grises por cada millón de suspiros, ${env.pm25} µg/m³ de PM2.5 vuelven granulada la respiración y ${env.humidity}% de humedad sostiene una piel de niebla sobre Kairox. Tu memoria, "${input.memory}", entra al brazalete de Donna como una semilla temporal. *${input.ecoQuote}* La lectura no clausura el daño: lo transforma en protocolo de cuidado. Si una mano recuerda sin poseer y una ciudad escucha antes de avanzar, el planeta ensaya un futuro posible mejor.`;
}
