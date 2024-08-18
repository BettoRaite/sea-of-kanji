import { Card } from "../Card/Card";
import styles from "./cardsList.module.css";
import type { Kanji } from "../../utils/types";

export type CardsListProps = {
  kanjiList: Kanji[];
};
export function CardsList({ kanjiList }: CardsListProps) {
  return (
    <div className={styles.cardsLayout}>
      {kanjiList.map((kanji) => {
        console.log(kanji.id);
        return <Card key={kanji.id} kanji={kanji} />;
      })}
    </div>
  );
}
