/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type BooleanType = {
  isAuthenticated: boolean;
};

const initialState: BooleanType = {
  isAuthenticated: false,
};

const booleanSlice = createSlice({
  name: 'boolean',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export default booleanSlice.reducer;
export const { setIsAuthenticated } = booleanSlice.actions;
