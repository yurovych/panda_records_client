import axios from 'axios';

const BASE_URL =
  'https://colorful-cody-yurovych-production-63c7ab44.koyeb.app/api/';

export function createClient() {
  return axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });
}
