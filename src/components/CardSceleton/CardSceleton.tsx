import styles from "./cardSceleton.module.css";
import type { KanjiItem } from "../../utils/types";

export type CardProps = {
  kanji: KanjiItem;
};

export function CardSceleton() {
  return (
    <div className={styles.card}>
      <div className={styles.pivot} />
    </div>
  );
}
