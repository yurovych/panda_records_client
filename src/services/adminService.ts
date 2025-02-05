import { adminClient } from './../http/adminClient.js';

interface AddSong {
  title: string;
  artist: string;
  top: boolean;
}

interface AddVideo {
  title: string;
}

function getAllMessages() {
  return adminClient.get('/notifications');
}

function logout() {
  return adminClient.post('/users/logout/');
}

function changeStatus(status: string, id: number) {
  return adminClient.patch(`/notifications/${id}`, { status: status });
}

function changePassword(new_password: string) {
  const password = new_password;
  return adminClient.put('/users/change-password/', { password });
}

function changeEmail(new_email: string) {
  return adminClient.post('/users/change-email/', { new_email });
}

function addSong({ title, artist, top }: AddSong) {
  const formData = new FormData();

  formData.append('artist', artist);
  formData.append('title', title);
  formData.append('top', top ? '1' : '0');

  const photoInput = document.getElementById(
    'photo_file_id'
  ) as HTMLInputElement;
  const audioInput = document.getElementById(
    'audio_file_id'
  ) as HTMLInputElement;

  if (photoInput.files && audioInput.files) {
    formData.append('photo', photoInput.files[0]);
    formData.append('audio_file', audioInput.files[0]);
  }

  return adminClient.post('/songs/', formData);
}

function addVideo({ title }: AddVideo) {
  const formData = new FormData();

  formData.append('title', title);

  const posterInput = document.getElementById(
    'poster_file_id'
  ) as HTMLInputElement;
  const videoInput = document.getElementById(
    'video_file_id'
  ) as HTMLInputElement;

  if (posterInput.files && videoInput.files) {
    formData.append('poster', posterInput.files[0]);
    formData.append('video_file', videoInput.files[0]);
  }

  return adminClient.post('/videos/', formData);
}

function deleteSong(song_id: number) {
  return adminClient.delete(`/songs/${song_id}`);
}

function deleteMessage(message_id: number) {
  return adminClient.delete(`/notifications/${message_id}`);
}

export const adminServices = {
  getAllMessages,
  logout,
  changeStatus,
  changePassword,
  changeEmail,
  addSong,
  deleteSong,
  deleteMessage,
  addVideo,
};
