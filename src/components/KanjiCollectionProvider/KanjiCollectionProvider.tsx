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

export function useKanjiCollectionHandler() {
  const {
    kanjiCollection = [],
    setKanjiCollection = createFallback(
      "setKanjiCollection setter does not exist."
    ),
    kanjiIdsMap = {},
    setKanjiIdsMap = createFallback("setKanjiIdsMap setter does not exist."),
  } = useKanjiCollectionContext();

  return {
    save(kanji: KanjiItem) {
      const nextKanjiCollection = [
        ...kanjiCollection,
        {
          ...kanji,
          saved: true,
        },
      ];

      setKanjiCollection(nextKanjiCollection);
      setKanjiIdsMap({
        ...kanjiIdsMap,
        [`${kanji.id}`]: true,
      });
      saveKanjiData(nextKanjiCollection);
    },
    forget(id: number) {
      const nextKanjiCollection = kanjiCollection.filter(
        (kanji) => kanji.id !== id
      );
      setKanjiCollection(nextKanjiCollection);
      setKanjiIdsMap({
        ...kanjiIdsMap,
        [`${id}`]: false,
      });
      saveKanjiData(nextKanjiCollection);
    },
  };
}

export function useKanjiCollectionContext() {
  const context = useContext(KanjiCollectionContext);
  return context;
}

const KanjiCollectionContext = createContext<{
  setKanjiCollection?: Dispatch<SetStateAction<KanjiItem[]>>;
  kanjiCollection?: KanjiItem[];
  kanjiIdsMap?: SavedKanjiMap;
  setKanjiIdsMap?: Dispatch<SetStateAction<SavedKanjiMap>>;
}>({});

export type KanjiCollectionProviderProps = {
  children: React.ReactNode;
  initialKanjiCollection: KanjiItem[];
  initialKanjiIdsMap: SavedKanjiMap;
};

export function KanjiCollectionProvider({
  children,
  initialKanjiCollection,
  initialKanjiIdsMap,
}: KanjiCollectionProviderProps) {
  const [kanjiCollection, setKanjiCollection] = useState<KanjiItem[]>(
    initialKanjiCollection
  );
  const [kanjiIdsMap, setKanjiIdsMap] = useState(initialKanjiIdsMap);

  return (
    <KanjiCollectionContext.Provider
      value={{
        kanjiCollection,
        setKanjiCollection,
        kanjiIdsMap,
        setKanjiIdsMap,
      }}
    >
      {children}
    </KanjiCollectionContext.Provider>
  );
}
