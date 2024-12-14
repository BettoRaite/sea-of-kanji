import type { WordItem } from "./definitions";

export const setNextReviewTime = (word: WordItem, answerQuality: number) => {
  const minCorrectResponse = 3;
  const minEaseFactor = 1.3;
  const { reps, interval, easeFactor } = word;
  if (answerQuality >= minCorrectResponse) {
    switch (reps) {
      case 0:
        word.interval = 1;
        break;
      case 1:
        word.interval = 6;
        break;
      default:
        word.interval = Math.round(interval * easeFactor);
    }
    word.reps += 1;
    // SM2 Algo formula
    word.easeFactor =
      easeFactor +
      (0.1 - (5 - answerQuality) * (0.08 + (5 - answerQuality) * 0.02));
  } else {
    word.reps = 0;
    word.interval = 1;
  }

  if (word.easeFactor < minEaseFactor) {
    word.easeFactor = minEaseFactor;
  }

  return word;
};
