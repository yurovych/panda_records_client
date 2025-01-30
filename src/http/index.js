import axios from 'axios';

const BASE_URL =
  'https://welcome-katharine-none-none-none-3a3e7c52.koyeb.app/api/';

export function createClient() {
  return axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });
}
