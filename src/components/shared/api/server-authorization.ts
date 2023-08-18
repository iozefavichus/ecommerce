import { getLoginInLocalStorage, setLoginInLocalStorage } from '../../app/localStorage/localStorage';
import { customRoute } from '../../app/router/router';
import { applyStyle } from '../../app/validation/login-validation';
import { createCustomElement } from '../utilities/helper-functions';
import { StpClientApi } from './stpClient-api';

export const isLoginCustomer = {
  isLogin: getLoginInLocalStorage('isLoginCustomer.isLogin'),
};

// login: lafa@gmail.com
// password: aA1!aaaa
// kuz@kuz.com
// Xm@8CH9XB8StGGQ

export const authorization = () => {
  const formElem = document.querySelector('#login-form');
  const notFoundText = createCustomElement('p', ['not-customer']) as HTMLParagraphElement;

  formElem?.addEventListener('submit', (event) => {
    event.preventDefault();
    const mailInput = document.querySelector('.authorization-form__mail') as HTMLInputElement;
    const passwordInput = document.querySelector('.authorization-form__password') as HTMLInputElement;
    const email = mailInput.value;
    const password = passwordInput.value;

    if (email !== null && password !== null) {
      const authCustomer = new StpClientApi().loginCustomer(email, password);
      authCustomer
        .then((data) => {
          if (data.statusCode === 200) {
            isLoginCustomer.isLogin = true;
            setLoginInLocalStorage('isLoginCustomer.isLogin', true);
            customRoute('/');
          }
        })
        .catch((error) => {
          const isValid = false;
          mailInput.value = '';
          passwordInput.value = '';
          applyStyle(mailInput, isValid);
          applyStyle(passwordInput, isValid);
          notFoundText.textContent = `${error.message} Maybe the wrong password`;
          formElem.prepend(notFoundText);
        });
    }
  });
};
