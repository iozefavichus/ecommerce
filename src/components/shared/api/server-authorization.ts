import { getLocalStorageLogin, setLocalStorageLogin } from '../../app/localStorage/localStorage';
import { customRoute } from '../../app/router/router';
import { applyStyle } from '../../app/validation/login-validation';
import { createCustomElement } from '../utilities/helper-functions';
import { StpClientApi } from './stpClient-api';

export const isLoginCustomer = {
  isLogin: getLocalStorageLogin('isLoginCustomer.isLogin'),
};

// sdk@example.com
// password: aA1!aaaa
// fhdsjfhsj@gmail.com
// Xm@8CH9XB8StGGQ

export const authorization = () => {
  const isValid = false;
  const formElem = document.querySelector('#login-form') as HTMLElement;
  const notFoundText = createCustomElement('p', ['not-customer']) as HTMLParagraphElement;
  formElem.prepend(notFoundText);

  formElem?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const mailInput = document.querySelector('.authorization-form__mail') as HTMLInputElement;
    const passwordInput = document.querySelector('.authorization-form__password') as HTMLInputElement;
    const email = mailInput.value;
    const password = passwordInput.value;

    if (email !== null && password !== null) {
      const hasCustomer = (await new StpClientApi().returnCustomerByEmail(email)).body.results.length > 0;

      if (hasCustomer) {
        try {
          await new StpClientApi().loginCustomer(email, password);
          isLoginCustomer.isLogin = true;
          setLocalStorageLogin('isLoginCustomer.isLogin', true);
          customRoute('/');
        } catch {
          passwordInput.value = '';
          applyStyle(passwordInput, isValid);
          notFoundText.textContent = 'Incorrect password entered';
        }
      } else {
        mailInput.value = '';
        applyStyle(mailInput, isValid);
        notFoundText.textContent = 'This email address has not been registered.';
      }
    }
  });
};
