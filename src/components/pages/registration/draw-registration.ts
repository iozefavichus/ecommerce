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

const CheckIt = (result: Array<string>, input: HTMLInputElement ) => {
  if(result.length > 0){
    const formControl = input.parentElement;
    const container = formControl?.querySelector('.small-text');
    container?.classList.add('small-visible');
    if(container){
      container.innerHTML = '';
    }
    const errors = writeErrors(result);
    input.classList.add('input-error');
    container?.append(errors);
  } else {
    setSuccess(input);
  }
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
  const emailInput = form.emailDiv.input;
  const emailValue = emailInput.value.trim();
  const passwordInput = form.passwordDiv.input;
  const passwordValue = passwordInput.value.trim();

  const checkNameResult: Array<string> = checkName(nameValue);
  const checkSurnameResult: Array<string> = checkSurname(surnameValue);
  const checkBirthResult = checkBirth(birthValue);
  const shippingcheckCityResult: Array<string> = checkCity(shippingcityValue);
  const shippingcheckPostResult = checkPost('USA', shippingpostValue);
  const checkPass: Array<string> = checkPassword(passwordValue);

  CheckIt(checkNameResult, nameInput);
  CheckIt(checkSurnameResult, surnameInput);

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

CheckIt(shippingcheckCityResult, shippingcityInput);
CheckIt(shippingcheckPostResult, shippingpostInput);
CheckIt(checkPass, passwordInput);

  if(emailValue === ''){
      setError(emailInput, 'Email cannot be blank')
  } else if (!checkEmail(emailValue)) {
      setError(emailInput, 'Email is not correct. It must be xxxx@xxxx type')
  } else {
      setSuccess(emailInput)
  }
}

const checkBillingInfo = () => {
  const billingstreetInput = form.BillingstreetDiv.input;
  const billingstreetValue = billingstreetInput.value.trim();
  const billingcityInput = form.BillingcityDiv.input;
  const billingcityValue = billingcityInput.value.trim();
  const billingpostInput = form.BillingpostDiv.input;
  const billingpostValue = billingpostInput.value.trim();

  const billingcheckCityResult: Array<string> = checkCity(billingcityValue);
  const billingcheckPostResult = checkPost('USA', billingpostValue);

  if(billingstreetValue === ''){
    setError(billingstreetInput, 'Street cannot be blank')
  } else {
    setSuccess(billingstreetInput);
  }
  CheckIt(billingcheckCityResult, billingcityInput);
  CheckIt(billingcheckPostResult, billingpostInput);
}

form.form.addEventListener('submit',(e: SubmitEvent) => {
  e.preventDefault();
  checkInputs();
  if(form.billingDiv.classList.contains('billing-visible')){
    checkBillingInfo();
  }
});

form.radioButton2.input.addEventListener('click', () => {
  form.billingDiv.classList.add('billing-visible');
})

form.radioButton.input.addEventListener('click', () => {
  form.billingDiv.classList.remove('billing-visible');
})