import { Constants } from '../../../types/shared';
import { createCustomElement } from '../../shared/utilities/helper-functions';

const loginClasses: Constants = {
  IMG: 'heading-img',
  HEADING: 'heading-login',
  AUTH: 'authorization',
  AUTH_FORM: 'authorization-form',
  LABEL_CHECKBOX: 'label-checkbox',
  LABEL_PAS: 'label-password',
  LABEL_MAIL: 'label-mail',
  INPUT_MAIL: 'authorization-form__mail',
  INPUT_PAS: 'authorization-form__password',
  OPEN_PAS: 'open-password',
  SUBMIT_BTN: 'submit-btn',
  REG_BTN: 'registration-btn',
  BTN: 'button',
};

const createMailBlock = (): HTMLElement => {
  const labelMail = createCustomElement('label', [loginClasses.LABEL_MAIL], 'Your mail');
  const inputMail = createCustomElement('input', [loginClasses.INPUT_MAIL]) as HTMLInputElement;
  inputMail.type = 'text';
  inputMail.placeholder = 'mail';
  inputMail.autocomplete = 'email';
  inputMail.setAttribute('required', '');
  labelMail.append(inputMail);
  return labelMail;
};

const createPasswordBlock = (): HTMLElement => {
  const labelPassword = createCustomElement('label', [loginClasses.LABEL_PAS], 'Your password');
  const inputPassword = createCustomElement('input', [loginClasses.INPUT_PAS]) as HTMLInputElement;
  inputPassword.type = 'password';
  inputPassword.placeholder = 'password';
  inputPassword.autocomplete = 'current-password';
  inputPassword.setAttribute('required', '');
  labelPassword.append(inputPassword);
  return labelPassword;
};

const createCheckbox = (): HTMLElement => {
  const checkboxLabel = createCustomElement('label', [loginClasses.LABEL_CHECKBOX], 'Open password');
  const checkbox = createCustomElement('input', [loginClasses.OPEN_PAS]) as HTMLInputElement;
  checkbox.type = 'checkbox';
  checkboxLabel.append(checkbox);
  return checkboxLabel;
};

export const drawLogInPage = (): void => {
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mainWrapper.innerHTML = '';
  const headingImg = createCustomElement('div', [loginClasses.IMG]);
  const heading = createCustomElement('h2', [loginClasses.HEADING], 'Log in profile');
  headingImg.append(heading);
  const authorization = createCustomElement('div', [loginClasses.AUTH]);
  const authorizationForm = createCustomElement('form', [loginClasses.AUTH_FORM]) as HTMLFormElement;
  authorizationForm.id = 'login-form';
  authorizationForm.method = 'POST';
  const mailBlock = createMailBlock();
  const passwordBlock = createPasswordBlock();
  const checkbox = createCheckbox();
  const submitBtn = createCustomElement(
    'button',
    [loginClasses.SUBMIT_BTN, loginClasses.BTN],
    'Submit',
  ) as HTMLButtonElement;
  submitBtn.type = 'submit';
  const registrationBtn = createCustomElement(
    'a',
    [loginClasses.REG_BTN, loginClasses.BTN],
    'Registration',
  ) as HTMLLinkElement;
  registrationBtn.href = '/registration';
  const or = createCustomElement('p', ['or'], 'or');
  authorizationForm.append(mailBlock, passwordBlock, checkbox, submitBtn);
  authorization.append(headingImg, authorizationForm, or, registrationBtn);
  mainWrapper.insertAdjacentHTML('beforeend', authorization.outerHTML);
};
