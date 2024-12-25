import { adminClient } from './../http/adminClient.js';

function getAllMessages() {
  return adminClient.get('/notifications');
}

function logout() {
  return adminClient.post('/users/logout/');
}

export const adminServices = {
  getAllMessages,
  logout,
};
