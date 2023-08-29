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
  CustomerPagedQueryResponse,
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

  public getCustomerByEmail(): Promise<ClientResponse<CustomerPagedQueryResponse>> {
    if (!this.apiRoot) {
      throw new Error('Authentication credentials are missing.');
    }
    return this.apiRoot
      .customers()
      .get({
        queryArgs: {
          where: `email="${this.email}"`,
        },
      })
      .execute();
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

  public getProducts(limitNum?: number): Promise<Product[]> {
    return this.apiRoot
      .products()
      .get({ queryArgs: { limit: limitNum } })
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

  public getProductByKey(productKey: string) {
    return this.apiRoot.products().withKey({ key: productKey }).get().execute();
  }

  public getProductCategory(catId: string) {
    return this.apiRoot.categories().withId({ ID: catId }).get().execute();
  }
}

export { StpClientApi };
