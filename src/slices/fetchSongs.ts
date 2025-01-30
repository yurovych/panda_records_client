/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SongTrackType } from './../types/SongTrack';
import { clientService } from '../services/clientService';

type SongsType = {
  objects: SongTrackType[];
  loading: boolean;
  error: string;
};

const initialState: SongsType = {
  objects: [],
  loading: false,
  error: '',
};

export const fetchSongsAsync = createAsyncThunk('songs/fetch', async () => {
  const songsList = await clientService.getSongs();

  return songsList;
});

const getSongsSlice = createSlice({
  name: 'songs/fetch',
  initialState,
  reducers: {
    deleteTrack: (state, action: PayloadAction<SongTrackType>) => {
      state.objects = state.objects.filter(
        (song) => song.id !== action.payload.id
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSongsAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchSongsAsync.fulfilled, (state, action) => {
        state.objects = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchSongsAsync.rejected, (state) => {
        state.loading = false;
        state.error = 'failed to load songs';
      });
  },
});

export default getSongsSlice.reducer;
export const { deleteTrack } = getSongsSlice.actions;
