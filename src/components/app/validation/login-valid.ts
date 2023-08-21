const patterns: Record<string, RegExp> = {
  FORMAT: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  SYMBOL_IN_DOMAINE: /@.*[!@#$%^&*]/,
  UPPERCASE: /^(?=.*[A-Z])/,
  LOWERCASE: /^(?=.*[a-z])/,
  NUMBER: /^(?=.*[0-9])/,
  VALUE: /^(?=.*[№`~!@#$^&*()=[\]\\{}|;':",/<>?£])/,
};

const VALID_COLOR = '2px solid rgb(8, 250, 4)';
const INVALID_COLOR = '2px solid rgb(212, 4, 4)';

const hasSpaceInStartOrEnd = (email: string): boolean => {
  const withoutSpacesEmail = email.replace(' ', '');
  return withoutSpacesEmail === email;
};

const applyStyle = (input: HTMLInputElement, isValid: boolean): void => {
  if (isValid) {
    input.style.border = VALID_COLOR;
  } else {
    input.style.border = INVALID_COLOR;
  }
};

const toggleValidClass = (input: HTMLInputElement, isValid: boolean) => {
  if (isValid) {
    input.style.border = VALID_COLOR;
    input.classList.add('valid');
  } else {
    input.style.border = INVALID_COLOR;
    input.classList.remove('valid');
  }
};

const toggleSubmitBtnActivation = (): void => {
  const submitBtn = document.querySelector('.submit-btn') as HTMLButtonElement;
  const mailInput = document.querySelector('.authorization-form__mail');
  const pasInput = document.querySelector('.authorization-form__password');
  const mailIsValid = mailInput?.classList.contains('valid');
  const pasIsValid = pasInput?.classList.contains('valid');

  if (mailIsValid && pasIsValid) {
    submitBtn.disabled = false;
    submitBtn.classList.remove('disable');
  } else {
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
    toggleValidClass(mailInput, isValid);
  } else if (!patterns.FORMAT.test(mail)) {
    elem.textContent = 'Your formatted email address is not correct! Correct formatted user@domen.name';
    isValid = false;
    applyStyle(mailInput, isValid);
    toggleValidClass(mailInput, isValid);
  } else {
    elem.textContent = '';
    isValid = true;
    applyStyle(mailInput, isValid);
    toggleValidClass(mailInput, isValid);
  }
  toggleSubmitBtnActivation();
};

const validationPassword = (password: string, warningText: HTMLElement): void => {
  let isValid = false;
  const pasInput = document.querySelector('.authorization-form__password') as HTMLInputElement;

  if (!patterns.UPPERCASE.test(password)) {
    warningText.textContent = 'Password must contain at least one uppercase letter (A-Z).';
    applyStyle(pasInput, isValid);
    toggleValidClass(pasInput, isValid);
  } else if (!patterns.LOWERCASE.test(password)) {
    warningText.textContent = 'Password must contain at least one lowercase letter (a-z).';
    applyStyle(pasInput, isValid);
    toggleValidClass(pasInput, isValid);
  } else if (!patterns.NUMBER.test(password)) {
    warningText.textContent = 'Password must contain at least one digit (0-9).';
    applyStyle(pasInput, isValid);
    toggleValidClass(pasInput, isValid);
  } else if (!patterns.VALUE.test(password)) {
    warningText.textContent = 'Password must contain at least one special character (e.g., !@#$%^&*).';
    applyStyle(pasInput, isValid);
    toggleValidClass(pasInput, isValid);
  } else if (password.length < 8) {
    warningText.textContent = 'Password must be at least 8 characters long.';
    applyStyle(pasInput, isValid);
    toggleValidClass(pasInput, isValid);
  } else if (!hasSpaceInStartOrEnd(password)) {
    warningText.textContent = 'Delete the space in the password line';
    isValid = false;
    applyStyle(pasInput, isValid);
    toggleValidClass(pasInput, isValid);
  } else {
    warningText.textContent = '';
    isValid = true;
    applyStyle(pasInput, isValid);
    toggleValidClass(pasInput, isValid);
  }
  toggleSubmitBtnActivation();
};

export { applyStyle, validationMail, validationPassword };
