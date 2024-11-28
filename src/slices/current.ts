/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type CurrentType = {
  currentSongId: number | null;
  currentServiceId: string | null;
};

const initialState: CurrentType = {
  currentSongId: null,
  currentServiceId: null,
};

const currentSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setCurrentSongId: (state, action: PayloadAction<number | null>) => {
      state.currentSongId = action.payload;
    },
    setCurrentServiceId: (state, action: PayloadAction<string | null>) => {
      state.currentServiceId = action.payload;
    },
  },
});

export default currentSlice.reducer;
export const { setCurrentSongId, setCurrentServiceId } = currentSlice.actions;
