import type { KanjiItem as K } from "kanjibreak-api-types";

export interface KanjiItem extends K {
  saved?: boolean;
}

export type SavedKanjiMap = Record<string, boolean>;
