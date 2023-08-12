import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './build-client';

export class ClientApi {
  private email;

  private password;

  private apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce_furniture' });

  constructor(email?: string, password?: string) {
    this.email = email;
    this.password = password;
  }

  public getCustomers() {
    return this.apiRoot
      .customers()
      .get()
      .execute()
      .then((data) => {
        const customers = data.body.results;
        return customers;
      });
  }

  public getProject() {
    return this.apiRoot.login().post({
      body: {
        email: this.email as string,
        password: this.password as string,
      },
    });
  }
}
