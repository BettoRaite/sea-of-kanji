import { useState } from "react";
import { CardsList } from "../CardsList/CardsList";
import { useFetch } from "../../utils/useFetch";
import { SavedKanjiProvider } from "../SavedKanjiProvider/KanjiProvider";
import { MainOverlay } from "../MainOverlay/MainOverlay";
import type { SavedKanjiProviderProps } from "../SavedKanjiProvider/KanjiProvider";
import { SearchBar } from "../SearchBar/SearchBar";
import styles from "./mainLayout.module.css";

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

  return (
    <main className={styles.mainLayout}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <SavedKanjiProvider
        initialSavedKanji={initialSavedKanji}
        initialSavedKanjiMap={initialSavedKanjiMap}
      >
        {!error && !isLoading && <CardsList kanjiList={data ?? []} />}
        <MainOverlay />
      </SavedKanjiProvider>
    </main>
  );
}
