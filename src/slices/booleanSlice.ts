/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type BooleanType = {
  isAuthenticated: boolean;
  isHidenMenu: boolean;
  isAdminPanel: boolean;
  isMessageOpened: boolean;
  isDeleteModalOpened: boolean;
};

const initialState: BooleanType = {
  isAuthenticated: false,
  isHidenMenu: false,
  isAdminPanel: false,
  isMessageOpened: false,
  isDeleteModalOpened: false,
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

    setIsAdminPanel: (state, action: PayloadAction<boolean>) => {
      state.isAdminPanel = action.payload;
    },

    setIsMessageOpened: (state, action: PayloadAction<boolean>) => {
      state.isMessageOpened = action.payload;
    },
    setIsDeleteModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isDeleteModalOpened = action.payload;
    },
  },
});

export default booleanSlice.reducer;
export const {
  setIsAuthenticated,
  setIsHidenMenu,
  setIsAdminPanel,
  setIsMessageOpened,
  setIsDeleteModalOpened,
} = booleanSlice.actions;
