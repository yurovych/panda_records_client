import { authClient } from '../http/authClient.js';
import { TokensType } from './../types/Tokens';

type LoginParams = {
  email: string;
  password: string;
};

function login({ email, password }: LoginParams): Promise<TokensType> {
  return authClient.post(
    'https://100f-185-110-133-10.ngrok-free.app/api/users/login/',
    { email, password }
  );
}

function refresh(): Promise<TokensType> {
  return authClient.get('/refresh');
}

export const authService = {
  login,
  refresh,
};
