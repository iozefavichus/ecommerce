export const changePasswordDisplay = () => {
  const checkbox = document.querySelector('.open-password') as HTMLInputElement;
  const passwordInput = document.querySelector('.authorization-form__password') as HTMLInputElement;

  checkbox?.addEventListener('click', () => {
    if (checkbox.checked) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  });
};
