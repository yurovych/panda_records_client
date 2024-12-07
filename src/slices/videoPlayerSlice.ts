/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { VideoFileType } from '../types/Video';

type VideoPlayerType = {
  isVideoRunning: boolean;
  currentVideo: VideoFileType | null;
};

const initialState: VideoPlayerType = {
  isVideoRunning: false,
  currentVideo: null,
};

const videoPlayerSlice = createSlice({
  name: 'boolean',
  initialState,
  reducers: {
    setIsVideoRunning: (state, action: PayloadAction<boolean>) => {
      state.isVideoRunning = action.payload;
    },

    setCurrentVideo: (state, action: PayloadAction<VideoFileType | null>) => {
      state.currentVideo = action.payload;
    },
  },
});

export default videoPlayerSlice.reducer;
export const { setIsVideoRunning, setCurrentVideo } = videoPlayerSlice.actions;
