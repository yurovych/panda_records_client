import { adminClient } from './../http/adminClient.js';

interface AddSong {
  title: string;
  artist: string;
  photo: File | null;
  audio_file: File | null;
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

function addSong({ title, artist, photo, audio_file, top }: AddSong) {
  return adminClient.post('/songs/', {
    title,
    artist,
    photo,
    audio_file,
    top,
  });
}

function deleteSong(song_id: number) {
  return adminClient.delete(`/songs/${song_id}/`);
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
