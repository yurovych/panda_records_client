/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EquipmentCardType } from './../types/Equipment';
import { clientService } from '../services/clientService';

type EquipmentType = {
  objects: EquipmentCardType[];
  loading: boolean;
  error: string;
};

const initialState: EquipmentType = {
  objects: [],
  loading: false,
  error: '',
};

export const fetchEquipmentAsync = createAsyncThunk(
  'equipment/fetch',
  async (currentLanguage: string) => {
    const equipmentList = await clientService.getEquipment(currentLanguage);

    return equipmentList;
  }
);

const geEquipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchEquipmentAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchEquipmentAsync.fulfilled, (state, action) => {
        state.objects = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchEquipmentAsync.rejected, (state) => {
        state.loading = false;
        state.error = 'failed to load equipment';
      });
  },
});

export default geEquipmentSlice.reducer;
