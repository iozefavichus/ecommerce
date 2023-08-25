
import { removeLocalStorageValue } from '../../app/localStorage/localStorage';

const KEY_1 = 'isLoginCustomer.isLogin';
const KEY_2 = 'refreshToken';
const KEY_3 = 'token';
const KEY_4 = 'expirationTime';


export const logoutCustomer = (): void => {
  const logoutBtn = document.querySelector('.log-out');
  logoutBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    removeLocalStorageValue(KEY_1);
    removeLocalStorageValue(KEY_2);
    removeLocalStorageValue(KEY_3);
    removeLocalStorageValue(KEY_4);
    location.reload();
  });
};
