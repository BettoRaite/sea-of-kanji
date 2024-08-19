import styles from "./card.module.css";
import type { KanjiItem } from "../../utils/types";

export type CardProps = {
  kanji: KanjiItem;
};

export function CardSceleton() {
  return <div className={styles.card} />;
}
