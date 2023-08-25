import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createFormDiv } from '../registration/creationform-helpers';
// import { StpClientApi } from "../../shared/api/stpClient-api";

export const PersonalInfo = (): HTMLElement => {
    // const email = localStorage.email();
    // const getCustomer = new StpClientApi().returnCustomerByEmail(email);

  const container = createCustomElement('div', ['container-personal']);

  const btnEdit = createCustomElement('button', ['btn-edit'], 'Edit') as HTMLButtonElement;

  const name = createFormDiv('name', 'Name', 'name-personal', 'text');
  name.input.setAttribute('readonly', 'readonly');
  //   name.input.setAttribute('value',`${}`);
  const surname = createFormDiv('surname', 'Surname', 'surname-personal', 'text');
  surname.input.setAttribute('readonly', 'readonly');
  const dateOfbirth = createFormDiv('dateOfbirth', 'Date of birth', 'date-personal', 'text');
  dateOfbirth.input.setAttribute('readonly', 'readonly');

  const btnSave = createCustomElement('button', ['btn-edit'], 'Save') as HTMLButtonElement;

  container.append(btnEdit, name.container, surname.container, dateOfbirth.container, btnSave);

  return container;
};
