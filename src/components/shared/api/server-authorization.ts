import { setLocalStorageValue } from '../../app/localStorage/localStorage';
import { customRoute } from '../../app/router/router';
import { applyStyle } from '../../app/validation/login-valid';
import { createCustomElement } from '../utilities/helper-functions';
import { AuthClientApi } from './authClient-api';
import { pasTokenCache } from './build-client';
import { StpClientApi } from './stpClient-api';
// import { isToken } from './token';

// export const isLoginCustomer: Record<string, boolean> = {
//   isLogin: isToken(),
// };

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
      const customer = await new StpClientApi(email).getCustomerByEmail();
      const hasCustomer: boolean = customer.body.results.length > 0;

      if (hasCustomer) {
        try {
          await new AuthClientApi(email, password).loginCustomer();
          // console.log(customer.body.customer.firstName);
          isLoginCustomer.isLogin = true;
          setLocalStorageValue('email',email);
          // isLoginCustomer.isLogin = true;
          const tokenData = Object.entries(pasTokenCache.get());
          for (const [key, value] of tokenData) {
            setLocalStorageValue(key, value.toString());
          }
          customRoute('/');
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
