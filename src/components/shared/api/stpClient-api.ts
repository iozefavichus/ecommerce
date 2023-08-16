import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { clientTest, ctpClient } from './build-client';

export const api = createApiBuilderFromCtpClient(clientTest).withProjectKey({ projectKey: 'ecommerce_furniture' });

export class StpClientApi {
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

  public async loginCustomer(email: string, password: string) {
    const response = await this.apiRoot
      .me()
      .login()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute();
    return response;
  }

  public getProject() {
    return this.apiRoot.get().execute();
  }
}
