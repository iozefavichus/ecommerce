import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { createAuthPasswordClient } from './build-client';

class AuthClientApi {
  private email;

  private password;

  private authClient;

  private apiRoot;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
    this.authClient = createAuthPasswordClient(this.email, this.password);
    this.apiRoot = createApiBuilderFromCtpClient(this.authClient).withProjectKey({ projectKey: 'ecommerce_furniture' });
  }

  public loginCustomer() {
    return this.apiRoot
      .me()
      .login()
      .post({
        body: {
          email: this.email,
          password: this.password,
        },
      })
      .execute();
  }
}

export { AuthClientApi };
