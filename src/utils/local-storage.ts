import { Kanji } from "./types";
import { SavedKanjiMap } from "./types";

export type KanjiData = {
  kanji: Kanji[];
  savedKanjiMap: SavedKanjiMap;
};

const SAVED_KANJI_KEY = "SAVED_KANJI_KEY";
const SAVED_KANJI_MAP_KEY = "SAVED_KANJI_MAP_KEY";

export function loadSavedKanji(): KanjiData {
  try {
    const localStorage = window.localStorage;
    const savedKanjiJSON = localStorage.getItem(SAVED_KANJI_KEY);
    const savedKanjiMapJSON = localStorage.getItem(SAVED_KANJI_MAP_KEY);

    if (!savedKanjiJSON || !savedKanjiMapJSON) {
      throw new TypeError(
        `savedKanjiJSON value: ${savedKanjiJSON}\nsavedKanjiMapJSON value: ${savedKanjiMapJSON} must not be null.`
      );
    }

    return {
      kanji: JSON.parse(savedKanjiJSON),
      savedKanjiMap: JSON.parse(savedKanjiMapJSON),
    };
  } catch (error) {
    console.error("Failed to load kanji data:", error);
    return {
      kanji: [],
      savedKanjiMap: {},
    };
  }
}

export function saveKanjiData({ kanji, savedKanjiMap }: KanjiData) {
  try {
    const localStorage = window.localStorage;
    localStorage.setItem(SAVED_KANJI_KEY, JSON.stringify(kanji));
    localStorage.setItem(SAVED_KANJI_MAP_KEY, JSON.stringify(savedKanjiMap));
  } catch (error) {
    console.error("Failed to save kanji data:", error);
  }
}
