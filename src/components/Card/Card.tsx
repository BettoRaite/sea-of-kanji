import styles from "./card.module.css";
import { useSavedKanjiHandler } from "../SavedKanjiProvider/KanjiProvider";
import favoriteIcon from "/favorite-icon.svg";
import { Kanji } from "../../utils/types";
import { useSavedKanjiContext } from "../SavedKanjiProvider/KanjiProvider";

export type CardProps = {
  kanji: Kanji;
};

export function Card({ kanji }: CardProps) {
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

      <div className={styles.mainInfoLayout}>
        <p className={styles.character}>{kanji.character}</p>
        <p>{kanji.meanings}</p>
      </div>

      <div className={styles.readings}>
        <p>{kanji.kunyomi}</p>
        <p>{kanji.onyomi}</p>
      </div>
      <p>{kanji.jlpt}</p>
      <p>{kanji.freq}</p>
      <p>{kanji.strokes}</p>
    </div>
  );
}
