import {
  ClientResponse,
  createApiBuilderFromCtpClient,
  CustomerSignInResult,
  Product,
  ProductDiscount,
  ProductDiscountPagedQueryResponse,
  ProductPagedQueryResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
  Project,
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
      .then((data: ClientResponse<ProductPagedQueryResponse>) => data.body.results);
  }

  public getProductDiscounts(): Promise<ProductDiscount[]> {
    return this.apiRoot
      .productDiscounts()
      .get()
      .execute()
      .then((data: ClientResponse<ProductDiscountPagedQueryResponse>) => data.body.results);
  }

  public getProductProjections(): Promise<ProductProjection[]> {
    return this.apiRoot
      .productProjections()
      .get()
      .execute()
      .then((data: ClientResponse<ProductProjectionPagedQueryResponse>) => data.body.results);
  }

  public getProductById(productId: string) {
    return this.apiRoot.products().withId({ ID: productId }).get().execute();
  }
}

export { StpClientApi };
