import { useState } from "react";
import { CardsList } from "../CardsList/CardsList";
import { useFetch } from "../../hooks/useFetch";
import { KanjiCollectionProvider } from "../KanjiCollectionProvider/KanjiCollectionProvider";
import type { KanjiCollectionProviderProps } from "../KanjiCollectionProvider/KanjiCollectionProvider";
import { SearchBar } from "../SearchBar/SearchBar";
import styles from "./mainLayout.module.css";
import { NotFound } from "../NotFound/NotFound";
import { CardsListSceleton } from "../CardsListSceleton/CardsListSceleton";
import { BottomMenu } from "../BottomMenu/BottomMenu";
import { KanjiCollectionOverlay } from "../KanjiCollectionOverlay/KanjiCollectionOverlay";
// import { FilterMenu } from "../FilterMenu/FilterMenu";
import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll";
import type { KanjiItem } from "kanjibreak-api-types";
import { NotFoundError } from "../../utils/error";

type MainLayoutProps = Pick<
  KanjiCollectionProviderProps,
  "initialKanjiCollection" | "initialKanjiIdsMap"
>;

export function MainLayout({
  initialKanjiCollection,
  initialKanjiIdsMap,
}: MainLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [kanjiItems, setKanjiItems] = useState<KanjiItem[]>([]);
  const { data, error, isLoading, hasMorePages } = useFetch(searchQuery, page);
  const [showOverlay, setShowOverlay] = useState(false);
  // const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false );
  if (searchQuery && data && kanjiItems.at(-1) !== data.at(-1)) {
    setKanjiItems(data);
  } else {
    if (data && kanjiItems.at(-1) !== data.at(-1)) {
      setKanjiItems([...kanjiItems, ...data]);
    }
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  return (
    <main className={styles.layout}>
      <SearchBar
        onSearch={(searchQuery: string) => setSearchQuery(searchQuery)}
      />
      {/* <FilterMenu isHidden={!isFilterMenuVisible} /> */}

      <KanjiCollectionProvider
        initialKanjiCollection={initialKanjiCollection}
        initialKanjiIdsMap={initialKanjiIdsMap}
      >
        {!error && (
          <>
            <InfiniteScroll
              onNextPage={handleNextPage}
              hasMorePages={hasMorePages}
              isLoading={isLoading}
            >
              <CardsList kanjiList={kanjiItems} />
              {isLoading && <CardsListSceleton />}
            </InfiniteScroll>
          </>
        )}
        {error instanceof NotFoundError && <NotFound />}
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
