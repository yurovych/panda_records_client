import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import booleanReducer from './../slices/booleanSlice';
import currentReducer from '../slices/current';
import songsReduser from './../slices/fetchSongs';
import servicesReduser from './../slices/fetchServices';
import equipmentReducer from './../slices/fetchEquipment';
import videosReducer from './../slices/fetchVideos';
import playerReducer from './../slices/playerSlice';
import messagesReducer from './../slices/fetchMessages';

export const store = configureStore({
  reducer: {
    boolean: booleanReducer,
    current: currentReducer,
    equipment: equipmentReducer,
    sevrices: servicesReduser,
    songs: songsReduser,
    videos: videosReducer,
    player: playerReducer,
    messages: messagesReducer,
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
