import { CardSceleton } from "../CardSceleton/CardSceleton";
import styles from "./cardsList.module.css";

export function CardsListSceleton() {
  const cards = [];
  for (let i = 0; i < 20; ++i) {
    cards.push(<CardSceleton />);
  }
  return <div className={styles.cardsLayout}>{cards}</div>;
}
