import { writeErrors } from './validation';

export const setError = (input: HTMLInputElement, message: string) => {
  input.classList.add('input-error');
  const formControl = input.parentElement;
  const small = formControl?.querySelector('.small-text');
  if (small) {
    small.classList.add('small-visible');
    small.innerHTML = message;
  }
};

export const setSuccess = (input: HTMLInputElement) => {
  input.classList.remove('input-error');
  const formControl = input.parentElement;
  formControl?.classList.remove('form-error');
  const small = formControl?.querySelector('.small-text');
  small?.classList.remove('small-visible');
};

export const CheckIt = (result: Array<string>, input: HTMLInputElement) => {
  if (result.length > 0) {
    const formControl = input.parentElement;
    const container = formControl?.querySelector('.small-text');
    container?.classList.add('small-visible');
    if (container) {
      container.innerHTML = '';
    }
    const errors = writeErrors(result);
    input.classList.add('input-error');
    container?.append(errors);
  } else {
    setSuccess(input);
  }
};
