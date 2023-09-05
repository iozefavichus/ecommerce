import { removeLocalStorageValue } from '../../app/localStorage/localStorage';

const KEY_1 = 'token';
const KEY_2 = 'expirationTime';
const KEY_3 = 'email';
const KEY_4 = 'id';

const logoutCustomer = (event: MouseEvent): void => {
  event.preventDefault();
  removeLocalStorageValue(KEY_1);
  removeLocalStorageValue(KEY_2);
  removeLocalStorageValue(KEY_3);
  removeLocalStorageValue(KEY_4);
  window.history.pushState({}, '', '/');
  location.reload();
};

export { KEY_1, KEY_2, logoutCustomer };
