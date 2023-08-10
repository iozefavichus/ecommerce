import { createCustomElement } from '../../shared/utilities/helper-functions';
import { RegistrationForm } from './registration-form';
import { checkPassword } from './passwordvalidation';

const form = RegistrationForm();

const createPageTitle = (): HTMLElement => {
    const bgMain = createCustomElement('div', ['reg-img']);
    const registrationBlock = createCustomElement('div', ['registration-block']);
    const registrationTitle = createCustomElement('p', ['registration__title'], `Registration page`);
    const registrationSubtitle = createCustomElement('p', ['registration__subtitle'], `Home > Registration page`);

    registrationBlock.append(registrationTitle, registrationSubtitle);
    bgMain.append(registrationBlock);
    return bgMain;
}

export const drawRegistration = () => {
    const body = document.querySelector('body');
    const wrapper = createCustomElement('div', ['wrapper']);
    body?.append(wrapper);
    const pageTitle = createPageTitle();
    wrapper.append(pageTitle);
    const registration = form;
    wrapper.append(registration.wrapper);
  };


const setError = (input: HTMLInputElement, message: string) => {
  input.classList.add('input-error');
  const formControl = input.parentElement;
  const small = formControl?.querySelector('.small-text');
  if(small){
      small.classList.add('small-visible');
      small.innerHTML = message;
  }
}

const setSuccess = (input: HTMLInputElement) => {
  input.classList.remove('input-error');
  const formControl = input.parentElement;
  formControl?.classList.remove('form-error');
  const small = formControl?.querySelector('.small-text');
  small?.classList.remove('small-visible');
}

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const checkEmail = (email: string): boolean => EMAIL_REGEXP.test(email);

export const checkInputs = () => {
  const nameInput = form.nameDiv.input;
  const nameValue = nameInput.value.trim();
  const surnameInput = form.surnameDiv.input;
  const surnameValue = surnameInput.value.trim();
  const birthInput = form.birthDiv.input;
  const birthValue = birthInput.value.trim();
  const streetInput = form.streetDiv.input;
  const streetValue = streetInput.value.trim();
  const cityInput = form.cityDiv.input;
  const cityValue = cityInput.value.trim();
  const postInput = form.postDiv.input;
  const postValue = postInput.value.trim();
  const countryInput = form.countryDiv.input;
  const countryValue = countryInput.value.trim();
  const emailInput = form.emailDiv.input;
  const emailValue = emailInput.value.trim();
  const passwordInput = form.passwordDiv.input;
  const passwordValue = passwordInput.value.trim();

  if(nameValue === ''){
      setError(nameInput, 'Name cannot be blank')
  } else {
      setSuccess(nameInput);
  }

  if(surnameValue === ''){
      setError(surnameInput, 'Surname cannot be blank')
  } else {
      setSuccess(surnameInput);
  }

  if(birthValue === ''){
      setError(birthInput, 'Date of birth cannot be blank')
  } else {
      setSuccess(birthInput);
  }

  if(streetValue === ''){
      setError(streetInput, 'Street cannot be blank')
  } else {
      setSuccess(streetInput);
  }

  if(cityValue === ''){
      setError(cityInput, 'City cannot be blank')
  } else {
      setSuccess(cityInput);
  }

  if(postValue === ''){
      setError(postInput, 'Post cannot be blank')
  } else {
      setSuccess(postInput);
  }

  if(countryValue === ''){
      setError(countryInput, 'Country cannot be blank');
  } else {
      setSuccess(countryInput);
  }

  const checkPass = checkPassword(passwordValue);

  if(checkPass){
    setError(passwordInput, checkPass)
  } else {
    setSuccess(passwordInput);
  }

  if(emailValue === ''){
      setError(emailInput, 'Email cannot be blank')
  } else if (!checkEmail(emailValue)) {
      setError(emailInput, 'Email is not correct')
  } else {
      setSuccess(emailInput)
  }
}

form.form.addEventListener('submit',(e: SubmitEvent) => {
  e.preventDefault();
  checkInputs();
});
