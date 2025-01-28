/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SongTrackType } from '../types/SongTrack';
import { VideoFileType } from '../types/Video';

type PlayerType = {
  isSongPlaying: boolean;
  currentSong: SongTrackType | null;
  currentSongIndex: number | null;
  currentSongProgress: number | null;
  isVideoPlaying: boolean;
  currentVideo: VideoFileType | null;
  trackToDelete: SongTrackType | null;
};

const initialState: PlayerType = {
  isSongPlaying: false,
  currentSong: null,
  currentSongIndex: null,
  currentSongProgress: null,
  isVideoPlaying: false,
  currentVideo: null,
  trackToDelete: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setIsSongPlaying: (state, action: PayloadAction<boolean>) => {
      state.isSongPlaying = action.payload;
    },

    setCurrentSong: (state, action: PayloadAction<SongTrackType | null>) => {
      state.currentSong = action.payload;
    },

    setCurrentSongProgress: (state, action: PayloadAction<number | null>) => {
      state.currentSongProgress = action.payload;
    },

    setCurrentSongIndex: (state, action: PayloadAction<number | null>) => {
      state.currentSongIndex = action.payload;
    },

    setIsVideoPlaying: (state, action: PayloadAction<boolean>) => {
      state.isVideoPlaying = action.payload;
    },

    setCurrentVideo: (state, action: PayloadAction<VideoFileType | null>) => {
      state.currentVideo = action.payload;
    },

    setTrackToDelete: (state, action: PayloadAction<SongTrackType | null>) => {
      state.trackToDelete = action.payload;
    },
  },
});

export default playerSlice.reducer;
export const {
  setIsSongPlaying,
  setCurrentSong,
  setCurrentSongProgress,
  setCurrentSongIndex,
  setIsVideoPlaying,
  setCurrentVideo,
  setTrackToDelete,
} = playerSlice.actions;
