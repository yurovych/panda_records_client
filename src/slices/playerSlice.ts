/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SongTrackType } from '../types/SongTrack';

type PlayerType = {
  isPlaying: boolean;
  currentSong: SongTrackType | null;
};

const initialState: PlayerType = {
  isPlaying: false,
  currentSong: null,
};

const playerSlice = createSlice({
  name: 'boolean',
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    setCurrentSong: (state, action: PayloadAction<SongTrackType | null>) => {
      state.currentSong = action.payload;
    },

    toggleTrack: (state, action: PayloadAction<SongTrackType>) => {
      if (state.currentSong?.id === action.payload.id) {
        if (state.isPlaying) {
          state.isPlaying = false;
          state.currentSong = null;
        } else {
          state.isPlaying = true;
        }
      } else {
        state.currentSong = action.payload;
        state.isPlaying = true;
      }
    },
  },
});

export default playerSlice.reducer;
export const { setIsPlaying, setCurrentSong, toggleTrack } =
  playerSlice.actions;
