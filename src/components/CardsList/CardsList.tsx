import { Card } from "../Card/Card";
import styles from "./cardsList.module.css";
import { Kanji } from "../../utils/types";

export type CardsListProps = {
  kanjiList: Kanji[];
};
export function CardsList({ kanjiList }: CardsListProps) {
  return (
    <div className={styles.cardsLayout}>
      {kanjiList.map((kanji) => {
        return <Card key={kanji.id} kanji={kanji} />;
      })}
    </div>
  );
}
