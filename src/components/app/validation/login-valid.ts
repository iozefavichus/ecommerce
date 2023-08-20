import { Constants } from '../../../types/shared';
import { createCustomElement } from '../../shared/utilities/helper-functions';

const patterns: Record<string, RegExp> = {
  FORMAT: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  SYMBOL_IN_NAME: /^[^!@#$%^&*]+@/,
  SYMBOL_IN_DOMAINE: /@.*[!@#$%^&*0-9]/,
  UPPERCASE: /^(?=.*[A-Z])/,
  LOWERCASE: /^(?=.*[a-z])/,
  NUMBER: /^(?=.*[0-9])/,
  VALUE: /^(?=.*[!@#$%^&*])/,
};

const classNames: Constants = {
  WARNING_TEXT: 'warning-text',
  INVALID: 'invalid',
};

const VALID_COLOR = '2px solid rgb(8, 250, 4)';
const INVALID_COLOR = '2px solid rgb(212, 4, 4)';

const hasSpaceInStartOrEnd = (email: string): boolean => {
  const withoutSpacesEmail = email.replace(' ', '');
  return withoutSpacesEmail === email;
};

const applyStyle = (input: HTMLInputElement, isValid: boolean): void => {
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

const validationMail = (mail: string, elem: HTMLElement): void => {
  let isValid = false;
  const mailInput = document.querySelector('.authorization-form__mail') as HTMLInputElement;

  if (!hasSpaceInStartOrEnd(mail)) {
    elem.textContent = 'Delete the space in the email line';
    isValid = false;
    applyStyle(mailInput, isValid);
  } else if (
    !patterns.FORMAT.test(mail) ||
    !patterns.SYMBOL_IN_NAME.test(mail) ||
    patterns.SYMBOL_IN_DOMAINE.test(mail)
  ) {
    elem.textContent =
      "Your formatted email address is not correct! Correct formatted user@domen.name, you don't can use !@#$%^&*";
    isValid = false;
    applyStyle(mailInput, isValid);
  } else {
    elem.textContent = '';
    isValid = true;
    applyStyle(mailInput, isValid);
  }
};

const validationPassword = (): void => {
  let isValid = false;
  const pasInput = document.querySelector('.authorization-form__password') as HTMLInputElement;
  const pasLabel = document.querySelector('.label-password') as HTMLElement;
  const warningText = createCustomElement('p', [classNames.WARNING_TEXT]);
  pasLabel.append(warningText);

  pasInput?.addEventListener('input', (event): void => {
    const password: string = (event.target as HTMLInputElement).value;

    if (!patterns.UPPERCASE.test(password)) {
      warningText.textContent = 'Password must contain at least one uppercase letter (A-Z).';
      applyStyle(pasInput, isValid);
    } else if (!patterns.LOWERCASE.test(password)) {
      warningText.textContent = 'Password must contain at least one lowercase letter (a-z).';
      applyStyle(pasInput, isValid);
    } else if (!patterns.NUMBER.test(password)) {
      warningText.textContent = 'Password must contain at least one digit (0-9).';
      applyStyle(pasInput, isValid);
    } else if (!patterns.VALUE.test(password)) {
      warningText.textContent = 'Password must contain at least one special character (e.g., !@#$%^&*).';
      applyStyle(pasInput, isValid);
    } else if (password.length < 8) {
      warningText.textContent = 'Password must be at least 8 characters long.';
      applyStyle(pasInput, isValid);
    } else if (!hasSpaceInStartOrEnd(password)) {
      warningText.textContent = 'Delete the space in the password line';
      isValid = false;
      applyStyle(pasInput, isValid);
    } else {
      warningText.textContent = '';
      isValid = true;
      applyStyle(pasInput, isValid);
    }
  });
};

const loginValidation = (): void => {
  // validationMail();
  validationPassword();
};

export { applyStyle, validationMail, validationPassword, loginValidation };
