import { CardSceleton } from "../CardSceleton/CardSceleton";
import styles from "../CardsList/cardsList.module.css";

export function CardsListSceleton() {
  const cards = [];
  for (let i = 0; i < 100; ++i) {
    cards.push(<CardSceleton key={i} />);
  }
  return <div className={styles.cardsLayout}>{cards}</div>;
}
