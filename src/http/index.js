import axios from 'axios';

// const PORT = process.env.PORT || 7080;

// const BASE_URL = `http://localhost:${PORT}`;
// const BASE_URL = 'https://6a9d-185-110-133-10.ngrok-free.app/api/users/';

export function createClient() {
  return axios.create({
    // baseURL: BASE_URL,
    withCredentials: true,
  });
}
