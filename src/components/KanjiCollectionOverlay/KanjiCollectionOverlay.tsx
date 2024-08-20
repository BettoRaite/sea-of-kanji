import styles from "./kanjiCollectionOverlay.module.css";
import { useKanjiCollectionContext } from "../KanjiCollectionProvider/KanjiCollectionProvider";
import { KanjiEntry } from "../KanjiEntry/KanjiEntry";
import favoriteIcon from "/icons/favorite-filled.svg";

type KanjiCollectionOverlayProps = {
  isHidden: boolean;
};
export function KanjiCollectionOverlay({
  isHidden,
}: KanjiCollectionOverlayProps) {
  const { kanjiCollection } = useKanjiCollectionContext();

  return (
    <section
      className={`${styles.mainLayout} ${isHidden && styles.mainLayoutHidden}`}
    >
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Your kanji collection</h2>
        <img src={favoriteIcon} alt="A kanji collection." />
      </div>
      <div className={styles.entriesLayout}>
        {kanjiCollection?.map((k) => {
          return <KanjiEntry key={k.id} kanji={k} />;
        })}
      </div>
    </section>
  );
}
