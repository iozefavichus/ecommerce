import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createFormDiv } from '../registration/creationform-helpers';
import { CheckIt, setError, setSuccess } from '../registration/validation-helpers';
import { checkName, checkSurname, checkBirth, checkEmail } from '../registration/validation';
import { StpClientApi } from '../../shared/api/stpClient-api';
import { setLocalStorageValue } from '../../app/localStorage/localStorage';
import { customRoute } from '../../app/router/router';

export const PersonalInfo = (
  nameValue: string | undefined,
  surnameValue: string | undefined,
  dateOfbirthValue: string | undefined,
): HTMLElement => {
  const emailValue = localStorage.getItem('email');

  const container = createCustomElement('div', ['container-personal']);
  const personalDiv = createCustomElement('div', ['title-personalinfo'], 'Personal Information');

  const btnEdit = createCustomElement('button', ['btn-edit'], 'Edit') as HTMLButtonElement;
  personalDiv.append(btnEdit);

  const email = createFormDiv('email-personal', 'Email', 'text', 'email-personal');
  email.container.classList.add('container-info');
  email.input.classList.add('input-info');
  email.input.setAttribute('readonly', 'readonly');
  email.input.value = `${emailValue}`;

  const name = createFormDiv('name-personal', 'First name', 'text', 'name-personal');
  name.container.classList.add('container-info');
  name.input.classList.add('input-info');
  name.input.setAttribute('readonly', 'readonly');
  name.input.value = `${nameValue}`;

  const surname = createFormDiv('surname-personal', 'Last name', 'text', 'surname-personal');
  surname.container.classList.add('container-info');
  surname.input.classList.add('input-info');
  surname.input.setAttribute('readonly', 'readonly');
  surname.input.value = `${surnameValue}`;

  const dateOfbirth = createFormDiv('date-personal', 'Date of birth', 'date', 'date-personal');
  dateOfbirth.container.classList.add('container-info');
  dateOfbirth.input.classList.add('input-info');
  dateOfbirth.input.setAttribute('readonly', 'readonly');
  dateOfbirth.input.value = `${dateOfbirthValue}`;

  const btnSave = createCustomElement('button', ['btn-save'], 'Save changes') as HTMLButtonElement;
  btnSave.classList.add('btn-invisible');

  const btnCancel = createCustomElement('button', ['btn-cancel'], 'Cancel') as HTMLButtonElement;
  btnCancel.classList.add('btn-invisible');
  btnCancel.addEventListener('click', () => {
    customRoute('/profile');
  });

  container.append(
    personalDiv,
    email.container,
    name.container,
    surname.container,
    dateOfbirth.container,
    btnSave,
    btnCancel,
  );

  btnEdit.addEventListener('click', () => {
    btnSave.classList.remove('btn-invisible');
    btnCancel.classList.remove('btn-invisible');
    email.input.removeAttribute('readonly');
    name.input.removeAttribute('readonly');
    surname.input.removeAttribute('readonly');
    dateOfbirth.input.removeAttribute('readonly');
    email.input.classList.remove('input-info');
    name.input.classList.remove('input-info');
    surname.input.classList.remove('input-info');
    dateOfbirth.input.classList.remove('input-info');
  });

  email.input.addEventListener('input', (event) => {
    const emailValue: string = (event.target as HTMLInputElement).value.trim();
    if (emailValue === '') {
      setError(email.input, 'Email cannot be blank');
    } else if (!checkEmail(emailValue)) {
      setError(email.input, 'Email is not correct. It must be xxxx@xxxx.xxx type');
    } else {
      setSuccess(email.input);
    }
  });
  name.input.addEventListener('input', (event) => {
    const nameValue: string = (event.target as HTMLInputElement).value.trim();
    CheckIt(checkName(nameValue), name.input);
  });
  surname.input.addEventListener('input', (event) => {
    const surnameValue: string = (event.target as HTMLInputElement).value.trim();
    CheckIt(checkSurname(surnameValue), surname.input);
  });
  dateOfbirth.input.addEventListener('input', (event) => {
    const birthdate: string = (event.target as HTMLInputElement).value.trim();
    if (birthdate === '') {
      setError(dateOfbirth.input, 'Date of birth cannot be blank');
    }
    if (!checkBirth(birthdate)) {
      setError(dateOfbirth.input, 'Oops! You must be over 13 years old');
    } else {
      setSuccess(dateOfbirth.input);
    }
  });

  const takeValue = () => {
    const valueforName = name.input.value.trim();
    const valueforSurName = surname.input.value.trim();
    const valueforBirth = dateOfbirth.input.value.trim();
    const valueEmail = email.input.value.trim();
    return { valueforName, valueforSurName, valueforBirth, valueEmail };
  };

  btnSave.addEventListener('click', () => {
    const { valueforName, valueforSurName, valueforBirth, valueEmail } = takeValue();
    const warningsArray = document.querySelectorAll('.small-visible');
    if (warningsArray.length === 0) {
      btnSave.classList.add('btn-invisible');
      email.input.setAttribute('readonly', 'readonly');
      name.input.setAttribute('readonly', 'readonly');
      surname.input.setAttribute('readonly', 'readonly');
      dateOfbirth.input.setAttribute('readonly', 'readonly');
      email.input.classList.add('input-info');
      name.input.classList.add('input-info');
      surname.input.classList.add('input-info');
      dateOfbirth.input.classList.add('input-info');

      const emailVal = localStorage.getItem('email');
      if (emailVal) {
        const id = localStorage.getItem('id');
        let version: string;
        const updateCus = async () => {
          if (id) {
            const customer = await new StpClientApi().getCustomerbyId(id);
            version = String(customer.version);
          }
          const updateCustomer = new StpClientApi().updateCustomer(
            localStorage.id,
            version,
            valueforName,
            valueforSurName,
            valueforBirth,
            valueEmail,
          );
          setLocalStorageValue('email', valueEmail);
          updateCustomer.then(async (data) => {
            if (data.statusCode === 201) {
              try {
                btnSave.classList.add('btn-invisible');
                btnCancel.classList.add('btn-invisible');
                name.input.setAttribute('readonly', 'readonly');
                surname.input.setAttribute('readonly', 'readonly');
                dateOfbirth.input.setAttribute('readonly', 'readonly');
                name.input.classList.add('input-info');
                surname.input.classList.add('input-info');
                dateOfbirth.input.classList.add('input-info');
              } catch {
                throw Error('Cannot update personal information');
              }
            }
          });
        };
        updateCus();
        customRoute('/successupdate');
      }
    }
  });

  return container;
};
