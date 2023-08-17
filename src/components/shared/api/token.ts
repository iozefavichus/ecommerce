import { authClient } from './build-client';

export const getToken = async () => {
  const token = await authClient.clientCredentialsFlow();
  return token;
};
