import { MainLayout } from "./components/MainLayout/MainLayout";
import { loadSavedKanji } from "./utils/local-storage";
import { Header } from "./components/Header/Header";

function App() {
  const { kanji, savedKanjiMap } = loadSavedKanji();

  return (
    <>
      <Header />
      <MainLayout
        initialSavedKanji={kanji}
        initialSavedKanjiMap={savedKanjiMap}
      />
    </>
  );
}

export default App;
