import { createCustomElement } from '../../shared/utilities/helper-functions';
import { RegistrationForm } from './registration-form';
import { checkPassword, checkName, checkSurname, checkBirth, checkCity, checkPost, checkEmail } from './validation';
import { createPageTitle } from '../../shared/utilities/title';
import { StpClientApi } from '../../shared/api/stpClient-api';
import { customRoute } from '../../app/router/router';
import { setLocalStorageValue } from '../../app/localStorage/localStorage';
import { regCardObj } from '../../../types/shared';
import { setError, setSuccess, CheckIt } from './validation-helpers';
import { authTokenCache } from '../../shared/api/build-client';
import { KEY_1, KEY_2 } from '../log-in/log-out';

export const form = RegistrationForm();

export const drawRegistration = () => {
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mainWrapper.innerHTML = '';
  const wrapper = createCustomElement('div', ['wrapper']);
  mainWrapper?.append(wrapper);
  const pageTitle = createPageTitle('Registration page');
  wrapper.append(pageTitle);
  const registration = form;
  wrapper.append(registration.wrapper);
};

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

  if (birthValue === '') {
    setError(birthInput, 'Date of birth cannot be blank');
  }

  if (!checkBirthResult) {
    setError(birthInput, 'Oops! You must be over 13 years old');
  } else {
    setSuccess(birthInput);
  }

  if (shippingstreetValue === '') {
    setError(shippingstreetInput, 'Street cannot be blank');
  } else {
    setSuccess(shippingstreetInput);
  }

  CheckIt(shippingcheckCityResult, shippingcityInput);
  CheckIt(shippingcheckPostResult, shippingpostInput);
  CheckIt(checkPass, passwordInput);

  if (emailValue === '') {
    setError(emailInput, 'Email cannot be blank');
  } else if (!checkEmail(emailValue)) {
    setError(emailInput, 'Email is not correct. It must be xxxx@xxxx type');
  } else {
    setSuccess(emailInput);
  }
};

const checkBillingInfo = () => {
  const billingstreetInput = form.BillingstreetDiv.input;
  const billingstreetValue = billingstreetInput.value.trim();
  const billingcityInput = form.BillingcityDiv.input;
  const billingcityValue = billingcityInput.value.trim();
  const billingpostInput = form.BillingpostDiv.input;
  const billingpostValue = billingpostInput.value.trim();

  const billingcheckCityResult: Array<string> = checkCity(billingcityValue);
  const billingcheckPostResult = checkPost('USA', billingpostValue);

  if (billingstreetValue === '') {
    setError(billingstreetInput, 'Street cannot be blank');
  } else {
    setSuccess(billingstreetInput);
  }
  CheckIt(billingcheckCityResult, billingcityInput);
  CheckIt(billingcheckPostResult, billingpostInput);
};

form.form.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();
  checkInputs();
  if (form.billingDiv.classList.contains('billing-visible')) {
    checkBillingInfo();
  }

  let cityBilling = form.ShippingcityDiv.input.value.trim();
  let streetBilling = form.ShippingstreetDiv.input.value.trim();
  let postalCodeBilling = form.ShippingpostDiv.input.value.trim();

  if (form.BillingcityDiv.input.value) {
    cityBilling = form.BillingcityDiv.input.value.trim();
    streetBilling = form.BillingstreetDiv.input.value.trim();
    postalCodeBilling = form.BillingpostDiv.input.value.trim();
  }

  let shipDef;
  const shippingDefaultcheck = document.getElementById('default-shipping') as HTMLInputElement;
  if (shippingDefaultcheck.checked) {
    shipDef = 0;
  }
  let billDef;
  const billinggDefaultcheck = document.getElementById('default-billing') as HTMLInputElement;
  if (billinggDefaultcheck.checked) {
    billDef = 1;
  }

  const registrationCard: regCardObj = {
    email: form.emailDiv.input.value.trim(),
    firstName: form.nameDiv.input.value.trim(),
    lastName: form.surnameDiv.input.value.trim(),
    password: form.passwordDiv.input.value.trim(),
    dateOfBirth: form.birthDiv.input.value,
    addresses: [
      {
        country: 'US',
        city: form.ShippingcityDiv.input.value.trim(),
        streetName: form.ShippingstreetDiv.input.value.trim(),
        postalCode: form.ShippingpostDiv.input.value.trim(),
      },
      {
        country: 'US',
        city: cityBilling,
        streetName: streetBilling,
        postalCode: postalCodeBilling,
      },
    ],
    shippingAddresses: [0],
    billingAddresses: [1],
    defaultShippingAddress: shipDef,
    defaultBillingAddress: billDef,
  };

  const warningsArray = document.querySelectorAll('.small-visible');
  if (warningsArray.length === 0) {
    const createCustomer = new StpClientApi().createCustomer(registrationCard);
    createCustomer
      .then(async (data) => {
        if (data.statusCode === 201) {
          try {
            const { email, password } = registrationCard;
            await new StpClientApi(email, password).loginCustomer();
            const tokenData = Object.entries(authTokenCache.get());
            for (const [key, value] of tokenData) {
              if (key === KEY_1 || key === KEY_2) {
                setLocalStorageValue(key, value.toString() ?? '');
              }
            }
            setLocalStorageValue('email', email);
            customRoute('/success');
          } catch {
            throw Error('User is not login');
          }
        }
      })
      .catch((error) => {
        setError(form.emailDiv.input, error.message);
      });
  }
});

form.radioButton2.input.addEventListener('click', () => {
  form.billingDiv.classList.add('billing-visible');
});

form.radioButton.input.addEventListener('click', () => {
  form.billingDiv.classList.remove('billing-visible');
});
