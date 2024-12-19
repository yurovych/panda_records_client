/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserMessageType } from '../types/UserMessage';
import { adminServices } from '../services/adminService';

type MessagesType = {
  objects: UserMessageType[];
  loading: boolean;
  error: string;
};

const initialState: MessagesType = {
  objects: [],
  loading: false,
  error: '',
};

export const fetchMessagesAsync = createAsyncThunk(
  'messages/fetch',
  async () => {
    const messagesList = await adminServices.getAllMessages();

    return messagesList;
  }
);

const getMessagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchMessagesAsync.fulfilled, (state, action) => {
        state.objects = action.payload.data;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchMessagesAsync.rejected, (state) => {
        state.loading = false;
        state.error = 'failed to load equipment';
      });
  },
});

export default getMessagesSlice.reducer;
