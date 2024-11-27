import { createClient } from './index.js';
import { authService } from '../services/authService.js';
import { accessTokenService } from '../services/accessTokenService.js';

export const httpClient = createClient();

httpClient.interceptors.request.use(onRequest);
httpClient.interceptors.response.use(onResponseSuccess, onResponseError);

function onRequest(request) {
  const access_token = localStorage.getItem('access_token');

  if (access_token) {
    request.headers['Authorization'] = `Bearer ${access_token}`;
  }

  return request;
}

function onResponseSuccess(res) {
  return res.data;
}

async function onResponseError(error) {
  const originalRequest = error.config;

  if (error.response.status !== 401) {
    throw error;
  }

  try {
    const { access_token } = await authService.refresh();

    if (!access_token) {
      throw new Error('Access token is missing or invalid');
    }

    accessTokenService.save(access_token);

    return httpClient.request(originalRequest);
  } catch (error) {
    throw error;
  }
}
