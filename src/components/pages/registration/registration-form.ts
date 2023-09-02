import { createCustomElement } from '../../shared/utilities/helper-functions';
import { checkName, checkSurname, checkBirth, checkEmail, checkPassword, checkCity, checkPost } from './validation';
import { setError, setSuccess, CheckIt } from './validation-helpers';
import { createFormDiv, createFormWithOptions } from './creationform-helpers';

const createFormElement = <T extends HTMLElement>(
  tag: string,
  classNames: string[],
  id?: string,
  parent?: string | HTMLElement,
  type?: string,
): T => {
  const element = document.createElement(tag) as T;
  element.className = classNames.join(' ');
  if (id) {
    element.setAttribute('id', id);
  }
  if (parent) {
    let root: HTMLElement;
    if (typeof parent === 'string' && document.querySelector(parent)) {
      root = document.querySelector(parent) as HTMLElement;
      root.append(element);
    } else if (parent instanceof HTMLElement) {
      root = parent;
      root.append(element);
    }
  }
  if (type) {
    element.setAttribute('type', type);
  }

  return element;
};

interface FromDivObject {
  container: HTMLElement;
  label: HTMLElement;
  input: HTMLInputElement;
  message: HTMLElement;
}

interface RegistrationObject {
  form: HTMLFormElement;
  wrapper: HTMLElement;
  nameDiv: FromDivObject;
  surnameDiv: FromDivObject;
  birthDiv: FromDivObject;
  checkDefaultShipping: FromDivObject;
  ShippingstreetDiv: FromDivObject;
  ShippingcityDiv: FromDivObject;
  ShippingpostDiv: FromDivObject;
  ShippingcountryDiv: HTMLElement;
  BillingstreetDiv: FromDivObject;
  BillingcityDiv: FromDivObject;
  BillingpostDiv: FromDivObject;
  BillingcountryDiv: HTMLElement;
  emailDiv: FromDivObject;
  passwordDiv: FromDivObject;
  submitBtn: HTMLButtonElement;
  radioButton: FromDivObject;
  radioButton2: FromDivObject;
  billingDiv: HTMLElement;
}

