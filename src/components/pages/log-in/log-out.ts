import { removeLoginInLocalStorage } from '../../app/localStorage/localStorage';

export const logoutCustomer = () => {
  const logoutBtn = document.querySelector('.log-out');
  const localKey = 'isLoginCustomer.isLogin';
  logoutBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    removeLoginInLocalStorage(localKey);
    location.reload();
  });
};
