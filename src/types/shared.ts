interface baseAdress {
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
  defaultShippingAddress: number | undefined;
  defaultBillingAddress: number | undefined;
}

export type Constants = Record<string, string>;
