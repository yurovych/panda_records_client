import { authClient } from '../http/authClient.js';
import { TokensType } from './../types/Tokens';

type LoginParams = {
  email: string;
  password: string;
};

type ResetPaswordRequesr = {
  email: string;
};

type ChangePassword = {
  password: string;
  confirmation: string;
  resetToken: string;
};

function login({ email, password }: LoginParams): Promise<TokensType> {
  return authClient.post('/users/login/', { email, password });
}

function refresh(): Promise<TokensType> {
  return authClient.get('/users/refresh');
}

function resetPasswordRequest({ email }: ResetPaswordRequesr) {
  return authClient.post('/reset-password/', { email });
}

function changePassword({
  password,
  confirmation,
  resetToken,
}: ChangePassword) {
  return authClient.post(`/reset-password/${resetToken}`, {
    password,
    confirmation,
  });
}

export const authService = {
  login,
  refresh,
  resetPasswordRequest,
  changePassword,
};
