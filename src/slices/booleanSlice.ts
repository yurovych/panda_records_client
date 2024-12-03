/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type BooleanType = {
  isAuthenticated: boolean;
  isHidenMenu: boolean;
};

const initialState: BooleanType = {
  isAuthenticated: false,
  isHidenMenu: false,
};

const booleanSlice = createSlice({
  name: 'boolean',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },

    setIsHidenMenu: (state, action: PayloadAction<boolean>) => {
      state.isHidenMenu = action.payload;
    },
  },
});

export default booleanSlice.reducer;
export const { setIsAuthenticated, setIsHidenMenu } = booleanSlice.actions;
