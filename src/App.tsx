import { MainLayout } from "./components/MainLayout/MainLayout";
import { loadSavedKanji } from "./utils/local-storage";
import { Header } from "./components/Header/Header";
import type { SavedKanjiMap } from "./utils/types";

function App() {
  const savedKanji = loadSavedKanji();
  const savedKanjiMap: SavedKanjiMap = {};

  for (const k of savedKanji) {
    if (k.id) {
      savedKanjiMap[k.id] = true;
    }
  }

  return (
    <>
      <Header />
      <MainLayout
        initialSavedKanji={savedKanji}
        initialSavedKanjiMap={savedKanjiMap}
      />
    </>
  );
}

export default App;
