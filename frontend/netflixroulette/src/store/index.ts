import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import movieSlice from "../features/movie/slice";

export const store = configureStore({
  reducer: {
    movies: movieSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
