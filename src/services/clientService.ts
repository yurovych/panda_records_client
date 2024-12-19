import { userClient } from '../http/userClient.js';
import { SongTrackType } from '../types/SongTrack.js';
import { VideoFileType } from '../types/Video.js';
import { EquipmentCardType } from '../types/Equipment.js';
import { ServiceCardType } from '../types/Service.js';
import { FormDataType } from '../types/FormDataType.js';

function getSongs(): Promise<SongTrackType[]> {
  return userClient.get('/songs');
}

function getVideos(currenLanguage: string): Promise<VideoFileType[]> {
  return userClient.get('/lessons', {
    headers: {
      'Accept-Language': currenLanguage,
    },
  });
}

function getEquipment(currenLanguage: string): Promise<EquipmentCardType[]> {
  return userClient.get('/equipment', {
    headers: {
      'Accept-Language': currenLanguage,
    },
  });
}

function getSevices(currenLanguage: string): Promise<ServiceCardType[]> {
  return userClient.get('/services', {
    headers: {
      'Accept-Language': currenLanguage,
    },
  });
}

function sendForm({ name, email, phone_number, message }: FormDataType) {
  return userClient.post('/notifications/', {
    name,
    email,
    phone_number,
    message,
  });
}

function changeLanguage() {
  return userClient.get('./');
}

export const clientService = {
  getSongs,
  getVideos,
  getEquipment,
  getSevices,
  sendForm,
  changeLanguage,
};
