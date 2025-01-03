import { createClient } from './index.js';

export const authClient = createClient();

authClient.interceptors.request.use((config) => {
  console.log('Request:', config);
  return config;
});

authClient.interceptors.response.use(
  (res) => {
    console.log('Response:', res);
    return res.data;
  },
  (error) => {
    console.error('Error response:', error.response);
    throw error;
  }
);
