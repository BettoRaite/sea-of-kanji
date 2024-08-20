import type { KanjiItem } from "../../utils/types";
import { useKanjiCollectionHandler } from "../KanjiCollectionProvider/KanjiCollectionProvider";
import styles from "./kanjiEntry.module.css";
import removeIcon from "/icons/remove.svg";
import lookIcon from "/icons/look.svg";

export type KanjiEntryProps = {
  kanji: KanjiItem;
};
export function KanjiEntry({ kanji }: KanjiEntryProps) {
  const handler = useKanjiCollectionHandler();

  function handleForget() {
    if (kanji.id) {
      handler.forget(kanji.id);
    }
  }

  return (
    <section className={styles.layout}>
      <div className={styles.characterButtonLayout}>
        <p className={styles.kanji}>{kanji.character}</p>
        <button type="button">
          <img src={lookIcon} alt="take a look at kanji card" />
        </button>
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
