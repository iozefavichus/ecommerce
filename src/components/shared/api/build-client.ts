import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  Client,
} from '@commercetools/sdk-client-v2';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'ecommerce_furniture',
  credentials: {
    clientId: 'CHcOX8zQcTHSbsNNZ2Q2Ir5z',
    clientSecret: 'bFkDFFwEy3Rt0cfcaLocCVDjbmNNhvYA',
  },
  scopes: [
    'manage_my_quotes:ecommerce_furniture manage_project:ecommerce_furniture introspect_oauth_tokens:ecommerce_furniture manage_my_payments:ecommerce_furniture manage_my_shopping_lists:ecommerce_furniture view_audit_log:ecommerce_furniture manage_my_orders:ecommerce_furniture view_customers:ecommerce_furniture manage_api_clients:ecommerce_furniture create_anonymous_token:ecommerce_furniture manage_my_profile:ecommerce_furniture',
  ],
  fetch,
};

// Configure passwordAuthMiddlewareOptions
const getPasswordAuthMiddlewareOptions = (email: string, password: string): PasswordAuthMiddlewareOptions => {
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: 'ecommerce_furniture',
    credentials: {
      clientId: 'CHcOX8zQcTHSbsNNZ2Q2Ir5z',
      clientSecret: 'bFkDFFwEy3Rt0cfcaLocCVDjbmNNhvYA',
      user: {
        username: email,
        password,
      },
    },
    scopes: [
      'manage_my_quotes:ecommerce_furniture manage_project:ecommerce_furniture introspect_oauth_tokens:ecommerce_furniture manage_my_payments:ecommerce_furniture manage_my_shopping_lists:ecommerce_furniture view_audit_log:ecommerce_furniture manage_my_orders:ecommerce_furniture view_customers:ecommerce_furniture manage_api_clients:ecommerce_furniture create_anonymous_token:ecommerce_furniture manage_my_profile:ecommerce_furniture',
    ],
    fetch,
  };
  return passwordAuthMiddlewareOptions;
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const createAuthClient = (email: string, password: string): Client => {
  const options = getPasswordAuthMiddlewareOptions(email, password);
  const authClient = new ClientBuilder()
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  return authClient;
};
