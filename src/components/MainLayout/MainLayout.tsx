import { useState } from "react";
import { CardsList } from "../CardsList/CardsList";
import { useFetch } from "../../utils/useFetch";
import { KanjiCollectionProvider } from "../KanjiCollectionProvider/KanjiCollectionProvider";
import type { KanjiCollectionProviderProps } from "../KanjiCollectionProvider/KanjiCollectionProvider";
import { SearchBar } from "../SearchBar/SearchBar";
import styles from "./mainLayout.module.css";
import { NotFound } from "../NotFound/NotFound";
import { CardsListSceleton } from "../CardsListSceleton/CardsListSceleton";
import { BottomMenu } from "../BottomMenu/BottomMenu";
import { KanjiCollectionOverlay } from "../KanjiCollectionOverlay/KanjiCollectionOverlay";

type MainLayoutProps = Pick<
  KanjiCollectionProviderProps,
  "initialKanjiCollection" | "initialKanjiIdsMap"
>;

export function MainLayout({
  initialKanjiCollection,
  initialKanjiIdsMap,
}: MainLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useFetch(searchQuery);
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <main className={styles.mainLayout}>
      <SearchBar
        onSearch={(searchQuery: string) => setSearchQuery(searchQuery)}
      />

      <KanjiCollectionProvider
        initialKanjiCollection={initialKanjiCollection}
        initialKanjiIdsMap={initialKanjiIdsMap}
      >
        {isLoading && <CardsListSceleton />}
        {!error && !isLoading && <CardsList kanjiList={data ?? []} />}
        {!isLoading && !error && !data && <NotFound />}

        <KanjiCollectionOverlay isHidden={!showOverlay} />
        <BottomMenu
          onShowOverlay={() => {
            setShowOverlay(!showOverlay);
          }}
        />
      </KanjiCollectionProvider>
    </main>
  );
}
