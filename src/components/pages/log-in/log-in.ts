import { createCustomElement } from '../../shared/utilities/helper-functions';

const createMailBlock = (): HTMLElement => {
  const labelMail = createCustomElement('label', ['label-mail'], 'Your mail');
  const inputMail = createCustomElement('input', ['authorization-form__mail']) as HTMLInputElement;
  inputMail.type = 'email';
  inputMail.placeholder = 'mail';
  inputMail.setAttribute('required', '');
  labelMail.append(inputMail);
  return labelMail;
};

const createPasswordBlock = (): HTMLElement => {
  const labelPassword = createCustomElement('label', ['label-password'], 'Your password');
  const inputPassword = createCustomElement('input', ['authorization-form__password']) as HTMLInputElement;
  inputPassword.type = 'password';
  inputPassword.placeholder = 'password';
  inputPassword.setAttribute('required', '');
  labelPassword.append(inputPassword);
  return labelPassword;
};

export const drawLogInPage = () => {
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mainWrapper.innerHTML = '';
  const heading = createCustomElement('h2', ['heading-login'], 'Log in profile');
  const authorization = createCustomElement('div', ['Authorization']);
  const authorizationForm = createCustomElement('form', ['authorization-form']) as HTMLFormElement;
  authorizationForm.action = '/';
  authorizationForm.method = 'POST';
  const mailBlock = createMailBlock();
  const passwordBlock = createPasswordBlock();
  const submitBtn = createCustomElement('button', ['submit-btn', 'button'], 'Submit');
  const registrationBtn = createCustomElement('a', ['registration-btn', 'button'], 'Registration') as HTMLLinkElement;
  registrationBtn.href = '/registration';
  const or = createCustomElement('p', ['or'], 'or');
  authorizationForm.append(mailBlock, passwordBlock, submitBtn, or, registrationBtn);
  authorization.append(heading, authorizationForm);
  mainWrapper.insertAdjacentHTML('beforeend', authorization.outerHTML);
};
