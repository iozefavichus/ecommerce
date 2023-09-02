import { removeLocalStorageValue } from '../../app/localStorage/localStorage';

const KEY_1 = 'token';
const KEY_2 = 'expirationTime';
const KEY_5 = 'email';
const KEY_6 = 'id';

const logoutCustomer = (): void => {
  const logoutBtn = document.querySelector('.log-out');
  logoutBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    removeLocalStorageValue(KEY_1);
    removeLocalStorageValue(KEY_2);
    removeLocalStorageValue(KEY_5);
    removeLocalStorageValue(KEY_6);
    location.reload();
  });
};

export { KEY_1, KEY_2, logoutCustomer };
