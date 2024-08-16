import "./App.css";
import { MainLayout } from "./components/MainLayout/MainLayout";
import { loadSavedKanji } from "./utils/local-storage";

function App() {
  const { kanji, savedKanjiMap } = loadSavedKanji();

  return (
    <>
      <MainLayout
        initialSavedKanji={kanji}
        initialSavedKanjiMap={savedKanjiMap}
      />
    </>
  );
}

export default App;
