/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SongTrackType } from './../types/SongTrack';

type CurrentType = {
  currentSong: SongTrackType | null;
  currentServiceId: number | null;
  currentLanguage: string;
};

const initialState: CurrentType = {
  currentSong: null,
  currentServiceId: null,
  currentLanguage: 'ua',
};

const currentSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<SongTrackType | null>) => {
      state.currentSong = action.payload;
    },
    setCurrentServiceId: (state, action: PayloadAction<number | null>) => {
      state.currentServiceId = action.payload;
    },
    setCurrentLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
    },
  },
});

export default currentSlice.reducer;
export const { setCurrentSong, setCurrentServiceId, setCurrentLanguage } =
  currentSlice.actions;
