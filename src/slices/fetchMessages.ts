/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserMessageType } from '../types/UserMessage';
import { adminServices } from '../services/adminService';

type MessagesType = {
  objects: UserMessageType[];
  loading: boolean;
  error: string;
  statusError: string;
  messageToDelete: UserMessageType | null;
};

const initialState: MessagesType = {
  objects: [],
  loading: false,
  error: '',
  statusError: '',
  messageToDelete: null,
};

export const fetchMessagesAsync = createAsyncThunk(
  'messages/fetch',
  async () => {
    const messagesList = await adminServices.getAllMessages();

    return messagesList;
  }
);

export const updateMessageStatusAsync = createAsyncThunk(
  'messages/updateStatus',
  async ({ status, id }: { status: string; id: number }) => {
    await adminServices.changeStatus(status, id);

    return { status, id };
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    deleteMessage: (state, action: PayloadAction<UserMessageType>) => {
      state.objects = state.objects.filter(
        (message) => message.id !== action.payload.id
      );
    },
    setMessageToDelete: (
      state,
      action: PayloadAction<UserMessageType | null>
    ) => {
      state.messageToDelete = action.payload;
    },
  },

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
        state.error = 'failed to load messages';
      })
      .addCase(updateMessageStatusAsync.pending, (state) => {
        state.statusError = '';
      })
      .addCase(updateMessageStatusAsync.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const message = state.objects.find((msg) => msg.id === id);
        if (message) {
          message.status = status;
        }
      })
      .addCase(updateMessageStatusAsync.rejected, (state) => {
        state.statusError = 'Failed to update message status';
      });
  },
});

export default messagesSlice.reducer;
export const { deleteMessage, setMessageToDelete } = messagesSlice.actions;
