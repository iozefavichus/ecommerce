// import { mailValidation } from '../../app/validation/login-validation';
import { createCustomElement } from '../../shared/utilities/helper-functions';

const createMailBlock = (): HTMLElement => {
  const labelMail = createCustomElement('label', ['label-mail'], 'Your mail');
  const inputMail = createCustomElement('input', ['authorization-form__mail']) as HTMLInputElement;
  inputMail.type = 'text';
  inputMail.placeholder = 'mail';
  inputMail.autocomplete = 'email';
  inputMail.setAttribute('required', '');
  labelMail.append(inputMail);
  return labelMail;
};

const createPasswordBlock = (): HTMLElement => {
  const labelPassword = createCustomElement('label', ['label-password'], 'Your password');
  const inputPassword = createCustomElement('input', ['authorization-form__password']) as HTMLInputElement;
  inputPassword.type = 'password';
  inputPassword.placeholder = 'password';
  inputPassword.autocomplete = 'current-password';
  inputPassword.setAttribute('required', '');
  labelPassword.append(inputPassword);
  return labelPassword;
};

const createCheckbox = (): HTMLElement => {
  const checkboxLabel = createCustomElement('label', ['label-checkbox'], 'Open password');
  const checkbox = createCustomElement('input', ['open-password']) as HTMLInputElement;
  checkbox.type = 'checkbox';
  checkboxLabel.append(checkbox);
  return checkboxLabel;
};

export const drawLogInPage = () => {
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mainWrapper.innerHTML = '';
  const headingImg = createCustomElement('div', ['heading-img']);
  const heading = createCustomElement('h2', ['heading-login'], 'Log in profile');
  headingImg.append(heading);
  const authorization = createCustomElement('div', ['authorization']);
  const authorizationForm = createCustomElement('form', ['authorization-form']) as HTMLFormElement;
  authorizationForm.id = 'login-form';
  authorizationForm.method = 'POST';
  const mailBlock = createMailBlock();
  const passwordBlock = createPasswordBlock();
  const checkbox = createCheckbox();
  const submitBtn = createCustomElement('button', ['submit-btn', 'button'], 'Submit') as HTMLButtonElement;
  submitBtn.type = 'submit';
  const registrationBtn = createCustomElement('a', ['registration-btn', 'button'], 'Registration') as HTMLLinkElement;
  registrationBtn.href = '/registration';
  const or = createCustomElement('p', ['or'], 'or');
  authorizationForm.append(mailBlock, passwordBlock, checkbox, submitBtn);
  authorization.append(headingImg, authorizationForm, or, registrationBtn);
  mainWrapper.insertAdjacentHTML('beforeend', authorization.outerHTML);
};
