import type { InsertKanji } from "../schema/schema";

export interface KanjiItem extends InsertKanji {
  words: {
    id: number;
    kanji: string[];
    kana: string[];
    meanings: string[];
  }[];
  saved?: boolean;
}

export type SavedKanjiMap = Record<string, boolean>;
