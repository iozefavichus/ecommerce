import { removeLocalStorageLogin } from '../../app/localStorage/localStorage';

const KEY_1 = 'isLoginCustomer.isLogin';
const KEY_2 = 'refreshToken';
const KEY_3 = 'token';
const KEY_4 = 'expirationTime';

export const logoutCustomer = (): void => {
  const logoutBtn = document.querySelector('.log-out');
  logoutBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    removeLocalStorageLogin(KEY_1);
    removeLocalStorageLogin(KEY_2);
    removeLocalStorageLogin(KEY_3);
    removeLocalStorageLogin(KEY_4);
    location.reload();
  });
};
