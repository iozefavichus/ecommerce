interface baseAdress {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}
interface regCardObj {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  addresses: Array<baseAdress>;
  shippingAddresses: Array<number>;
  billingAddresses: Array<number>;
  defaultShippingAddress: number | undefined;
  defaultBillingAddress: number | undefined;
}

interface personalInfoObj {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
}

type Constants = Record<string, string>;

interface IUpdateCart {
  id: string;
  version: number;
  centAmount: number;
  productId: string;
}

export { baseAdress, regCardObj, personalInfoObj, Constants, IUpdateCart };
