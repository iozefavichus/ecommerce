import { BaseAddress } from '@commercetools/platform-sdk';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createPageTitle } from '../../shared/utilities/title';
import { PersonalInfo } from './from-personal';
import { AddressesInfo } from './form-addresses';
import { StpClientApi } from '../../shared/api/stpClient-api';
import { setLocalStorageValue } from '../../app/localStorage/localStorage';
import { customRoute } from '../../app/router/router';

export const drawProfile = async () => {
  let customer;
  let name: string | undefined;
  let surname: string | undefined;
  let birth: string | undefined;
  let customerAddresses: Array<BaseAddress> = [];

  const email = localStorage.getItem('email');

  if (email) {
    customer = await new StpClientApi().getCustomerInfoByEmail(email);
    setLocalStorageValue('id', customer[0].id);
  }

  if (customer) {
    name = customer[0].firstName;
    surname = customer[0].lastName;
    birth = customer[0].dateOfBirth;
    customerAddresses = customer[0].addresses;
  }

  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mainWrapper.innerHTML = '';
  const wrapper = createCustomElement('div', ['wrapper']);
  mainWrapper?.append(wrapper);
  const pageTitle = createPageTitle('Personal account');
  wrapper.append(pageTitle);
  const person = PersonalInfo(name, surname, birth);
  const passcontainer = createCustomElement('div', ['btnchange-container']);
  const btnChangePass = createCustomElement('button', ['btn-cnahge'], 'Change password') as HTMLButtonElement;
  btnChangePass.addEventListener('click', () => {
    customRoute('/changepassword');
  });
  passcontainer.append(btnChangePass);
  const addresses = AddressesInfo(customerAddresses);
  wrapper.append(person, passcontainer, addresses);
};
