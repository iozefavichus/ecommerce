import 'dotenv/config';
import fetch from 'node-fetch';
import SdkAuth from '@commercetools/sdk-auth';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  Client,
} from '@commercetools/sdk-client-v2';

const host = process.env.CTP_AUTH_URL as string;
const projectKey = process.env.CTP_PROJECT_KEY as string;
const clientId = process.env.CTP_CLIENT_ID as string;
const clientSecret = process.env.CTP_CLIENT_SECRET as string;

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

export const authClient = new SdkAuth({
  host,
  projectKey,
  disableRefreshToken: false,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes: [
    'manage_my_quotes:ecommerce_furniture manage_project:ecommerce_furniture introspect_oauth_tokens:ecommerce_furniture manage_my_payments:ecommerce_furniture manage_my_shopping_lists:ecommerce_furniture view_audit_log:ecommerce_furniture manage_my_orders:ecommerce_furniture view_customers:ecommerce_furniture manage_api_clients:ecommerce_furniture create_anonymous_token:ecommerce_furniture manage_my_profile:ecommerce_furniture',
  ],
  fetch,
});
