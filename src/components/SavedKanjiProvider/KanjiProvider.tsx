import type { SavedKanjiMap, KanjiItem } from "../../utils/types";
import {
  useContext,
  createContext,
  useState,
  type SetStateAction,
  type Dispatch,
} from "react";
import { saveKanjiData } from "../../utils/local-storage";

const createFallback = (message: string) => {
  return () => {
    console.error(message);
  };
};

export function useSavedKanjiHandler() {
  const {
    savedKanji = [],
    setSavedKanji = createFallback("setSavedKanji setter does not exist."),
    setSavedKanjiMap = createFallback("setSavedKanji setter does not exist."),
    savedKanjiMap = {},
  } = useSavedKanjiContext();

  return {
    save(kanji: KanjiItem) {
      const nextSavedKanji = [
        ...savedKanji,
        {
          ...kanji,
          saved: true,
        },
      ];

      setSavedKanji(nextSavedKanji);
      setSavedKanjiMap({
        ...savedKanjiMap,
        [`${kanji.id}`]: true,
      });
      saveKanjiData(nextSavedKanji);
    },
    forget(id: number) {
      const nextSavedKanji = savedKanji.filter((kanji) => kanji.id !== id);
      setSavedKanji(nextSavedKanji);
      setSavedKanjiMap({
        ...savedKanjiMap,
        [`${id}`]: false,
      });
      saveKanjiData(nextSavedKanji);
    },
  };
}

export function useSavedKanjiContext() {
  const context = useContext(SavedKanjiContext);
  return context;
}

const SavedKanjiContext = createContext<{
  setSavedKanji?: Dispatch<SetStateAction<KanjiItem[]>>;
  savedKanji?: KanjiItem[];
  savedKanjiMap?: SavedKanjiMap;
  setSavedKanjiMap?: Dispatch<SetStateAction<SavedKanjiMap>>;
}>({});

export type SavedKanjiProviderProps = {
  children: React.ReactNode;
  initialSavedKanji: KanjiItem[];
  initialSavedKanjiMap: SavedKanjiMap;
};

export function SavedKanjiProvider({
  children,
  initialSavedKanjiMap,
  initialSavedKanji,
}: SavedKanjiProviderProps) {
  const [savedKanji, setSavedKanji] = useState<KanjiItem[]>(initialSavedKanji);
  const [savedKanjiMap, setSavedKanjiMap] = useState(initialSavedKanjiMap);

  return (
    <SavedKanjiContext.Provider
      value={{ savedKanji, setSavedKanji, savedKanjiMap, setSavedKanjiMap }}
    >
      {children}
    </SavedKanjiContext.Provider>
  );
}
