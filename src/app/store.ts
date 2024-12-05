import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import booleanReducer from './../slices/booleanSlice';
import currentReducer from '../slices/current';
import songsReduser from './../slices/fetchSongs';
import servicesReduser from './../slices/fetchServices';
import equipmentReducer from './../slices/fetchEquipment';
import videosReducer from './../slices/fetchVideos';
import playerReducer from './../slices/playerSlice';

export const store = configureStore({
  reducer: {
    boolean: booleanReducer,
    current: currentReducer,
    songs: songsReduser,
    sevrices: servicesReduser,
    equipment: equipmentReducer,
    videos: videosReducer,
    player: playerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AttThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
