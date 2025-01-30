import { adminClient } from './../http/adminClient.js';

interface AddSong {
  title: string;
  artist: string;
  top: boolean;
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

  if (top) {
    formData.append('top', 'true');
  } else {
    formData.append('top', 'false');
  }

  const photoInput = document.getElementById('photo') as HTMLInputElement;
  const audioInput = document.getElementById('audio_file') as HTMLInputElement;

  if (photoInput.files && audioInput.files) {
    formData.append('photo', photoInput.files[0]);
    formData.append('audio_file', audioInput.files[0]);
  }

  return adminClient.post('/songs/', formData);
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
};
