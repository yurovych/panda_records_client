import { userClient } from '../http/userClient.js';
import { SongTrackType } from './../types/SongTrack.js';
import { EquipmentCardType } from './../types/Equipment.js';
import { ServiceCardType } from './../types/ServiceCard.js';
import { FormDataType } from './../types/FormDataType.js';

function getSongs(): Promise<SongTrackType[]> {
  return userClient.get('https://panda-records-api.onrender.com/api/songs/');
}

function getEquipment(): Promise<EquipmentCardType[]> {
  return userClient.get('url............');
}

function getSevices(): Promise<ServiceCardType[]> {
  return userClient.get('url............');
}

function sendForm({ name, email, phoneNumber, message }: FormDataType) {
  return userClient.post('/form-sent', { name, email, phoneNumber, message });
}

export const userService = {
  getSongs,
  getEquipment,
  getSevices,
  sendForm,
};
