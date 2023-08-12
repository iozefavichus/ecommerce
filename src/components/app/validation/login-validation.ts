import { createCustomElement } from '../../shared/utilities/helper-functions';

const hasSpaceInStartOrEnd = (email: string) => {
  const trimmedEmail = email.trim();
  return trimmedEmail !== email;
};

const mailValidation = (): void => {
  const formatPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mailInput = document.querySelector('.authorization-form__mail') as HTMLInputElement;
  const labelMail = document.querySelector('.label-mail') as HTMLElement;
  const warningText = createCustomElement('p', ['warning-text']);
  labelMail.append(warningText);

  mailInput?.addEventListener('input', (event) => {
    const mail: string = (event.target as HTMLInputElement).value;

    if (!formatPattern.test(mail)) {
      warningText.textContent = 'Your formatted email address is not correct! Correct formatted user@domen.name';
      mailInput.style.border = '2px solid rgb(212, 4, 4)';
    } else if (hasSpaceInStartOrEnd(mail)) {
      warningText.textContent = 'Remove the space at the beginning or end of the email';
      mailInput.style.border = '2px solid rgb(212, 4, 4)';
    } else {
      warningText.textContent = '';
      mailInput.style.border = '2px solid rgb(8, 250, 4)';
    }
  });
};

const passwordValidation = (): void => {
  const uppercasePattern = /^(?=.*[A-Z])/;
  const lowercasePattern = /^(?=.*[a-z])/;
  const numberPattern = /^(?=.*[0-9])/;
  const valuePattern = /^(?=.*[!@#$%^&*])/;
  const pasInput = document.querySelector('.authorization-form__password') as HTMLInputElement;
  const pasLabel = document.querySelector('.label-password') as HTMLElement;
  const warningText = createCustomElement('p', ['warning-text']);
  pasLabel.append(warningText);

  pasInput?.addEventListener('input', (event) => {
    const password: string = (event.target as HTMLInputElement).value;

    if (!uppercasePattern.test(password)) {
      warningText.textContent = 'Password must contain at least one uppercase letter (A-Z).';
      pasInput.style.border = '2px solid rgb(212, 4, 4)';
    } else if (!lowercasePattern.test(password)) {
      warningText.textContent = 'Password must contain at least one lowercase letter (a-z).';
      pasInput.style.border = '2px solid rgb(212, 4, 4)';
    } else if (!numberPattern.test(password)) {
      warningText.textContent = 'Password must contain at least one digit (0-9).';
      pasInput.style.border = '2px solid rgb(212, 4, 4)';
    } else if (!valuePattern.test(password)) {
      warningText.textContent = 'Password must contain at least one special character (e.g., !@#$%^&*).';
      pasInput.style.border = '2px solid rgb(212, 4, 4)';
    } else if (password.length < 8) {
      warningText.textContent = 'Password must be at least 8 characters long.';
      pasInput.style.border = '2px solid rgb(212, 4, 4)';
    } else if (hasSpaceInStartOrEnd(password)) {
      warningText.textContent = 'Remove the space at the beginning or end of the password';
      pasInput.style.border = '2px solid rgb(212, 4, 4)';
    } else {
      warningText.textContent = '';
      pasInput.style.border = '2px solid rgb(8, 250, 4)';
    }
  });
};

export const loginValidation = (): void => {
  mailValidation();
  passwordValidation();
};
