"use client";
import { useAppDispatch } from "@/redux/store";
import { createWordCollection } from "@/redux/slices/wordCollectionsSlice";

export function CollectionsPanel() {
  const dispatch = useAppDispatch();
  function handleCreateClick() {
    dispatch(
      createWordCollection({
        maxWords: 10,
        name: "veryssink",
        isPublic: false,
      }),
    );
  }
  return (
    <section className="flex">
      <h1>Words</h1>
      <button type="button" onClick={handleCreateClick}>
        Create collection
      </button>
    </section>
  );
}
