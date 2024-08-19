import type { KanjiItem } from "./types";

const SAVED_KANJI_KEY = "SAVED_KANJI_KEY";

export function loadSavedKanji(): KanjiItem[] {
  try {
    const localStorage = window.localStorage;
    const savedKanjiJSON = localStorage.getItem(SAVED_KANJI_KEY) ?? "[]";

    if (!savedKanjiJSON) {
      throw new TypeError("No saved kanji data.");
    }
    return JSON.parse(savedKanjiJSON);
  } catch (error) {
    console.error("Failed to load kanji data:", error);
    return [];
  }
}

export function saveKanjiData(kanji: KanjiItem[]) {
  try {
    const localStorage = window.localStorage;
    localStorage.setItem(SAVED_KANJI_KEY, JSON.stringify(kanji));
  } catch (error) {
    console.error("Failed to save kanji data:", error);
  }
}
