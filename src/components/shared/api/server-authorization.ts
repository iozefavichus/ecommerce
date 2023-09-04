import { setLocalStorageValue } from '../../app/localStorage/localStorage';
import { customRoute } from '../../app/router/router';
import { applyStyle } from '../../app/validation/login-valid';
import { KEY_1, KEY_2 } from '../../pages/log-in/log-out';
import { createCustomElement } from '../utilities/helper-functions';
import { authTokenCache } from './build-client';
import { StpClientApi } from './stpClient-api';

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
      const customer = await new StpClientApi(email).getCustomerByEmail();
      const hasCustomer: boolean = customer.body.results.length > 0;

      if (hasCustomer) {
        try {
          await new StpClientApi(email, password).loginCustomer();
          const tokenData = Object.entries(authTokenCache.get());
          for (const [key, value] of tokenData) {
            if (key === KEY_1 || key === KEY_2) {
              setLocalStorageValue(key, value.toString() ?? '');
            }
          }
          customRoute('/');
          setLocalStorageValue('email', email);
        } catch (err) {
          passwordInput.value = '';
          notFoundText.textContent = 'Incorrect password entered';
        }
      } else {
        mailInput.value = '';
        passwordInput.value = '';
        applyStyle(passwordInput, isValid);
        applyStyle(mailInput, isValid);
        notFoundText.textContent = 'This email address has not been registered.';
      }
    }
  });
};
