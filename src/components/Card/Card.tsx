import styles from "./card.module.css";
import { useSavedKanjiHandler } from "../SavedKanjiProvider/KanjiProvider";
import favoriteIcon from "/icons/favorite-filled.svg";
import type { Kanji } from "../../utils/types";
import { useSavedKanjiContext } from "../SavedKanjiProvider/KanjiProvider";
import chevronUpIcon from "/icons/chevron-up.svg";
import { useState } from "react";

export type CardProps = {
  kanji: Kanji;
};

type ContentType = "words" | "miscs" | "";
export function Card({ kanji }: CardProps) {
  const [expandedContent, setExpandedContent] = useState<ContentType>("");

  const kanjiHandler = useSavedKanjiHandler();
  const { savedKanjiMap = {} } = useSavedKanjiContext();

  function handleSave() {
    kanjiHandler.save(kanji);
  }

  function handleForget() {
    if (typeof kanji.id === "number") {
      kanjiHandler.forget(kanji.id);
    }
  }

  function handleExpandContent(contentType: ContentType) {
    setExpandedContent(contentType === expandedContent ? "" : contentType);
  }

  const isSaved = savedKanjiMap[kanji.id ?? ""];

  return (
    <div className={styles.card}>
      {!kanji.saved && (
        <button
          className={`${styles.button} ${isSaved && styles.buttonSaved}`}
          type="button"
          onClick={handleSave}
        >
          <img src={favoriteIcon} alt="save kanji" />
        </button>
      )}

      {kanji.saved && (
        <button className={styles.button} type="button" onClick={handleForget}>
          <img src={""} alt="forget kanji" />
        </button>
      )}

      <div className={styles.topLayout}>
        {/* <p>{kanji.jlpt}</p> */}
        <p className={styles.kanji}>{kanji.character}</p>
        <section className={styles.readingsLayout}>
          <h4
            className={styles.sectionHeader}
            style={{
              padding: "1rem",
            }}
          >
            Readings
          </h4>
          {kanji.kunyomi && (
            <div>
              <span className={styles.readingHint}>Kun</span>
              <p className={styles.reading}>{kanji.kunyomi}</p>
            </div>
          )}
          {kanji.onyomi && (
            <div>
              <span className={styles.readingHint}>On</span>
              <p className={styles.reading}>{kanji.onyomi}</p>
            </div>
          )}
        </section>
      </div>

      <section className={styles.readingsLayout}>
        <span className={styles.readingHint}>Meanings</span>
        {kanji.meanings.map((meaning, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <p key={i}>{meaning}</p>
        ))}
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
          }`}
        >
          Words
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
          {kanji.freq && (
            <p className={styles.contentField}>Frequency: {kanji.freq}</p>
          )}
          {kanji.strokes && (
            <p className={styles.contentField}>Strokes: {kanji.strokes}</p>
          )}
          {kanji.grade && (
            <p className={styles.contentField}>Grade: {kanji.grade}</p>
          )}
        </div>
      </section>
    </div>
  );
}
