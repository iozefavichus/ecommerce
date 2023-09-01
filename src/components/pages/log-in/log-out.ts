import { removeLocalStorageValue } from '../../app/localStorage/localStorage';

const KEY_1 = 'token';
const KEY_2 = 'expirationTime';

const logoutCustomer = (): void => {
  const logoutBtn = document.querySelector('.log-out');
  logoutBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    removeLocalStorageValue(KEY_1);
    removeLocalStorageValue(KEY_2);
    location.reload();
  });
};

export { KEY_1, KEY_2, logoutCustomer };
