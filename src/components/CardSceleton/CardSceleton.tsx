import styles from "./card.module.css";
import type { Kanji } from "../../utils/types";

export type CardProps = {
  kanji: Kanji;
};

export function CardSceleton() {
  return <div className={styles.card} />;
}
