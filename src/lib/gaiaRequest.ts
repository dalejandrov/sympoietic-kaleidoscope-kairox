import {
  type ChapterId,
  chapters,
  getChapter,
  getRandomEnvData,
} from "@/lib/chapters";

export function createGaiaRequest(memory: string, chapter: ChapterId) {
  const selectedChapter = getChapter(chapter);
  const envData = getRandomEnvData();
  const ecoQuote =
    selectedChapter.quotes[
      Math.floor(Math.random() * selectedChapter.quotes.length)
    ];

  return {
    memory,
    chapter,
    chapterName: selectedChapter.name,
    envData,
    ecoQuote,
  };
}

export function getInitialChapter() {
  return chapters[0].id;
}
