import { useState } from "react";
import { CardsList } from "../CardsList/CardsList";
import { useFetch } from "../../utils/useFetch";
import { SavedKanjiProvider } from "../SavedKanjiProvider/KanjiProvider";
import type { SavedKanjiProviderProps } from "../SavedKanjiProvider/KanjiProvider";
import { SearchBar } from "../SearchBar/SearchBar";
import styles from "./mainLayout.module.css";
import { NotFound } from "../NotFound/NotFound";
// import { CardSceleton } from "../CardSceleton/CardSceleton";
import { CardsListSceleton } from "../CardsListSceleton/CardsListSceleton";
import { BottomMenu } from "../BottomMenu/BottomMenu";
import { KanjiCollectionOverlay } from "../KanjiCollectionOverlay/KanjiCollectionOverlay";

type MainLayoutProps = Pick<
  SavedKanjiProviderProps,
  "initialSavedKanji" | "initialSavedKanjiMap"
>;

export function MainLayout({
  initialSavedKanji,
  initialSavedKanjiMap,
}: MainLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, error, isLoading } = useFetch(searchQuery);
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <main className={styles.mainLayout}>
      <SearchBar
        onSearch={(searchQuery: string) => setSearchQuery(searchQuery)}
      />

      <SavedKanjiProvider
        initialSavedKanji={initialSavedKanji}
        initialSavedKanjiMap={initialSavedKanjiMap}
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
      </SavedKanjiProvider>
    </main>
  );
}
