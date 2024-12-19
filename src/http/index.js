import axios from 'axios';

const BASE_URL = 'https://pandarecordsapi-production.up.railway.app/api/';

export function createClient() {
  return axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });
}
