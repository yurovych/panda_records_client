/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type CurrentType = {
  currentServiceId: number | null;
  currentLanguage: string;
};

const initialState: CurrentType = {
  currentServiceId: null,
  currentLanguage: 'ua',
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
  },
});

export default currentSlice.reducer;
export const { setCurrentServiceId, setCurrentLanguage } = currentSlice.actions;
