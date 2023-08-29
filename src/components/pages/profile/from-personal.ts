import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createFormDiv } from '../registration/creationform-helpers';
// import { StpClientApi } from "../../shared/api/stpClient-api";

export const PersonalInfo = (): HTMLElement => {
    // const {email} = localStorage;


    // const customerName = async (email:string) => {
    //   const result =  await new StpClientApi().getCustomerByEmail(email);
    //   const customer = await result;
    //   console.log(customer[0].firstName);
    //   return customer[0].firstName;
    // }

  const container = createCustomElement('div', ['container-personal']);

  const btnEdit = createCustomElement('button', ['btn-edit'], 'Edit') as HTMLButtonElement;

  const name = createFormDiv('name', 'Name', 'name-personal', 'text');
  name.container.classList.add('container-info');
  name.input.classList.add('input-info');
  name.input.setAttribute('readonly', 'readonly');
  // name.input.value = `${}`;

  const surname = createFormDiv('surname', 'Surname', 'surname-personal', 'text');
  surname.container.classList.add('container-info');
  surname.input.classList.add('input-info');
  surname.input.setAttribute('readonly', 'readonly');
  // surname.input.value = `${}`;

  const dateOfbirth = createFormDiv('dateOfbirth', 'Birth', 'date-personal', 'text');
  dateOfbirth.container.classList.add('container-info');
  dateOfbirth.input.classList.add('input-info');
  dateOfbirth.input.setAttribute('readonly', 'readonly');
  // dateOfbirth.input.value = `${}`;

  const btnSave = createCustomElement('button', ['btn-edit'], 'Save') as HTMLButtonElement;
  btnSave.classList.add('btn-invisible');

  container.append(btnEdit, name.container, surname.container, dateOfbirth.container, btnSave);

  // const fields = async () => {
  //   await name.input.setAttribute('value',`${customerName(email)}`);
  // }

  // fields();

  return container;
};
