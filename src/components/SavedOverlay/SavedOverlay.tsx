import styles from "./savedOverlay.module.css";
import { useSavedKanjiContext } from "../SavedKanjiProvider/KanjiProvider";
import { CardsList } from "../CardsList/CardsList";

type SavedOverlayProps = {
  isHidden: boolean;
};
export function SavedOverlay({ isHidden }: SavedOverlayProps) {
  const { savedKanji } = useSavedKanjiContext();

  return (
    <section
      className={`${styles.mainLayout} ${isHidden && styles.mainLayoutHidden}`}
    >
      <h2>A list of safed kanji.</h2>
      <CardsList kanjiList={savedKanji ?? []} />
    </section>
  );
}
