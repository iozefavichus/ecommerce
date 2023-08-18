import { createCustomElement } from '../../shared/utilities/helper-functions';

const patterns: Record<string, RegExp> = {
  FORMAT: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  SYMBOL_IN_NAME: /^[^!@#$%^&*]+@/,
  SYMBOL_IN_DOMAINE: /@.*[!@#$%^&*0-9]/,
  UPPERCASE: /^(?=.*[A-Z])/,
  LETTERS: /^(.*[a-zA-Z])/,
  LOWERCASE: /^(?=.*[a-z])/,
  NUMBER: /^(?=.*[0-9])/,
  VALUE: /^(?=.*[!@#$%^&*])/,
};

const classNames: Record<string, string> = {
  WARNING_TEXT: 'warning-text',
};

const VALID_COLOR = '2px solid rgb(8, 250, 4)';
const INVALID_COLOR = '2px solid rgb(212, 4, 4)';

const hasSpaceInStartOrEnd = (email: string) => {
  const withoutSpacesEmail = email.replace(' ', '');
  return withoutSpacesEmail === email;
};

export const applyStyle = (input: HTMLInputElement, isValid: boolean) => {
  const submitBtn = document.querySelector('.submit-btn') as HTMLButtonElement;

  if (isValid) {
    input.style.border = VALID_COLOR;
    submitBtn.disabled = false;
    submitBtn.classList.remove('disable');
  } else {
    input.style.border = INVALID_COLOR;
    submitBtn.disabled = true;
    submitBtn.classList.add('disable');
  }
};

const validationMail = (): void => {
  let isValid = false;
  const labelMail = document.querySelector('.label-mail') as HTMLElement;
  const mailInput = document.querySelector('.authorization-form__mail') as HTMLInputElement;
  const warningText = createCustomElement('p', [classNames.WARNING_TEXT]);
  labelMail.append(warningText);

  mailInput?.addEventListener('input', (event) => {
    const mail: string = (event.target as HTMLInputElement).value;

    if (!hasSpaceInStartOrEnd(mail)) {
      warningText.textContent = 'Remove the space at the beginning or end of the email';
      isValid = false;
      applyStyle(mailInput, isValid);
    } else if (!patterns.LETTERS.test(mail)) {
      warningText.textContent = 'Please use Latin letters';
      isValid = false;
      applyStyle(mailInput, isValid);
    } else if (
      !patterns.FORMAT.test(mail) ||
      !patterns.SYMBOL_IN_NAME.test(mail) ||
      patterns.SYMBOL_IN_DOMAINE.test(mail)
    ) {
      warningText.textContent = 'Your formatted email address is not correct! Correct formatted user@domen.name';
      isValid = false;
      applyStyle(mailInput, isValid);
    } else {
      warningText.textContent = '';
      isValid = true;
      applyStyle(mailInput, isValid);
    }
  });
};

const validationPassword = (): void => {
  let isValid = false;
  const pasInput = document.querySelector('.authorization-form__password') as HTMLInputElement;
  const pasLabel = document.querySelector('.label-password') as HTMLElement;
  const warningText = createCustomElement('p', [classNames.WARNING_TEXT]);
  pasLabel.append(warningText);

  pasInput?.addEventListener('input', (event) => {
    const password: string = (event.target as HTMLInputElement).value;

    if (!patterns.UPPERCASE.test(password)) {
      warningText.textContent = 'Password must contain at least one uppercase letter (A-Z).';
      isValid = false;
      applyStyle(pasInput, isValid);
    } else if (!patterns.LOWERCASE.test(password)) {
      warningText.textContent = 'Password must contain at least one lowercase letter (a-z).';
      isValid = false;
      applyStyle(pasInput, isValid);
    } else if (!patterns.NUMBER.test(password)) {
      warningText.textContent = 'Password must contain at least one digit (0-9).';
      isValid = false;
      applyStyle(pasInput, isValid);
    } else if (!patterns.VALUE.test(password)) {
      warningText.textContent = 'Password must contain at least one special character (e.g., !@#$%^&*).';
      isValid = false;
      applyStyle(pasInput, isValid);
    } else if (password.length < 8) {
      warningText.textContent = 'Password must be at least 8 characters long.';
      isValid = false;
      applyStyle(pasInput, isValid);
    } else if (!hasSpaceInStartOrEnd(password)) {
      warningText.textContent = 'Remove the space at the beginning or end of the password';
      isValid = false;
      applyStyle(pasInput, isValid);
    } else {
      warningText.textContent = '';
      isValid = true;
      applyStyle(pasInput, isValid);
    }
  });
};

export const loginValidation = (): void => {
  validationMail();
  validationPassword();
};
