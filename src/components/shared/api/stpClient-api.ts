import {
  ClientResponse,
  createApiBuilderFromCtpClient,
  CustomerSignInResult,
  ProductDiscount,
  ProductDiscountPagedQueryResponse,
  ProductPagedQueryResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
  CustomerPagedQueryResponse,
  Project,
  Customer,
  CategoryPagedQueryResponse,
  Category,
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

  public getCustomerInfoByEmail(email:string): Promise<Customer[]>  {
    return this.apiRoot
      .customers()
      .get({
        queryArgs: {
          where: `email="${email}"`,
        },
      })
      .execute()
      .then((data: ClientResponse<CustomerPagedQueryResponse>) => data.body.results);
  }

  public getCustomerbyId(id: string):Promise<Customer> {
    return this.apiRoot
        .customers()
        .withId({ ID: id })
        .get()
        .execute()
        .then((data: ClientResponse<Customer>) => data.body);
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

  public updateCustomer(id: string, version:string, NameValue: string, SurnameValue: string, BirthValue: string): Promise<ClientResponse<Customer>> {
    return this.apiRoot
      .customers()
      .withId({ ID: id })
      .post({
        body: {
          version: Number(version),
          actions: [
            {
              action: 'setFirstName',
              firstName: NameValue,
            },
            {
              action: 'setLastName',
              lastName: SurnameValue,
            },
            {
              action: 'setDateOfBirth',
              dateOfBirth: BirthValue,
            },
          ],
        },
      })
      .execute()
  }

  public getProducts(limitNum?: number) {
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

  public getProductSearchProjections(valueFilter?: string): Promise<ProductProjection[]> {
    return this.apiRoot
      ?.productProjections()
      .search()
      .get({
        queryArgs: {
          'text.en': valueFilter,
          fuzzy: true,
        },
      })
      .execute()
      .then((data: ClientResponse<ProductProjectionPagedQueryResponse>) => data.body.results);
  }

  public getCategory(): Promise<Category[]> {
    return this.apiRoot
      ?.categories()
      .get()
      .execute()
      .then((data: ClientResponse<CategoryPagedQueryResponse>) => data.body.results);
  }

  public getProductByKey(productKey: string) {
    return this.apiRoot.products().withKey({ key: productKey }).get().execute();
  }

  public getProductCategory(catId: string) {
    return this.apiRoot.categories().withId({ ID: catId }).get().execute();
  }
}

export { StpClientApi };