export const RegistrationForm = (): RegistrationObject => {
  const wrapper = createCustomElement('div', ['reg-main']);
  const form = createFormElement<HTMLFormElement>('form', ['registration_form'], 'form', wrapper);
  const container = createCustomElement('div', ['reg-container']);

  const mayBeLogIn = createCustomElement('p', ['maybe-login'], 'Have already registration?');
  const logIn = createCustomElement('a', ['loginlink-reg'], 'Log in') as HTMLLinkElement;
  logIn.href = '/login';
  mayBeLogIn.append(logIn);

  const nameDiv = createFormDiv('name', 'Name*', 'text', 'name');
  const surnameDiv = createFormDiv('surname', 'Surname*', 'text', 'surname');
  const birthDiv = createFormDiv('birth', 'Date of birth*', 'date', 'birth');
  const shippingDiv = createCustomElement('div', ['shipping'], 'Shipping adress');
  const checkDefaultShipping = createFormDiv(
    'defaultShipping',
    'Set as default shipping adress',
    'checkbox',
    'defaultShipping',
  );
  checkDefaultShipping.input.setAttribute('name', 'defaultshipping');
  checkDefaultShipping.container.classList.remove('form-control');
  checkDefaultShipping.input.classList.remove('input');
  checkDefaultShipping.input.classList.add('checkbox');
  const ShippingstreetDiv = createFormDiv('shippingstreet', 'Street*', 'text', 'shippingstreet');
  const ShippingcityDiv = createFormDiv('shippingcity', 'City*', 'text', 'shippingcity');
  const ShippingpostDiv = createFormDiv('shippingpost', 'Post code*', 'text', 'shippingpost');
  const ShippingcountryDiv = createFormWithOptions('shippingcountry', 'Country*');
  const question = createCustomElement('div', ['question'], 'Do you want to use the same for billing adress?');
  const radioButton = createFormDiv(
    'radio',
    'Yes, billing and shipping adresses are the same',
    'radio',
    'default-shipping',
  );
  const radioButton2 = createFormDiv('radio2', 'No, I want to use another billing adress', 'radio', 'default-billing');
  radioButton.container.classList.remove('form-control');
  radioButton2.container.classList.remove('form-control');
  radioButton.input.classList.remove('input');
  radioButton.input.classList.add('radio-btn');
  radioButton.input.setAttribute('name', 'adress');
  radioButton.input.setAttribute('checked', '');
  radioButton2.input.classList.remove('input');
  radioButton2.input.classList.add('radio-btn');
  radioButton2.input.setAttribute('name', 'adress');

  const billingDiv = createCustomElement('div', ['billing'], '');
  const billingTitle = createCustomElement('div', ['billing-title'], 'Billing adress');
  const checkDefaultBilling = createFormDiv(
    'defaultBilling',
    'Set as default billing adress',
    'checkbox',
    'defaultBilling',
  );
  checkDefaultBilling.input.setAttribute('name', 'defaultbilling');
  checkDefaultBilling.container.classList.remove('form-control');
  checkDefaultBilling.input.classList.remove('input');
  checkDefaultBilling.input.classList.add('checkbox');
  const BillingstreetDiv = createFormDiv('billingstreet', 'Street*', 'text', 'billingstreet');
  const BillingcityDiv = createFormDiv('billingcity', 'City*', 'text', 'billingcity');
  const BillingpostDiv = createFormDiv('billingpost', 'Post code*', 'text', 'billingpost');
  const BillingcountryDiv = createFormWithOptions('billingcountry', 'Country*');
  const emailDiv = createFormDiv('email', 'Email*', 'text', 'email');
  const passwordDiv = createFormDiv('password', 'Password*', 'password', 'password');
  const submitBtn = createFormElement<HTMLButtonElement>(
    'button',
    ['registration__button'],
    'button-submit',
    container,
    'submit',
  );
  submitBtn.insertAdjacentHTML('beforeend', 'Register');

  billingDiv.append(
    billingTitle,
    checkDefaultBilling.container,
    BillingstreetDiv.container,
    BillingcityDiv.container,
    BillingcountryDiv,
    BillingpostDiv.container,
  );
  form.append(container);
  container.append(
    mayBeLogIn,
    nameDiv.container,
    surnameDiv.container,
    birthDiv.container,
    emailDiv.container,
    passwordDiv.container,
    shippingDiv,
    checkDefaultShipping.container,
    ShippingstreetDiv.container,
    ShippingcityDiv.container,
    ShippingcountryDiv,
    ShippingpostDiv.container,
    question,
    radioButton.container,
    radioButton2.container,
    billingDiv,
    submitBtn,
  );

  nameDiv.input.addEventListener('input', (event) => {
    const name: string = (event.target as HTMLInputElement).value.trim();
    CheckIt(checkName(name), nameDiv.input);
  });
  surnameDiv.input.addEventListener('input', (event) => {
    const surname: string = (event.target as HTMLInputElement).value.trim();
    CheckIt(checkSurname(surname), surnameDiv.input);
  });
  birthDiv.input.addEventListener('input', (event) => {
    const birthdate: string = (event.target as HTMLInputElement).value.trim();
    if (birthdate === '') {
      setError(birthDiv.input, 'Date of birth cannot be blank');
    }
    if (!checkBirth(birthdate)) {
      setError(birthDiv.input, 'Oops! You must be over 13 years old');
    } else {
      setSuccess(birthDiv.input);
    }
  });
  emailDiv.input.addEventListener('input', (event) => {
    const email: string = (event.target as HTMLInputElement).value.trim();
    if (email === '') {
      setError(emailDiv.input, 'Email cannot be blank');
    } else if (!checkEmail(email)) {
      setError(emailDiv.input, 'Email is not correct. It must be xxxx@xxxx.xxx type');
    } else {
      setSuccess(emailDiv.input);
    }
  });
  passwordDiv.input.addEventListener('input', (event) => {
    const password: string = (event.target as HTMLInputElement).value;
    CheckIt(checkPassword(password), passwordDiv.input);
  });
  ShippingcityDiv.input.addEventListener('input', (event) => {
    const shippingCity: string = (event.target as HTMLInputElement).value;
    CheckIt(checkCity(shippingCity), ShippingcityDiv.input);
  });
  ShippingpostDiv.input.addEventListener('input', (event) => {
    const shippingPost: string = (event.target as HTMLInputElement).value;
    CheckIt(checkPost('USA', shippingPost), ShippingpostDiv.input);
  });
  ShippingstreetDiv.input.addEventListener('input', (event) => {
    const shippingStreet: string = (event.target as HTMLInputElement).value;
    if (shippingStreet === '') {
      setError(ShippingstreetDiv.input, 'Street cannot be blank');
    } else {
      setSuccess(ShippingstreetDiv.input);
    }
  });
  BillingcityDiv.input.addEventListener('input', (event) => {
    const billingCity: string = (event.target as HTMLInputElement).value;
    CheckIt(checkCity(billingCity), BillingcityDiv.input);
  });
  BillingpostDiv.input.addEventListener('input', (event) => {
    const billingPost: string = (event.target as HTMLInputElement).value;
    CheckIt(checkPost('USA', billingPost), BillingpostDiv.input);
  });
  BillingstreetDiv.input.addEventListener('input', (event) => {
    const billingStreet: string = (event.target as HTMLInputElement).value;
    if (billingStreet === '') {
      setError(BillingstreetDiv.input, 'Street cannot be blank');
    } else {
      setSuccess(BillingstreetDiv.input);
    }
  });

  return {
    form,
    wrapper,
    nameDiv,
    surnameDiv,
    birthDiv,
    checkDefaultShipping,
    ShippingstreetDiv,
    ShippingcityDiv,
    ShippingpostDiv,
    ShippingcountryDiv,
    BillingstreetDiv,
    BillingcityDiv,
    BillingcountryDiv,
    BillingpostDiv,
    emailDiv,
    passwordDiv,
    submitBtn,
    radioButton,
    radioButton2,
    billingDiv,
  };
};
