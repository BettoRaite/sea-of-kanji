import type { KanjiItem } from "../../utils/types";
import { useKanjiCollectionHandler } from "../KanjiCollectionProvider/KanjiCollectionProvider";
import styles from "./kanjiEntry.module.css";
import removeIcon from "/icons/remove.svg";
import moreIcon from "/icons/morevert.svg";
import { Card } from "../Card/Card";
import { useState } from "react";

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
            <img src={moreIcon} alt="show kanji details" />
          </button>
        </div>

        <button
          className={styles.removeButton}
          type="button"
          onClick={handleForget}
        >
          <img src={removeIcon} alt="remove kanji from collection" />
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
