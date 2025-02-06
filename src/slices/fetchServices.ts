/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ServiceCardType } from '../types/Service';
import { clientService } from '../services/clientService';

type ServicesType = {
  objects: ServiceCardType[];
  loading: boolean;
  error: string;
};

const initialState: ServicesType = {
  objects: [],
  loading: false,
  error: '',
};

export const fetchServicesAsync = createAsyncThunk(
  'services/fetch',
  async (currenLanguage: string) => {
    const servicesList = await clientService.getSevices(currenLanguage);

    return servicesList;
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchServicesAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchServicesAsync.fulfilled, (state, action) => {
        state.objects = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchServicesAsync.rejected, (state) => {
        state.loading = false;
        state.error = 'failed to load services';
      });
  },
});

export default servicesSlice.reducer;
