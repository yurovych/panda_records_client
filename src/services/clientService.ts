import { userClient } from '../http/userClient.js';
import { SongTrackType } from '../types/SongTrack.js';
import { VideoFileType } from '../types/Video.js';
import { EquipmentCardType } from '../types/Equipment.js';
import { ServiceCardType } from '../types/Service.js';
import { FormDataType } from '../types/FormDataType.js';

function getSongs(): Promise<SongTrackType[]> {
  return userClient.get('/songs');
}

function getVideos(): Promise<VideoFileType[]> {
  return userClient.get('/lessons');
}

function getEquipment(): Promise<EquipmentCardType[]> {
  return userClient.get('/equipment');
}

function getSevices(): Promise<ServiceCardType[]> {
  return userClient.get('/services');
}

function sendForm({ name, email, phone_number, message }: FormDataType) {
  return userClient.post('/form-sent', { name, email, phone_number, message });
}

export const clientService = {
  getSongs,
  getVideos,
  getEquipment,
  getSevices,
  sendForm,
};
