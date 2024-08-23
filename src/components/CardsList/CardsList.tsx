import { Card } from "../Card/Card";
import styles from "./cardsList.module.css";
import type { KanjiItem } from "../../utils/types";
import { CardSceleton } from "../CardSceleton/CardSceleton";

export type CardsListProps = {
  kanjiList: KanjiItem[];
  cardSceletons: number;
};

export function CardsList({ kanjiList, cardSceletons }: CardsListProps) {
  const cards = [];

  for (const kanji of kanjiList) {
    cards.push(<Card key={kanji.id} kanjiItem={kanji} />);
  }

  for (let i = 0; i < cardSceletons; ++i) {
    cards.push(<CardSceleton key={i} />);
  }

  return <div className={styles.cardsLayout}>{cards}</div>;
}
