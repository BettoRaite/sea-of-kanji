import styles from "./savedOverlay.module.css";
import { useSavedKanjiContext } from "../SavedKanjiProvider/KanjiProvider";
import { KanjiEntry } from "../KanjiEntry/KanjiEntry";
import favoriteIcon from "/icons/favorite-filled.svg";

type SavedOverlayProps = {
  isHidden: boolean;
};
export function SavedOverlay({ isHidden }: SavedOverlayProps) {
  const { savedKanji } = useSavedKanjiContext();

  return (
    <section
      className={`${styles.mainLayout} ${isHidden && styles.mainLayoutHidden}`}
    >
      <h2>
        Your kanji collection
        <img src={favoriteIcon} alt="A kanji collection." />
      </h2>
      <div className={styles.entriesLayout}>
        {savedKanji?.map((k) => {
          return <KanjiEntry key={k.id} kanji={k} />;
        })}
      </div>
    </section>
  );
}
