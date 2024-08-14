import { useState } from "react";
import { CardsList } from "../CardsList/CardsList";
import { useFetch } from "../../utils/useFetch";
import { SavedKanjiProvider } from "../SavedKanjiProvider/KanjiProvider";
import { MainOverlay } from "../MainOverlay/MainOverlay";
import { SavedKanjiProviderProps } from "../SavedKanjiProvider/KanjiProvider";

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
    <>
      <input
        type="text"
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchQuery(e.target.value);
        }}
      />

      <SavedKanjiProvider
        initialSavedKanji={initialSavedKanji}
        initialSavedKanjiMap={initialSavedKanjiMap}
      >
        {!error && !isLoading && <CardsList kanjiList={data ?? []} />}
        <MainOverlay />
      </SavedKanjiProvider>
    </>
  );
}
