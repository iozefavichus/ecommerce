import { createCustomElement } from '../../shared/utilities/helper-functions';
import { StpClientApi } from '../../shared/api/stpClient-api';

export const drawLabels = (
  shippingValue: boolean,
  billingValue: boolean,
  shippingDefaultValue: boolean,
  billingDefaultValue: boolean,
): HTMLElement => {
  const adressLabelDiv = createCustomElement('div', ['addresses-label']);
  const shippingDefault = createCustomElement('div', ['shippingdefault-label'], 'shipping default');
  const billingDefault = createCustomElement('div', ['billingdefault-label'], 'billing default');
  const shipping = createCustomElement('div', ['shipping-label'], 'shipping');
  const billing = createCustomElement('div', ['billing-label'], 'billing');

  if (!shippingDefaultValue) {
    shippingDefault.classList.add('label-invible');
  } else {
    shippingDefault.classList.remove('label-invible');
  }

  if (!billingDefaultValue) {
    billingDefault.classList.add('label-invible');
  } else {
    billingDefault.classList.remove('label-invible');
  }

  if (!shippingValue) {
    shipping.classList.add('label-invible');
  } else {
    shipping.classList.remove('label-invible');
  }

  if (!billingValue) {
    billing.classList.add('label-invible');
  } else {
    billing.classList.remove('label-invible');
  }
  adressLabelDiv.append(shipping, billing, shippingDefault, billingDefault);
  return adressLabelDiv;
};

export const LabelsBoolean = async (addressID: string, i: number) => {
  const emailVal = localStorage.getItem('email');
  if (emailVal) {
    //   let defaultShipping = false;
    //   let defaultBilling = false;
    //   let shipping = false;
    //   let billing= false;
    const customer = await new StpClientApi().getCustomerInfoByEmail(emailVal);
    // console.log(addressID);
    // console.log(customer);
    //   console.log(customer[0].shippingAddressIds);
    // console.log(customer[0].billingAddressIds);
    // console.log(customer[0].defaultBillingAddressId);
    // console.log(customer[0].defaultShippingAddressId);
    const ArrayWithShipping = customer[0].shippingAddressIds;
    const ArrayWithBilling = customer[0].billingAddressIds;
    if (addressID === customer[0].defaultShippingAddressId) {
      //  defaultShipping = true;
      const shipDefInput = document.querySelector(`.shippingDefswitch-input${i}`);
      shipDefInput?.setAttribute('checked', 'checked');
    }
    if (addressID === customer[0].defaultBillingAddressId) {
      // defaultBilling = true;
      const billDefInput = document.querySelector(`.billingDefswitch-input${i}`);
      billDefInput?.setAttribute('checked', 'checked');
    }
    if (addressID && customer[0].shippingAddressIds && ArrayWithShipping?.includes(addressID)) {
      // shipping = true;
      const shipInput = document.querySelector(`.shippingswitch-input${i}`);
      shipInput?.setAttribute('checked', 'checked');
    }
    if (addressID && customer[0].billingAddressIds && ArrayWithBilling?.includes(addressID)) {
      // billing = true;
      const billInput = document.querySelector(`.billingswitch-input${i}`);
      billInput?.setAttribute('checked', 'checked');
    }
    //  container.append(drawLabels(shipping, billing, defaultShipping, defaultBilling));
  }
};
