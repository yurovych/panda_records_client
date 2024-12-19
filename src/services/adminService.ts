import { adminClient } from './../http/adminClient.js';

function getAllMessages() {
  return adminClient.get('/notifications');
}

export const adminServices = {
  getAllMessages,
};
