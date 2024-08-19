import { Card } from "../Card/Card";
import styles from "./cardsList.module.css";
import type { KanjiItem } from "../../utils/types";

export type CardsListProps = {
  kanjiList: KanjiItem[];
};
export function CardsList({ kanjiList }: CardsListProps) {
  return (
    <div className={styles.cardsLayout}>
      {kanjiList.map((kanji) => {
        return <Card key={kanji.id} kanjiItem={kanji} />;
      })}
    </div>
  );
}
