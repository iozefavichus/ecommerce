import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './build-client';
import { regCardObj } from '../../../types/shared';

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

  public loginCustomer(email: string, password: string) {
    return this.apiRoot.me().login().post({
      body: {
        email,
        password,
      },
    });
  }

  public createCustomer(registrationCard: regCardObj){
    return this.apiRoot.customers().post({
        body: registrationCard
      }).execute()
  }

}
