import {
  // Customer,
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

  private apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce_furniture' });

  constructor(email?: string) {
    this.email = email;
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

  public getProject(): Promise<ClientResponse<Project>> {
    return this.apiRoot.get().execute();
  }

  // public getCustomerByEmail(customerEmail: string): Promise<Customer[]> {
  //   return this.apiRoot
  //     .customers()
  //     .get({
  //       queryArgs: {
  //         where: `email="${customerEmail}"`,
  //       },
  //     })
  //     .execute()
  //     .then((data: ClientResponse<CustomerPagedQueryResponse>) => {
  //       const customer = data.body.results;
  //       return customer;
  //     });
  // }

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

  public getProductProjections(fieldSort?: string): Promise<ProductProjection[]> {
    return this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          sort: fieldSort,
        },
      })
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
