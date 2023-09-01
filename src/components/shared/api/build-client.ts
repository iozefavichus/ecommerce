import 'dotenv/config';
import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  Client,
  TokenCache,
  TokenStore,
} from '@commercetools/sdk-client-v2';

const host = process.env.CTP_AUTH_URL as string;
const projectKey = process.env.CTP_PROJECT_KEY as string;
const clientId = process.env.CTP_CLIENT_ID as string;
const clientSecret = process.env.CTP_CLIENT_SECRET as string;

class MyTokenCache implements TokenCache {
  myCache: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  set(newCache: TokenStore) {
    this.myCache = newCache;
  }

  get() {
    return this.myCache;
  }
}

export const authTokenCache = new MyTokenCache();

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes: [process.env.CTP_SCOPES as string],
  tokenCache: authTokenCache,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.CTP_API_URL as string,
  fetch,
};

// Export the ClientBuilder
export const ctpClient: Client = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
