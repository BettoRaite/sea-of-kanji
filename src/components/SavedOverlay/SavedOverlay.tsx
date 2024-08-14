import styles from "./savedOverlay.module.css";
import { useSavedKanjiContext } from "../SavedKanjiProvider/KanjiProvider";
import { CardsList } from "../CardsList/CardsList";

type SavedOverlayProps = {
  isHidden: boolean;
};
export function SavedOverlay({ isHidden }: SavedOverlayProps) {
  const { savedKanji } = useSavedKanjiContext();

  return (
    <div
      className={`${styles.mainLayout} ${isHidden && styles.mainLayoutHidden}`}
    >
      <CardsList kanjiList={savedKanji ?? []} />
    </div>
  );
}
