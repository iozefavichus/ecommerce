import 'dotenv/config';
import fetch from 'node-fetch';
import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  Client,
  AnonymousAuthMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { anonTokenCache, authTokenCache } from './token-cache';

const host = process.env.CTP_AUTH_URL as string;
const projectKey = process.env.CTP_PROJECT_KEY as string;
const clientId = process.env.CTP_CLIENT_ID as string;
const clientSecret = process.env.CTP_CLIENT_SECRET as string;

export class ClientFactory {
  private httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: process.env.CTP_API_URL as string,
    fetch,
  };

  public createClient(email?: string, password?: string): Client {
    if (email && password) {
      const options: PasswordAuthMiddlewareOptions = {
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
        fetch,
        tokenCache: authTokenCache,
      };

      const client: Client = new ClientBuilder()
        .withPasswordFlow(options)
        .withHttpMiddleware(this.httpMiddlewareOptions)
        .withLoggerMiddleware()
        .build();

      return client;
    }
    const options: AnonymousAuthMiddlewareOptions = {
      host,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
      scopes: [process.env.CTP_SCOPES as string],
      fetch,
      tokenCache: anonTokenCache,
    };

    const client = new ClientBuilder()
      .withAnonymousSessionFlow(options)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    return client;
  }
}
