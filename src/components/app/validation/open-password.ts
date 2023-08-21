export const changePasswordDisplay = (event: MouseEvent): void => {
  const checkbox = event.target as HTMLInputElement;
  const passwordInput = document.querySelector('.authorization-form__password') as HTMLInputElement;

  passwordInput.type = checkbox.checked ? 'text' : 'password';
};
