import {
  ClientResponse,
  Customer,
  CustomerPagedQueryResponse,
  CustomerSignInResult,
  Project,
  createApiBuilderFromCtpClient,
  Product,
  ProductPagedQueryResponse,
  ProductDiscount,
  ProductDiscountPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ctpClient } from './build-client';
import { regCardObj } from '../../../types/shared';

export class StpClientApi {
  private email;

  private password;

  private apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce_furniture' });

  constructor(email?: string, password?: string) {
    this.email = email;
    this.password = password;
  }

  public getCustomers(): Promise<Customer[]> {
    return this.apiRoot
      .customers()
      .get()
      .execute()
      .then((data: ClientResponse<CustomerPagedQueryResponse>) => {
        const customers = data.body.results;
        return customers;
      });
  }

  public returnCustomerByEmail(customerEmail: string): Promise<ClientResponse<CustomerPagedQueryResponse>> {
    return this.apiRoot
      .customers()
      .get({
        queryArgs: {
          where: `email="${customerEmail}"`,
        },
      })
      .execute();
  }

  public loginCustomer(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> {
    return this.apiRoot
      .me()
      .login()
      .post({
        body: {
          email,
          password,
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
}
