import { authClient } from '../http/authClient.js';
import { TokensType } from './../types/Tokens';

type LoginParams = {
  email: string;
  password: string;
  currentLanguage: string;
};

type ResetPasswordRequest = {
  email: string;
  currentLanguage: string;
};

type ResetPassword = {
  new_password: string;
  confirm_password: string;
  reset_token: string;
  currentLanguage: string;
};

function login({
  email,
  password,
  currentLanguage,
}: LoginParams): Promise<TokensType> {
  return authClient.post(
    '/users/login/',
    { email, password },
    {
      headers: {
        'Accept-Language': currentLanguage,
      },
    }
  );
}

function refresh(): Promise<TokensType> {
  return authClient.get('/users/refresh');
}

function resetPasswordRequest({
  email,
  currentLanguage,
}: ResetPasswordRequest) {
  return authClient.post('/users/password-reset/', { email, currentLanguage });
}

function resetPassword({
  new_password,
  confirm_password,
  reset_token,
  currentLanguage,
}: ResetPassword) {
  return authClient.post(`/users/password-reset/${reset_token}/`, {
    new_password,
    confirm_password,
    currentLanguage,
  });
}

export const authService = {
  login,
  refresh,
  resetPasswordRequest,
  resetPassword,
};
