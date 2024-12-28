import { adminClient } from './../http/adminClient.js';

function getAllMessages() {
  return adminClient.get('/notifications');
}

function logout() {
  return adminClient.post('/users/logout/');
}

function changeStatus(status: string, id: number) {
  return adminClient.patch(`/notifications/${id}`, { status: status });
}

export const adminServices = {
  getAllMessages,
  logout,
  changeStatus,
};
