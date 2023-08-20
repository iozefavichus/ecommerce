import { getLocalStorageLogin, setLocalStorageLogin } from '../../app/localStorage/localStorage';
import { customRoute } from '../../app/router/router';
import { applyStyle } from '../../app/validation/login-valid';
import { createCustomElement } from '../utilities/helper-functions';
import { StpClientApi } from './stpClient-api';

export const isLoginCustomer: Record<string, boolean> = {
  isLogin: getLocalStorageLogin('isLoginCustomer.isLogin'),
};

// sdk@example.com
// password: aA1!aaaa
// fhdsjfhsj@gmail.com
// Xm@8CH9XB8StGGQ
// Lala@test.com
// password: aA1!aaaa

export const authorization = (): void => {
  const isValid = false;
  const formElem = document.querySelector('#login-form') as HTMLElement;
  const notFoundText = createCustomElement('p', ['not-customer']) as HTMLParagraphElement;
  formElem.prepend(notFoundText);

  formElem?.addEventListener('submit', async (event): Promise<void> => {
    event.preventDefault();
    const mailInput = document.querySelector('.authorization-form__mail') as HTMLInputElement;
    const passwordInput = document.querySelector('.authorization-form__password') as HTMLInputElement;
    const email: string = mailInput.value;
    const password: string = passwordInput.value;

    if (email !== null && password !== null) {
      const hasCustomer: boolean = (await new StpClientApi().returnCustomerByEmail(email)).body.results.length > 0;

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
