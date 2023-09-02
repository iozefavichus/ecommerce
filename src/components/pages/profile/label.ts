import { createCustomElement } from '../../shared/utilities/helper-functions';

export const drawLabels = (
  shippingValue: boolean,
  billingValue: boolean,
  shippingDefaultValue: boolean,
  billingDefaultValue: boolean,
): HTMLElement => {
  const adressLabelDiv = createCustomElement('div', ['addresses-label']);
  const shippingDefault = createCustomElement('div', ['shippingdefault-label'], 'shipping default');
  if (!shippingDefaultValue) {
    shippingDefault.classList.add('label-invible');
  } else {
    shippingDefault.classList.remove('label-invible');
  }
  const billingDefault = createCustomElement('div', ['billingdefault-label'], 'billing default');
  if (!billingDefaultValue) {
    billingDefault.classList.add('label-invible');
  } else {
    billingDefault.classList.remove('label-invible');
  }
  const shipping = createCustomElement('div', ['shipping-label'], 'shipping');
  if (!shippingValue) {
    shipping.classList.add('label-invible');
  } else {
    shipping.classList.remove('label-invible');
  }
  const billing = createCustomElement('div', ['billing-label'], 'billing');
  if (!billingValue) {
    billing.classList.add('label-invible');
  } else {
    billing.classList.remove('label-invible');
  }
  adressLabelDiv.append(shipping, billing, shippingDefault, billingDefault);
  return adressLabelDiv;
};
