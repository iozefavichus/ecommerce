import { ClientApi } from './clientAPI';

// login: lafa@gmail.com
// password: aA1!aaaa
export const authorization = () => {
  const formElem = document.querySelector('#login-form');

  formElem?.addEventListener('submit', (event) => {
    event.preventDefault();
    const mailInput = document.querySelector('.authorization-form__mail') as HTMLInputElement;
    const passwordInput = document.querySelector('.authorization-form__password') as HTMLInputElement;
    const email = mailInput.value;
    const password = passwordInput.value;

    if (email !== null && password !== null) {
      const token = new ClientApi().loginCustomer(email, password);
      console.log(token.clientRequest());
    }
  });
};
