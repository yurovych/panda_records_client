/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VideoFileType } from './../types/Video';
import { clientService } from '../services/clientService';

type VideoType = {
  objects: VideoFileType[];
  loading: boolean;
  error: string;
};

const initialState: VideoType = {
  objects: [],
  loading: false,
  error: '',
};

export const fetchVideosAsync = createAsyncThunk(
  'videos/fetch',
  async (currenLanguage: string) => {
    const videosList = await clientService.getVideos(currenLanguage);

    return videosList;
  }
);

const getVideosSlice = createSlice({
  name: 'videos/fetch',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchVideosAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchVideosAsync.fulfilled, (state, action) => {
        state.objects = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchVideosAsync.rejected, (state) => {
        state.loading = false;
        state.error = 'failed to load videos';
      });
  },
});

export default getVideosSlice.reducer;
