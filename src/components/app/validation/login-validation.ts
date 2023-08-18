import { createCustomElement } from '../../shared/utilities/helper-functions';

const hasSpaceInStartOrEnd = (email: string) => {
  const trimmedEmail = email.trim();
  return trimmedEmail !== email;
};

export const redBorder = (input: HTMLInputElement) => {
  input.style.border = '2px solid rgb(212, 4, 4)';
};

export const greenBorder = (input: HTMLInputElement) => {
  input.style.border = '2px solid rgb(8, 250, 4)';
};

const mailValidation = (): void => {
  const formatPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const lettersPattern = /^(?=.*[a-zA-Z])/;
  const mailInput = document.querySelector('.authorization-form__mail') as HTMLInputElement;
  const labelMail = document.querySelector('.label-mail') as HTMLElement;
  const warningText = createCustomElement('p', ['warning-text']);
  labelMail.append(warningText);

  mailInput?.addEventListener('input', (event) => {
    const mail: string = (event.target as HTMLInputElement).value;

    if (!formatPattern.test(mail)) {
      warningText.textContent = 'Your formatted email address is not correct! Correct formatted user@domen.name';
      redBorder(mailInput);
    } else if (hasSpaceInStartOrEnd(mail)) {
      warningText.textContent = 'Remove the space at the beginning or end of the email';
      redBorder(mailInput);
    } else if (!lettersPattern.test(mail)) {
      warningText.textContent = 'Please use Latin letters';
      redBorder(mailInput);
    } else {
      warningText.textContent = '';
      greenBorder(mailInput);
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
      redBorder(pasInput);
    } else if (!lowercasePattern.test(password)) {
      warningText.textContent = 'Password must contain at least one lowercase letter (a-z).';
      redBorder(pasInput);
    } else if (!numberPattern.test(password)) {
      warningText.textContent = 'Password must contain at least one digit (0-9).';
      redBorder(pasInput);
    } else if (!valuePattern.test(password)) {
      warningText.textContent = 'Password must contain at least one special character (e.g., !@#$%^&*).';
      redBorder(pasInput);
    } else if (password.length < 8) {
      warningText.textContent = 'Password must be at least 8 characters long.';
      redBorder(pasInput);
    } else if (hasSpaceInStartOrEnd(password)) {
      warningText.textContent = 'Remove the space at the beginning or end of the password';
      redBorder(pasInput);
    } else {
      warningText.textContent = '';
      greenBorder(pasInput);
    }
  });
};

export const loginValidation = (): void => {
  mailValidation();
  passwordValidation();
};
