import { createCustomElement } from '../../shared/utilities/helper-functions';
import { RegistrationForm } from './registration-form';
import { checkPassword, checkName, checkSurname, checkBirth, checkCity, checkPost,  writeErrors} from './validation';

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
  const shippingstreetInput = form.ShippingstreetDiv.input;
  const shippingstreetValue = shippingstreetInput.value.trim();
  const shippingcityInput = form.ShippingcityDiv.input;
  const shippingcityValue = shippingcityInput.value.trim();
  const shippingpostInput = form.ShippingpostDiv.input;
  const shippingpostValue = shippingpostInput.value.trim();
  const shippingcountryInput = form.ShippingcountryDiv.input;
  const shippingcountryValue = shippingcountryInput.value.trim();
  const billingstreetInput = form.BillingstreetDiv.input;
  const billingstreetValue = billingstreetInput.value.trim();
  const billingcityInput = form.BillingcityDiv.input;
  const billingcityValue = billingcityInput.value.trim();
  const billingpostInput = form.BillingpostDiv.input;
  const billingpostValue = billingpostInput.value.trim();
  const billingcountryInput = form.BillingcountryDiv.input;
  const billingcountryValue = billingcountryInput.value.trim();
  const emailInput = form.emailDiv.input;
  const emailValue = emailInput.value.trim();
  const passwordInput = form.passwordDiv.input;
  const passwordValue = passwordInput.value.trim();

  const checkNameResult: Array<string> = checkName(nameValue);
  const checkSurnameResult: Array<string> = checkSurname(surnameValue);
  const checkBirthResult = checkBirth(birthValue);
  const shippingcheckCityResult: Array<string> = checkCity(shippingcityValue);
  const billingcheckCityResult: Array<string> = checkCity(billingcityValue);
  const shippingcheckPostResult = checkPost(shippingcountryValue, shippingpostValue);
  const billingcheckPostResult = checkPost(billingcountryValue, billingpostValue);
  const checkPass: Array<string> = checkPassword(passwordValue);

  if(checkNameResult){
    const formControl = nameInput.parentElement;
    const container = formControl?.querySelector('.small-text');
    if(container){
      container.innerHTML = '';
    }
    const errors = writeErrors(checkNameResult);
    nameInput.classList.add('input-error');
    container?.append(errors);
  } else {
      setSuccess(nameInput);
  }

  if(checkSurnameResult){
    const formControl = surnameInput.parentElement;
    const container = formControl?.querySelector('.small-text');
    if(container){
      container.innerHTML = '';
    }
    const errors = writeErrors(checkSurnameResult);
    surnameInput.classList.add('input-error');
    container?.append(errors);
  } else {
      setSuccess(surnameInput);
  }

  if(birthValue === ''){
      setError(birthInput, 'Date of birth cannot be blank');
  }
  if(!checkBirthResult){
    setError(birthInput, 'Oops! You must be over 13 years old')
  } else {
     setSuccess(birthInput);
  }

  if(shippingstreetValue === ''){
      setError(shippingstreetInput, 'Street cannot be blank')
  } else {
      setSuccess(shippingstreetInput);
  }

  if(billingstreetValue === ''){
    setError(billingstreetInput, 'Street cannot be blank')
} else {
    setSuccess(billingstreetInput);
}

  if(shippingcheckCityResult){
    const formControl = shippingcityInput.parentElement;
    const container = formControl?.querySelector('.small-text');
    if(container){
      container.innerHTML = '';
    }
    const errors = writeErrors(shippingcheckCityResult);
    shippingcityInput.classList.add('input-error');
    container?.append(errors);
  } else {
      setSuccess(shippingcityInput);
  }

  if(billingcheckCityResult){
    const formControl = billingcityInput.parentElement;
    const container = formControl?.querySelector('.small-text');
    if(container){
      container.innerHTML = '';
    }
    const errors = writeErrors(billingcheckCityResult);
    billingcityInput.classList.add('input-error');
    container?.append(errors);
  } else {
      setSuccess(billingcityInput);
  }

if(shippingcheckPostResult){
  const formControl = shippingpostInput.parentElement;
  const container = formControl?.querySelector('.small-text');
  if(container){
    container.innerHTML = '';
  }
  const errors = writeErrors(shippingcheckPostResult);
  shippingpostInput.classList.add('input-error');
  container?.append(errors);
} else {
    setSuccess(shippingpostInput);
}

if(billingcheckPostResult){
  const formControl = billingpostInput.parentElement;
  const container = formControl?.querySelector('.small-text');
  if(container){
    container.innerHTML = '';
  }
  const errors = writeErrors(billingcheckPostResult);
  billingpostInput.classList.add('input-error');
  container?.append(errors);
} else {
    setSuccess(billingpostInput);
}

if(shippingcountryValue === ''){
      setError(shippingcountryInput, 'Country cannot be blank');
  } else {
      setSuccess(shippingcountryInput);
  }

if(billingcountryValue === ''){
      setError(billingcountryInput, 'Country cannot be blank');
  } else {
      setSuccess(billingcountryInput);
  }

if(checkPass){
    const formControl = passwordInput.parentElement;
    const container = formControl?.querySelector('.small-text');
    if(container){
      container.innerHTML = '';
    }
    const errors = writeErrors(checkPass);
    passwordInput.classList.add('input-error');
    container?.append(errors);
  } else {
    setSuccess(passwordInput);
  }

  if(emailValue === ''){
      setError(emailInput, 'Email cannot be blank')
  } else if (!checkEmail(emailValue)) {
      setError(emailInput, 'Email is not correct. It must be xxxx@xxxx type')
  } else {
      setSuccess(emailInput)
  }
}

form.form.addEventListener('submit',(e: SubmitEvent) => {
  e.preventDefault();
  checkInputs();
});

form.radioButton2.input.addEventListener('click', () => {
  form.billingDiv.classList.add('billing-visible');
})

form.radioButton.input.addEventListener('click', () => {
  form.billingDiv.classList.remove('billing-visible');
})