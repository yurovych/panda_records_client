/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type SongsType = {
  currentSongId: string | null;
};

const initialState: SongsType = {
  currentSongId: null,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setCurrentSongId: (state, action: PayloadAction<string | null>) => {
      state.currentSongId = action.payload;
    },
  },
});

export default songsSlice.reducer;
export const { setCurrentSongId } = songsSlice.actions;
