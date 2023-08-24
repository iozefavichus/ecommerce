import {
  ClientResponse,
  CustomerSignInResult,
  Project,
  createApiBuilderFromCtpClient,
  Product,
  ProductPagedQueryResponse,
  ProductDiscount,
  ProductDiscountPagedQueryResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ctpClient } from './build-client';
import { regCardObj } from '../../../types/shared';

class StpClientApi {
  private email;

  private password;

  private apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce_furniture' });

  constructor(email?: string, password?: string) {
    this.email = email;
    this.password = password;
  }

  public loginCustomer(): Promise<ClientResponse<CustomerSignInResult>> {
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

  public getProject(): Promise<ClientResponse<Project>> {
    return this.apiRoot.get().execute();
  }

  public createCustomer(registrationCard: regCardObj): Promise<ClientResponse<CustomerSignInResult>> {
    return this.apiRoot
      .customers()
      .post({
        body: registrationCard,
      })
      .execute();
  }

  public getProducts(): Promise<Product[]> {
    return this.apiRoot
      .products()
      .get()
      .execute()
      .then((data: ClientResponse<ProductPagedQueryResponse>) => {
        const products = data.body.results;
        return products;
      });
  }

  public getProductDiscounts(): Promise<ProductDiscount[]> {
    return this.apiRoot
      .productDiscounts()
      .get()
      .execute()
      .then((data: ClientResponse<ProductDiscountPagedQueryResponse>) => {
        const productDiscounts = data.body.results;
        return productDiscounts;
      });
  }

  public getProductProjections(): Promise<ProductProjection[]> {
    return this.apiRoot
      .productProjections()
      .get()
      .execute()
      .then((data: ClientResponse<ProductProjectionPagedQueryResponse>) => {
        const productProjections = data.body.results;
        return productProjections;
      });
  }
}

export { StpClientApi };
