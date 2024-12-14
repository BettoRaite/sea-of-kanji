import type { KanjiItem } from "../../utils/types";
import { useKanjiCollectionHandler } from "../KanjiCollectionProvider/KanjiCollectionProvider";
import styles from "./kanjiEntry.module.css";
import { MdMore } from "react-icons/md";
import { Card } from "../Card/Card";
import { useState } from "react";
import { MdRemove } from "react-icons/md";

export type KanjiEntryProps = {
  kanji: KanjiItem;
};

export function KanjiEntry({ kanji }: KanjiEntryProps) {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const handler = useKanjiCollectionHandler();

  function handleForget() {
    if (kanji.id) {
      handler.forget(kanji.id);
    }
  }

  function handleShowKanjiDetails() {
    setIsCardVisible(!isCardVisible);
  }

  return (
    <div>
      <div className={styles.entryLayout}>
        <div className={styles.characterButtonLayout}>
          <p className={styles.kanji}>{kanji.character}</p>
          <button
            className={styles.showDetailsButton}
            type="button"
            onClick={handleShowKanjiDetails}
          >
            <MdMore title="show kanji details" />
          </button>
        </div>

        <button
          className={styles.removeButton}
          type="button"
          onClick={handleForget}
        >
          <MdRemove title="remove kanji from collection" />
        </button>
      </div>
      <div
        className={`${styles.cardWrapper} ${
          isCardVisible && styles.cardWrapperExpanded
        }`}
      >
        <Card kanjiItem={kanji} />
      </div>
    </div>
  );
}
