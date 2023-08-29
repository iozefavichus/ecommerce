import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
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

  public loginCustomer() {
    return this.apiRoot
      ?.me()
      .login()
      .post({
        body: {
          email: this.email as string,
          password: this.password as string,
        },
      })
      .execute();
  }

  public getProductByKey(productKey: string) {
    return this.apiRoot?.products().withKey({ key: productKey }).get().execute();
  }

  public getProductCategory(catId: string) {
    return this.apiRoot?.categories().withId({ ID: catId }).get().execute();
  }
}

export { AuthClientApi };
