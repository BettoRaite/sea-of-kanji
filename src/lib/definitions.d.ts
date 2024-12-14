import type { Word } from "kanjibreak-api-types";

export interface WordItem extends Word {
  reps: number;
  easeFactor: number;
  interval: number;
  nextReview: number; // number of ms
  prevReview: number; // number of ms
}

export type WordCollection = {
  collectionId: string;
  words: WordItem[];
  name: string;
  maxWords: number;
  description?: string;
  ownerId?: string;
  isPublic?: boolean;
  tags?: string[];
  wordCount?: number;
  createAt: number;
  updateAt: number;
};
