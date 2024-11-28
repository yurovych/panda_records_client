import { userClient } from '../http/userClient.js';
import { SongTrackType } from './../types/SongTrack.js';

function getSongs(): Promise<SongTrackType[]> {
  return userClient.get(
    'https://2d34-185-110-133-10.ngrok-free.app/api/songs/'
  );
}

export const userService = {
  getSongs,
};
