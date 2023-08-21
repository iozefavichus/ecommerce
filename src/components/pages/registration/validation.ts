import { createCustomElement } from '../../shared/utilities/helper-functions';

const regUppercase = /^(?=.*[A-Z])/;
const regLowercase = /^(?=.*[a-z])/;
const regNumbers = /^(?=.*[0-9])/;
const regSpecial = /^(?=.*[!@£#$%^&*_-])/;
const regPost = {
  USA: /\d{5}/,
};

export const hasSpaceInStartOrEnd = (email: string) => {
  const trimmedEmail = email.trim();
  return trimmedEmail !== email;
};

export const checkPassword = (value: string): Array<string> => {
  const result: Array<string> = [];
  if (value.length < 8) {
    result.push('Password must be at least 8 characters long');
  }
  if (!regUppercase.test(value)) {
    result.push('Password must contain at least one uppercase letter (A-Z)');
  }
  if (!regLowercase.test(value)) {
    result.push('Password must contain at least one lowercase letter (a-z)');
  }
  if (!regNumbers.test(value)) {
    result.push('Password must contain at least one digit (0-9)');
  }
  if (!regSpecial.test(value)) {
    result.push('Password must contain at least one special character (e.g., !@#$%^&*)');
  }
  if (hasSpaceInStartOrEnd(value)) {
    result.push('Password must not contain leading or trailing whitespace');
  }
  return result;
};

export const checkName = (value: string): Array<string> => {
  const result: Array<string> = [];
  if (value.length < 1) {
    result.push('Name must be at least 1 character long');
  } else if (regNumbers.test(value) || regSpecial.test(value)) {
    result.push('Name must not contain special characters or number.');
  }
  return result;
};

export const checkSurname = (value: string): Array<string> => {
  const result: Array<string> = [];
  if (value.length < 1) {
    result.push('Surname must be at least 1 character long');
  } else if (regNumbers.test(value) || regSpecial.test(value)) {
    result.push('Surname must not contain special characters or numbers.');
  }
  return result;
};

export const checkBirth = (value: string): boolean => {
  const date = new Date(value);
  const difference: number = +(new Date().getTime() - +date) / (24 * 3600 * 365.25 * 1000);
  return difference >= 13;
};

export const checkCity = (value: string): Array<string> => {
  const result: Array<string> = [];
  if (value.length < 1) {
    result.push('City must be at least 1 character long');
  } else if (regNumbers.test(value) || regSpecial.test(value)) {
    result.push('City must not contain special characters or numbers');
  }
  return result;
};

export const checkPost = (country: string, value: string): Array<string> => {
  const result: Array<string> = [];
  if (value.length < 1) {
    result.push('Post code cannot be blank');
  } else if (country === 'USA' && (!regPost.USA.test(value) || value.length > 5)) {
    result.push('Your post code does not match USA postal codes.');
    result.push('You need DDDDD format (where D - digit)');
  } else if (country === '') {
    result.push('Please enter your country first');
  }
  return result;
};

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const checkEmail = (email: string): boolean => EMAIL_REGEXP.test(email);

export const writeErrors = (errors: Array<string>): HTMLElement => {
  const container = createCustomElement('ul', ['warnings']);
  for (let i = 0; i < errors.length; i += 1) {
    const li = createCustomElement('li', ['list-item']);
    li.innerHTML = errors[i];
    container.append(li);
  }
  return container;
};
