import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import booleanReducer from './../slices/booleanSlice';
import songsReducer from './../slices/songsSlice';

export const store = configureStore({
  reducer: {
    boolean: booleanReducer,
    songs: songsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AttThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
