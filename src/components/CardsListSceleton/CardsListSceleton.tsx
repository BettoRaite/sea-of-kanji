import { CardSceleton } from "../CardSceleton/CardSceleton";
import styles from "../CardsList/cardsList.module.css";
import { useEffect } from "react";

export function CardsListSceleton() {
  const prevScrollY = window.scrollY;
  useEffect(() => {
    window.scrollTo(0, prevScrollY);
  });
  const cards = [];
  for (let i = 0; i < 100; ++i) {
    cards.push(<CardSceleton key={i} />);
  }
  return (
    <div
      className={styles.cardsLayout}
      style={{
        marginTop: "1rem",
      }}
    >
      {cards}
    </div>
  );
}
