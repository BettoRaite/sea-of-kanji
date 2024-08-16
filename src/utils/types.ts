import type { InsertKanji } from "../schema/schema";

export interface Kanji extends InsertKanji {
  saved?: boolean;
}

export type SavedKanjiMap = Record<string, boolean>;
