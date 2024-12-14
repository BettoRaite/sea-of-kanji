import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import wordCollectionsReducer from "./slices/wordCollectionsSlice";

// Configure the store
export const store = configureStore({
  reducer: wordCollectionsReducer,
});

// Define types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
// MY CUSTOM TYPED THUNK (taken from redux docs)
// export const createAppAsyncThunk = createAsyncThunk.withTypes<{
//   state: RootState;
//   dispatch: AppDispatch;
// }>();

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
