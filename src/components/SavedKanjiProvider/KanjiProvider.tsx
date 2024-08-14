import { SavedKanjiMap } from "../../utils/types";
import {
  useContext,
  createContext,
  useState,
  type SetStateAction,
  type Dispatch,
} from "react";
import { Kanji } from "../../utils/types";

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
    save(kanji: Kanji) {
      setSavedKanji([
        ...savedKanji,
        {
          ...kanji,
          saved: true,
        },
      ]);
      setSavedKanjiMap({
        ...savedKanjiMap,
        [`${kanji.id}`]: true,
      });
    },
    forget(id: number) {
      const nextSavedKanji = savedKanji.filter((kanji) => kanji.id !== id);
      setSavedKanji(nextSavedKanji);
      setSavedKanjiMap({
        ...savedKanjiMap,
        [`${id}`]: false,
      });
    },
  };
}

export function useSavedKanjiContext() {
  const context = useContext(SavedKanjiContext);
  return context;
}

const SavedKanjiContext = createContext<{
  setSavedKanji?: Dispatch<SetStateAction<Kanji[]>>;
  savedKanji?: Kanji[];
  savedKanjiMap?: SavedKanjiMap;
  setSavedKanjiMap?: Dispatch<SetStateAction<SavedKanjiMap>>;
}>({});

export type SavedKanjiProviderProps = {
  children: React.ReactNode;
  initialSavedKanji: Kanji[];
  initialSavedKanjiMap: SavedKanjiMap;
};

export function SavedKanjiProvider({
  children,
  initialSavedKanjiMap,
  initialSavedKanji,
}: SavedKanjiProviderProps) {
  const [savedKanji, setSavedKanji] = useState<Kanji[]>(initialSavedKanji);
  const [savedKanjiMap, setSavedKanjiMap] = useState(initialSavedKanjiMap);

  return (
    <SavedKanjiContext.Provider
      value={{ savedKanji, setSavedKanji, savedKanjiMap, setSavedKanjiMap }}
    >
      {children}
    </SavedKanjiContext.Provider>
  );
}
