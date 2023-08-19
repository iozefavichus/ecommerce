import { TokenInfo } from '@commercetools/sdk-client-v2';
import { authClient } from './build-client';

export const getToken = async () => {
  const token: TokenInfo = await authClient.clientCredentialsFlow();
  return token;
};
