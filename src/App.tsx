import "./App.css";
import { MainLayout } from "./components/MainLayout/MainLayout";
import { loadSavedKanji } from "./utils/local-storage";
import { SavedKanjiMap } from "./utils/types";

function App() {
  const savedKanji = loadSavedKanji();
  const savedKanjiMap: SavedKanjiMap = {};

  return (
    <>
      <MainLayout
        initialSavedKanji={savedKanji}
        initialSavedKanjiMap={savedKanjiMap}
      />
    </>
  );
}

export default App;
