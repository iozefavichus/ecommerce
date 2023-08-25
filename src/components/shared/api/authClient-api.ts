import { ClientResponse, CustomerSignInResult, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { createAuthPasswordClient } from './build-client';

class AuthClientApi {
  private email;

  private password;

  private authClient;

  private apiRoot;

  constructor(email?: string, password?: string) {
    this.email = email;
    this.password = password;

    if (this.email && this.password) {
      this.authClient = createAuthPasswordClient(this.email, this.password);
      this.apiRoot = createApiBuilderFromCtpClient(this.authClient).withProjectKey({
        projectKey: 'ecommerce_furniture',
      });
    }
  }

  public loginCustomer(): Promise<ClientResponse<CustomerSignInResult>> {
    if (!this.apiRoot) {
      throw new Error('Authentication credentials are missing.');
    }
    return this.apiRoot
      .me()
      .login()
      .post({
        body: {
          email: this.email as string,
          password: this.password as string,
        },
      })
      .execute();
  }
}

export { AuthClientApi };
