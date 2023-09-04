import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createPageTitle } from '../../shared/utilities/title';
import { createFormDiv } from '../registration/creationform-helpers';
import { customRoute } from '../../app/router/router';
import { checkPassword } from '../registration/validation';
import { CheckIt, setError } from '../registration/validation-helpers';
import { StpClientApi } from '../../shared/api/stpClient-api';

const ChangePassword = (): HTMLElement => {
  const container = createCustomElement('div', ['container-changepass']);

  const oldPass = createFormDiv('old-passsword', 'Old password', 'password', 'old-passsword');
  const oldPasslink = createCustomElement('span', ['oldpass-control']);
  oldPass.container.append(oldPasslink);
  const newPass = createFormDiv('new-password', 'New password', 'password', 'new-password');
  const newPasslink = createCustomElement('span', ['newpass-control']);
  newPass.container.append(newPasslink);
  const repeatPass = createFormDiv('repeat-password', 'Repeat password', 'password', 'repeat-password');
  const repeatPasslink = createCustomElement('span', ['repeatpass-control']);
  repeatPass.container.append(repeatPasslink);

  const btnSave = createCustomElement('button', ['btn-save'], 'Save') as HTMLButtonElement;

  btnSave.addEventListener('click', () => {
    const emailVal = localStorage.getItem('email');
    const oldPassValue = oldPass.input.value.trim();
    const newPassValue = newPass.input.value.trim();
    const repeatPassValue = repeatPass.input.value.trim();
    const warningsArray = document.querySelectorAll('.small-visible');
    if (warningsArray.length === 0) {
      if (newPassValue && repeatPassValue && oldPassValue) {
        if (emailVal) {
          const id = localStorage.getItem('id');
          let version: string;
          const updatePassword = async () => {
            if (id) {
              const customer = await new StpClientApi().getCustomerbyId(id);
              version = String(customer.version);
              const updatePass = new StpClientApi().updatePassword(id, version, oldPassValue, newPassValue);
              updatePass
                .then(async (data) => {
                  if (data.statusCode === 200) {
                    try {
                      customRoute('/successchangedpass');
                    } catch {
                      throw Error('Cannot update password');
                    }
                  }
                })
                .catch(() => {
                  setError(oldPass.input, 'This is wrong password');
                });
            }
          };
          updatePassword();
        }
      } else {
        const message = 'This field cannot be blank';
        setError(newPass.input, message);
        setError(repeatPass.input, message);
        setError(oldPass.input, message);
      }
    }
  });

  const btnCancel = createCustomElement('button', ['btn-cancel'], 'Cancel') as HTMLButtonElement;
  btnCancel.addEventListener('click', () => {
    customRoute('/profile');
  });
  container.append(oldPass.container, newPass.container, repeatPass.container, btnSave, btnCancel);

  oldPass.input.addEventListener('input', (event) => {
    const password: string = (event.target as HTMLInputElement).value;
    CheckIt(checkPassword(password), oldPass.input);
  });
  newPass.input.addEventListener('input', (event) => {
    const password: string = (event.target as HTMLInputElement).value;
    CheckIt(checkPassword(password), newPass.input);
  });
  repeatPass.input.addEventListener('input', (event) => {
    const password: string = (event.target as HTMLInputElement).value;
    CheckIt(checkPassword(password), repeatPass.input);
    if (!(password === newPass.input.value)) {
      setError(repeatPass.input, 'Passwords are not the same');
    }
  });

  newPasslink.addEventListener('click', () => {
    if (newPasslink.classList.contains('newpass-control')) {
      newPasslink.classList.remove('newpass-control');
      newPasslink.classList.add('view-control');
      newPass.input.type = 'text';
    } else {
      newPasslink.classList.add('newpass-control');
      newPasslink.classList.remove('view-control');
      newPass.input.type = 'password';
    }
  });
  oldPasslink.addEventListener('click', () => {
    if (oldPasslink.classList.contains('oldpass-control')) {
      oldPasslink.classList.remove('oldpass-control');
      oldPasslink.classList.add('view-control');
      oldPass.input.type = 'text';
    } else {
      oldPasslink.classList.add('oldpass-control');
      oldPasslink.classList.remove('view-control');
      oldPass.input.type = 'password';
    }
  });
  repeatPasslink.addEventListener('click', () => {
    if (repeatPasslink.classList.contains('repeatpass-control')) {
      repeatPasslink.classList.remove('repeatpass-control');
      repeatPasslink.classList.add('view-control');
      repeatPass.input.type = 'text';
    } else {
      repeatPasslink.classList.add('repeatpass-control');
      repeatPasslink.classList.remove('view-control');
      repeatPass.input.type = 'password';
    }
  });

  return container;
};

export const drawChangePassword = async () => {
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mainWrapper.innerHTML = '';
  const wrapper = createCustomElement('div', ['wrapper']);
  mainWrapper?.append(wrapper);
  const pageTitle = createPageTitle('Change password');
  wrapper.append(pageTitle);
  const changePass = ChangePassword();
  wrapper.append(changePass);
};
