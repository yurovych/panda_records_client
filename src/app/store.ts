import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import booleanReducer from './../slices/booleanSlice';
import currentReducer from '../slices/current';

export const store = configureStore({
  reducer: {
    boolean: booleanReducer,
    current: currentReducer,
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
