import type { KanjiItem } from "../../utils/types";
import { useSavedKanjiHandler } from "../SavedKanjiProvider/KanjiProvider";
import styles from "./kanjiEntry.module.css";
import removeIcon from "/icons/remove.svg";

export type KanjiEntryProps = {
  kanji: KanjiItem;
};
export function KanjiEntry({ kanji }: KanjiEntryProps) {
  const handler = useSavedKanjiHandler();

  function handleForget() {
    if (kanji.id) {
      handler.forget(kanji.id);
    }
  }

  return (
    <section className={styles.layout}>
      <div className={styles.characterButtonLayout}>
        <p className={styles.kanji}>{kanji.character}</p>
        <button type="button">Look</button>
      </div>

      <button
        className={styles.removeButton}
        type="button"
        onClick={handleForget}
      >
        <img src={removeIcon} alt="remove kanji from collection" />
      </button>
    </section>
  );
}
