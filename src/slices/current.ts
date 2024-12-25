/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserMessageType } from '../types/UserMessage';

type CurrentType = {
  currentServiceId: number | null;
  currentLanguage: string;
  currentMessage: UserMessageType | null;
};

const initialState: CurrentType = {
  currentServiceId: null,
  currentLanguage: 'ua',
  currentMessage: null,
};

const currentSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    setCurrentServiceId: (state, action: PayloadAction<number | null>) => {
      state.currentServiceId = action.payload;
    },
    setCurrentLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
    },
    setCurrentMessage: (
      state,
      action: PayloadAction<UserMessageType | null>
    ) => {
      state.currentMessage = action.payload;
    },
  },
});

export default currentSlice.reducer;
export const { setCurrentServiceId, setCurrentLanguage, setCurrentMessage } =
  currentSlice.actions;
