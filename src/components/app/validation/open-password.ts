export const changePasswordDisplay = (): void => {
  const checkbox = document.querySelector('.open-password') as HTMLInputElement;
  const passwordInput = document.querySelector('.authorization-form__password') as HTMLInputElement;

  checkbox?.addEventListener('click', (): void => {
    passwordInput.type = checkbox.checked ? 'text' : 'password';
  });
};
