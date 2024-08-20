import styles from "./card.module.css";
import { useKanjiCollectionHandler } from "../KanjiCollectionProvider/KanjiCollectionProvider";
import favoriteIcon from "/icons/favorite-filled.svg";
import type { KanjiItem } from "../../utils/types";
import { useKanjiCollectionContext } from "../KanjiCollectionProvider/KanjiCollectionProvider";
import chevronUpIcon from "/icons/chevron-up.svg";
import { useState } from "react";

export type CardProps = {
  kanjiItem: KanjiItem;
};

type ContentType = "words" | "miscs" | "meanings" | "";

function extractKanjiItemWords(kanjiItem: KanjiItem): string[] {
  const words = kanjiItem.words;
  const wordMeaning = [];

  for (const word of words) {
    for (const kanji of word.kanji) {
      if (kanji.includes(kanjiItem.character)) {
        wordMeaning.push(`${kanji} - ${word.meanings.join(", ")}`);
      }
      break;
    }
  }

  return wordMeaning;
}
export function Card({ kanjiItem }: CardProps) {
  const [expandedContent, setExpandedContent] = useState<ContentType>("");

  const kanjiHandler = useKanjiCollectionHandler();
  const { kanjiIdsMap = {} } = useKanjiCollectionContext();
  function handleSave() {
    kanjiHandler.save(kanjiItem);
  }

  function handleForget() {
    if (typeof kanjiItem.id === "number") {
      kanjiHandler.forget(kanjiItem.id);
    }
  }

  function handleExpandContent(contentType: ContentType) {
    setExpandedContent(contentType === expandedContent ? "" : contentType);
  }

  const isSaved = kanjiIdsMap[kanjiItem.id ?? ""];
  const kanjiWords = extractKanjiItemWords(kanjiItem);
  return (
    <div className={styles.card}>
      {!kanjiItem.saved && (
        <button
          className={`${styles.button} ${isSaved && styles.buttonSaved}`}
          type="button"
          onClick={isSaved ? handleForget : handleSave}
        >
          <img src={favoriteIcon} alt="save kanji" />
        </button>
      )}

      {kanjiItem.saved && (
        <button className={styles.button} type="button" onClick={handleForget}>
          <img src={""} alt="forget kanji" />
        </button>
      )}

      <div className={styles.topLayout}>
        {/* <p>{kanji.jlpt}</p> */}
        <p className={styles.kanji}>{kanjiItem.character}</p>
        <section className={styles.readingsLayout}>
          <h4
            className={styles.sectionHeader}
            style={{
              padding: "1rem",
            }}
          >
            Readings
          </h4>
          {kanjiItem.kunyomi && (
            <div>
              <span className={styles.readingHint}>Kun</span>
              <p className={styles.reading}>{kanjiItem.kunyomi}</p>
            </div>
          )}
          {kanjiItem.onyomi && (
            <div>
              <span className={styles.readingHint}>On</span>
              <p className={styles.reading}>{kanjiItem.onyomi}</p>
            </div>
          )}
        </section>
      </div>

      <section className={styles.sectionLayout}>
        <button
          className={styles.toggleButton}
          type="button"
          onClick={() => handleExpandContent("meanings")}
        >
          <h4
            className={`${styles.sectionHeader} ${
              expandedContent === "meanings" && styles.sectionHeaderExpanded
            } ${styles.meaningsHeader}`}
            style={{
              padding: "1rem",
            }}
          >
            <img src={chevronUpIcon} alt="expand section" />
            Meanings
          </h4>
        </button>

        <div
          className={`${styles.contentWrapper} ${
            expandedContent === "meanings" && styles.contentWrapperExpanded
          }`}
        >
          {kanjiItem.meanings.map((meaning, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <p className={styles.contentField} key={i}>
              {meaning}
            </p>
          ))}
        </div>
      </section>

      <section className={styles.sectionLayout}>
        <button
          className={styles.toggleButton}
          type="button"
          onClick={() => handleExpandContent("words")}
        >
          <h4
            className={`${styles.sectionHeader} ${
              expandedContent === "words" && styles.sectionHeaderExpanded
            }`}
          >
            <img src={chevronUpIcon} alt="expand section" />
            Words
          </h4>
        </button>

        <div
          className={`${styles.contentWrapper} ${
            expandedContent === "words" && styles.contentWrapperExpanded
          } ${kanjiWords.length === 0 && styles.contentWrapperEmpty}`}
        >
          {kanjiWords.map((w, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <p className={styles.contentField} key={i}>
              {w}
            </p>
          ))}
        </div>
      </section>

      <section className={styles.sectionLayout}>
        <button
          className={styles.toggleButton}
          type="button"
          onClick={() => handleExpandContent("miscs")}
        >
          <h4
            className={`${styles.sectionHeader} ${
              expandedContent === "miscs" && styles.sectionHeaderExpanded
            }`}
          >
            <img src={chevronUpIcon} alt="expand section" />
            Miscs
          </h4>
        </button>

        <div
          className={`${styles.contentWrapper} ${
            expandedContent === "miscs" && styles.contentWrapperExpanded
          }`}
        >
          {kanjiItem.freq && (
            <p className={styles.contentField}>Frequency: {kanjiItem.freq}</p>
          )}
          {kanjiItem.strokes && (
            <p className={styles.contentField}>Strokes: {kanjiItem.strokes}</p>
          )}
          {kanjiItem.grade && (
            <p className={styles.contentField}>Grade: {kanjiItem.grade}</p>
          )}
        </div>
      </section>
    </div>
  );
}
