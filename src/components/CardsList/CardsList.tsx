import { Card } from "../Card/Card";
import styles from "./cardsList.module.css";
import type { KanjiItem } from "../../utils/types";
import { CardSceleton } from "../CardSceleton/CardSceleton";
import { PAGE_SIZE } from "../../hooks/useFetch";

export type CardsListProps = {
  kanjiList: KanjiItem[];
  isLoading: boolean;
};

export function CardsList({ kanjiList, isLoading }: CardsListProps) {
  const cards = [];
  for (const kanji of kanjiList) {
    cards.push(<Card key={kanji.id} kanjiItem={kanji} />);
  }

  if (isLoading) {
    for (let i = 0; i < PAGE_SIZE; ++i) {
      cards.push(<CardSceleton key={i} />);
    }
  }

  return <div className={styles.cardsLayout}>{cards}</div>;
}
