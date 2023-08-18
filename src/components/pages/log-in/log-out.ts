import { removeLocalStorageLogin } from '../../app/localStorage/localStorage';

export const logoutCustomer = () => {
  const logoutBtn = document.querySelector('.log-out');
  const localKey = 'isLoginCustomer.isLogin';
  logoutBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    removeLocalStorageLogin(localKey);
    location.reload();
  });
};
