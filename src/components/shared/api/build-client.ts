import fetch from 'node-fetch';
import SdkAuth from '@commercetools/sdk-auth';
import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

const host = 'https://auth.europe-west1.gcp.commercetools.com';
const projectKey = 'ecommerce_furniture';
const clientId = 'CHcOX8zQcTHSbsNNZ2Q2Ir5z';
const clientSecret = 'bFkDFFwEy3Rt0cfcaLocCVDjbmNNhvYA';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes: [
    'manage_my_quotes:ecommerce_furniture manage_project:ecommerce_furniture introspect_oauth_tokens:ecommerce_furniture manage_my_payments:ecommerce_furniture manage_my_shopping_lists:ecommerce_furniture view_audit_log:ecommerce_furniture manage_my_orders:ecommerce_furniture view_customers:ecommerce_furniture manage_api_clients:ecommerce_furniture create_anonymous_token:ecommerce_furniture manage_my_profile:ecommerce_furniture',
  ],
  fetch,
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

export const clientTest = new ClientBuilder().withClientCredentialsFlow(authMiddlewareOptions).build();

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
