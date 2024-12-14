import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { WordCollection } from "@/lib/definitions";
import * as db from "@/lib/firebase/wordCollections";
import type { CollectionDraft } from "@/lib/firebase/wordCollections";

// ERROR UNINITIALIZED
const createWordCollection = createAsyncThunk(
  "word-collections/createWordCollection",
  async (collectionDraft: CollectionDraft) => {
    const collection = await db.createWordCollection(collectionDraft);
    return collection;
  },
);

type WordCollectionsSliceState = {
  wordCollections: WordCollection[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};
const initialState: WordCollectionsSliceState = {
  wordCollections: [],
  status: "idle",
  error: null,
};
const collectionsSlice = createSlice({
  name: "word-collections",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(userLoggedOut, (state) => {
      //   // Clear out the list of posts whenever the user logs out
      //   return initialState;
      // })
      .addCase(createWordCollection.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createWordCollection.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wordCollections.push(action.payload.collection);
      })
      .addCase(createWordCollection.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown Error";
      });
  },
});

export { createWordCollection };
export default collectionsSlice.reducer;
