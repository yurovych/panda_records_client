import { createClient } from './index.js';

export const userClient = createClient();

userClient.interceptors.response.use((res) => res.data);
