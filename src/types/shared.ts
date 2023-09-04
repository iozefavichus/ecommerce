export interface baseAdress {
  country: string;
  city: string;
  streetName: string;
  postalCode: string;
}

export interface regCardObj {
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

export interface personalInfoObj {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
}

export type Constants = Record<string, string>;
