import 'dotenv/config';
import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
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

export const pasTokenCache = new MyTokenCache();

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes: [process.env.CTP_SCOPES as string],
  fetch,
};

// Configure authPasswordFlow

const createPasswordAuthMiddlewareOptions = (email: string, password: string) => {
  const PasswordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username: email,
        password,
      },
    },
    scopes: [process.env.CTP_SCOPES as string],
    tokenCache: pasTokenCache,
    fetch,
  };
  return PasswordAuthMiddlewareOptions;
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

export const createAuthPasswordClient = (email: string, password: string) => {
  const pasOptions = createPasswordAuthMiddlewareOptions(email, password);
  const authPasswordClient = new ClientBuilder()
    .withPasswordFlow(pasOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  return authPasswordClient;
};
