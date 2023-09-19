import {
  ClientResponse,
  createApiBuilderFromCtpClient,
  CustomerSignInResult,
  ProductDiscount,
  ProductDiscountPagedQueryResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
  CustomerPagedQueryResponse,
  Project,
  Customer,
  CategoryPagedQueryResponse,
  Category,
  AddressDraft,
} from '@commercetools/platform-sdk';
import { ClientFactory } from './build-client';
import { regCardObj, baseAdress, IUpdateCart } from '../../../types/shared';

const currentDate = new Date();
const expiresCookie = currentDate.setMonth(currentDate.getMonth() + 1);

class ApiClient {
  static sharedEmail = '';

  static sharedPassword = '';

  private hasMail = ApiClient.sharedEmail.length > 0;

  private hasPas = ApiClient.sharedPassword.length > 0;

  private client = new ClientFactory().createClient();

  private apiRoot = createApiBuilderFromCtpClient(this.client).withProjectKey({ projectKey: 'ecommerce_furniture' });

  constructor(email?: string, password?: string) {
    if (email && password) {
      ApiClient.sharedEmail = email;
      ApiClient.sharedPassword = password;
    }
  }

  public getCustomerByEmail(email: string): Promise<Customer[]> {
    if (!this.apiRoot) {
      throw new Error('Authentication credentials are missing.');
    }
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

  public getCustomerById(id: string): Promise<Customer> {
    return this.apiRoot
      .customers()
      .withId({ ID: id })
      .get()
      .execute()
      .then((data: ClientResponse<Customer>) => data.body);
  }

  public loginCustomer() {
    if (this.hasMail && this.hasPas) {
      this.client = new ClientFactory().createClient(ApiClient.sharedEmail, ApiClient.sharedPassword);
      this.apiRoot = createApiBuilderFromCtpClient(this.client).withProjectKey({ projectKey: 'ecommerce_furniture' });
      return this.apiRoot
        .me()
        .login()
        .post({
          body: {
            email: ApiClient.sharedEmail,
            password: ApiClient.sharedPassword,
          },
        })
        .execute();
    }
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

  public updateCustomer(
    id: string,
    version: string,
    NameValue: string,
    SurnameValue: string,
    BirthValue: string,
    EmailValue: string,
  ): Promise<ClientResponse<Customer>> {
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
            {
              action: 'changeEmail',
              email: EmailValue,
            },
          ],
        },
      })
      .execute();
  }

  public getProducts(limitNum?: number) {
    return this.apiRoot
      .products()
      .get({ queryArgs: { limit: limitNum } })
      .execute()
      .then((data) => data.body.results);
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
      .productProjections()
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

  public getProductsFromCatalog(limitNum?: number, offsetNum?: number): Promise<ProductProjection[]> {
    return this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit: limitNum,
          offset: offsetNum,
        },
      })
      .execute()
      .then((data: ClientResponse<ProductProjectionPagedQueryResponse>) => data.body.results);
  }

  public getCategory(): Promise<Category[]> {
    return this.apiRoot
      .categories()
      .get()
      .execute()
      .then((data: ClientResponse<CategoryPagedQueryResponse>) => data.body.results);
  }

  public getProductByKey(productKey: string) {
    return this.apiRoot.products().withKey({ key: productKey }).get().execute();
  }

  public getProductByID(productID: string) {
    return this.apiRoot.products().withId({ ID: productID }).get().execute();
  }

  public getProductCategory(catId: string) {
    return this.apiRoot.categories().withId({ ID: catId }).get().execute();
  }

  public addAddress(id: string, version: string, newAddress: baseAdress): Promise<ClientResponse<Customer>> {
    return this.apiRoot
      .customers()
      .withId({ ID: id })
      .post({
        body: {
          version: Number(version),
          actions: [
            {
              action: 'addAddress',
              address: newAddress,
            },
          ],
        },
      })
      .execute();
  }

  public changeAddress(
    id: string,
    version: string,
    AddressID: string,
    AddressUpd: AddressDraft,
  ): Promise<ClientResponse<Customer>> {
    return this.apiRoot
      .customers()
      .withId({ ID: id })
      .post({
        body: {
          version: Number(version),
          actions: [
            {
              action: 'changeAddress',
              addressId: AddressID,
              address: AddressUpd,
            },
          ],
        },
      })
      .execute();
  }

  public deleteAddress(id: string, version: string, AddressID: string): Promise<ClientResponse<Customer>> {
    return this.apiRoot
      .customers()
      .withId({ ID: id })
      .post({
        body: {
          version: Number(version),
          actions: [
            {
              action: 'removeAddress',
              addressId: AddressID,
            },
          ],
        },
      })
      .execute();
  }

  public setDefaultShipping(id: string, version: string, AddressID: string): Promise<ClientResponse<Customer>> {
    return this.apiRoot
      .customers()
      .withId({ ID: id })
      .post({
        body: {
          version: Number(version),
          actions: [
            {
              action: 'setDefaultShippingAddress',
              addressId: AddressID,
            },
          ],
        },
      })
      .execute();
  }

  public setDefaultBilling(id: string, version: string, AddressID: string): Promise<ClientResponse<Customer>> {
    return this.apiRoot
      .customers()
      .withId({ ID: id })
      .post({
        body: {
          version: Number(version),
          actions: [
            {
              action: 'setDefaultBillingAddress',
              addressId: AddressID,
            },
          ],
        },
      })
      .execute();
  }

  public addShipping(id: string, version: string, AddressID: string): Promise<ClientResponse<Customer>> {
    return this.apiRoot
      .customers()
      .withId({ ID: id })
      .post({
        body: {
          version: Number(version),
          actions: [
            {
              action: 'addShippingAddressId',
              addressId: AddressID,
            },
          ],
        },
      })
      .execute();
  }

  public addBilling(id: string, version: string, AddressID: string): Promise<ClientResponse<Customer>> {
    return this.apiRoot
      .customers()
      .withId({ ID: id })
      .post({
        body: {
          version: Number(version),
          actions: [
            {
              action: 'addBillingAddressId',
              addressId: AddressID,
            },
          ],
        },
      })
      .execute();
  }

  public removeShipping(id: string, version: string, AddressID: string): Promise<ClientResponse<Customer>> {
    return this.apiRoot
      .customers()
      .withId({ ID: id })
      .post({
        body: {
          version: Number(version),
          actions: [
            {
              action: 'removeShippingAddressId',
              addressId: AddressID,
            },
          ],
        },
      })
      .execute();
  }

  public removeBilling(id: string, version: string, AddressID: string): Promise<ClientResponse<Customer>> {
    return this.apiRoot
      .customers()
      .withId({ ID: id })
      .post({
        body: {
          version: Number(version),
          actions: [
            {
              action: 'removeBillingAddressId',
              addressId: AddressID,
            },
          ],
        },
      })
      .execute();
  }

  public updatePassword(
    id: string,
    version: string,
    oldPass: string,
    NewPass: string,
  ): Promise<ClientResponse<Customer>> {
    return this.apiRoot
      .customers()
      .password()
      .post({
        body: {
          id,
          version: Number(version),
          currentPassword: oldPass,
          newPassword: NewPass,
        },
      })
      .execute();
  }

  public getProductFilterProjections(filterQuery?: string): Promise<ProductProjection[]> {
    return this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          'filter.query': filterQuery,
        },
      })
      .execute()
      .then((data: ClientResponse<ProductProjectionPagedQueryResponse>) => data.body.results);
  }

  public getProductByColor(filterQuery: string) {
    return this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          'filter.query': filterQuery,
        },
      })
      .execute();
  }

  public addCart(productId: string) {
    if (this.hasMail && this.hasPas) {
      this.client = new ClientFactory().createClient(ApiClient.sharedEmail, ApiClient.sharedPassword);
      this.apiRoot = createApiBuilderFromCtpClient(this.client).withProjectKey({ projectKey: 'ecommerce_furniture' });
      return this.apiRoot
        .me()
        .carts()
        .post({
          body: {
            currency: 'USD',
            lineItems: [
              {
                productId,
                quantity: 1,
              },
            ],
          },
        })
        .execute()
        .then((cart) => cart.body);
    }
    return this.apiRoot
      .me()
      .carts()
      .post({
        body: {
          currency: 'USD',
          lineItems: [
            {
              productId,
              quantity: 1,
            },
          ],
        },
      })
      .execute()
      .then((cart) => cart.body);
  }

  public updateCart(options: IUpdateCart) {
    const { id, version, productId } = options;
    return this.apiRoot
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addLineItem',
              productId,
              quantity: 1,
            },
          ],
        },
      })
      .execute()
      .then((data) => data.body);
  }

  public deleteItemFromCart(options: IUpdateCart) {
    const { id, version, productId } = options;
    return this.apiRoot
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId: productId,
            },
          ],
        },
      })
      .execute()
      .then((data) => data.body);
  }

  public deletelineItemFromCart(id: string, version: number, productId: string) {
    return this.apiRoot
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId: productId,
            },
          ],
        },
      })
      .execute()
      .then((data) => data.body);
  }

  public getCarts() {
    return this.apiRoot
      .carts()
      .get({
        queryArgs: {
          limit: 100,
        },
      })
      .execute()
      .then((data) => data.body.results);
  }

  public getCartById(id: string) {
    return this.apiRoot
      .carts()
      .withId({ ID: id })
      .get()
      .execute()
      .then((data) => data.body);
  }

  public deleteCart(id: string, vers: number) {
    return this.apiRoot
      .carts()
      .withId({ ID: id })
      .delete({
        queryArgs: { version: vers },
      })
      .execute();
  }

  async getTotalNumberOfProducts() {
    return this.apiRoot
      .productProjections()
      .get()
      .execute()
      .then((data) => data.body.total);
  }

  public addDiscountCode(id: string, version: number, discountCode: string) {
    return this.apiRoot
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addDiscountCode',
              code: discountCode,
            },
          ],
        },
      })
      .execute()
      .then((data) => data.body);
  }

  public changeQuantity(id: string, version: number, lineItemId: string, quantity: number) {
    return this.apiRoot
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId,
              quantity,
            },
          ],
        },
      })
      .execute()
      .then((data) => data.body);
  }
}

export { ApiClient };
