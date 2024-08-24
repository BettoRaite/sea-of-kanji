import { useState, useRef } from "react";
import { CardsList } from "../CardsList/CardsList";
import { useFetch } from "../../hooks/useFetch";
import { KanjiCollectionProvider } from "../KanjiCollectionProvider/KanjiCollectionProvider";
import type { KanjiCollectionProviderProps } from "../KanjiCollectionProvider/KanjiCollectionProvider";
import { SearchBar } from "../SearchBar/SearchBar";
import styles from "./mainLayout.module.css";
import { NotFound } from "../NotFound/NotFound";
import { BottomMenu } from "../BottomMenu/BottomMenu";
import { KanjiCollectionOverlay } from "../KanjiCollectionOverlay/KanjiCollectionOverlay";
// import { FilterMenu } from "../FilterMenu/FilterMenu";
import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll";
import type { KanjiItem } from "kanjibreak-api-types";
import { NotFoundError } from "../../utils/error";

const BASE_URL = "https://kanjibreakapi.p.rapidapi.com/kanji";
function getNextFetchUrl(searchQuery: string, page: number) {
  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("pageSize", String(PAGE_SIZE));
  if (page > 1) params.append("offset", "1");

  let fetchUrl = `${BASE_URL}?${params.toString()}`;

  if (searchQuery) {
    fetchUrl = `${BASE_URL}/character/${searchQuery}`;
  }

  return fetchUrl;
}

const INITIAL_PAGE = 1;
export const PAGE_SIZE = 100;

type MainLayoutProps = Pick<
  KanjiCollectionProviderProps,
  "initialKanjiCollection" | "initialKanjiIdsMap"
>;
export function MainLayout({
  initialKanjiCollection,
  initialKanjiIdsMap,
}: MainLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(INITIAL_PAGE);
  const [kanjiItems, setKanjiItems] = useState<KanjiItem[]>([]);
  const requestState = useFetch(getNextFetchUrl(searchQuery, page));
  const [showOverlay, setShowOverlay] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  // const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);

  if (requestState.status === "success") {
    const { data } = requestState;
    const { items } = data;
    if (items.at(-1) !== kanjiItems.at(-1)) {
      setKanjiItems(page === 1 ? items : [...kanjiItems, ...items]);
    }
  }

  const fetchError =
    requestState.status === "error" ? requestState.error : null;
  const hasMorePages =
    requestState.status === "success"
      ? Boolean(requestState.data.metadata?.pages)
      : false;

  let cardsSceletons = 0;
  if (requestState.status === "loading") {
    cardsSceletons = searchQuery ? 1 : PAGE_SIZE;
  }

  function handleNextPage() {
    setPage(page + 1);
  }
  function handleSearch(searchQuery: string) {
    setPage(INITIAL_PAGE);
    setSearchQuery(searchQuery);
  }

  return (
    <main className={styles.layout}>
      <SearchBar onSearch={handleSearch} ref={searchInputRef} />
      {/* <FilterMenu isHidden={!isFilterMenuVisible} /> */}

      <KanjiCollectionProvider
        initialKanjiCollection={initialKanjiCollection}
        initialKanjiIdsMap={initialKanjiIdsMap}
      >
        {!fetchError && (
          <>
            <InfiniteScroll
              onNextPage={handleNextPage}
              hasMorePages={hasMorePages}
            >
              <CardsList
                kanjiList={
                  !searchQuery && kanjiItems.length === 1 ? [] : kanjiItems
                }
                cardSceletons={cardsSceletons}
              />
            </InfiniteScroll>
          </>
        )}

        {fetchError && fetchError instanceof NotFoundError && <NotFound />}

        <KanjiCollectionOverlay isHidden={!showOverlay} />
        <BottomMenu
          onShowOverlay={() => {
            setShowOverlay(!showOverlay);
          }}
          onSearchInputFocus={() => {
            if (searchInputRef.current instanceof HTMLInputElement) {
              searchInputRef.current.focus();
            }
          }}
        />
      </KanjiCollectionProvider>
    </main>
  );
}
