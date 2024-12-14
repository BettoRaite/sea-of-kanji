"use client";
import { CollectionsPanel } from "@/components/CollectionsPanel";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function Page() {
  // fetch collections
  return (
    <main className="flex justify-center items-center min-h-dvh">
      <Provider store={store}>
        <CollectionsPanel />
      </Provider>
    </main>
  );
}
