import { createClient } from './index.js';
import { authService } from './../services/authService.ts';
import { accessTokenService } from './../services/accessTokenService.ts';

export const adminClient = createClient();

adminClient.interceptors.request.use(onRequest);
adminClient.interceptors.response.use(onResponseSuccess, onResponseError);

function onRequest(request) {
  const access_token = localStorage.getItem('access_token');

  if (access_token) {
    request.headers['Authorization'] = `Bearer ${access_token}`;
  }

  return request;
}

function onResponseSuccess(res) {
  return res;
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

    return adminClient.request(originalRequest);
  } catch (error) {
    throw error;
  }
}
