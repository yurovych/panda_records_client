import { userClient } from '../http/userClient.js';
import { SongTrackType } from './../types/SongTrack.js';
import { EquipmentCardType } from './../types/Equipment.js';
import { ServiceCardType } from './../types/ServiceCard.js';

function getSongs(): Promise<SongTrackType[]> {
  return userClient.get(
    'https://2d34-185-110-133-10.ngrok-free.app/api/songs/'
  );
}

function getEquipment(): Promise<EquipmentCardType[]> {
  return userClient.get('url............');
}

function getSevices(): Promise<ServiceCardType[]> {
  return userClient.get('url............');
}

export const userService = {
  getSongs,
  getEquipment,
  getSevices,
};
