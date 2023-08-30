import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createFormDiv } from '../registration/creationform-helpers';
import { CheckIt, setError, setSuccess } from '../registration/validation-helpers';
import { checkName, checkSurname, checkBirth } from '../registration/validation';

export const PersonalInfo = (nameValue: string|undefined, surnameValue: string|undefined, dateOfbirthValue: string|undefined): HTMLElement => {

  const container = createCustomElement('div', ['container-personal']);

  const personalDiv = createCustomElement('div',['title-personalinfo'],'Personal Information');

  const btnEdit = createCustomElement('button', ['btn-edit'], 'Edit') as HTMLButtonElement;
  personalDiv.append(btnEdit);

  const name = createFormDiv('name', 'First name', 'name-personal', 'text');
  name.container.classList.add('container-info');
  name.input.classList.add('input-info');
  name.input.setAttribute('readonly', 'readonly');
  name.input.value = `${nameValue}`;

  const surname = createFormDiv('surname', 'Last name', 'surname-personal', 'text');
  surname.container.classList.add('container-info');
  surname.input.classList.add('input-info');
  surname.input.setAttribute('readonly', 'readonly');
  surname.input.value = `${surnameValue}`;

  const dateOfbirth = createFormDiv('dateOfbirth', 'Date of birth', 'date-personal', 'date');
  dateOfbirth.container.classList.add('container-info');
  dateOfbirth.input.classList.add('input-info');
  dateOfbirth.input.setAttribute('readonly', 'readonly');
  dateOfbirth.input.value = `${dateOfbirthValue}`;

  const btnSave = createCustomElement('button', ['btn-edit'], 'Save') as HTMLButtonElement;
  btnSave.classList.add('btn-invisible');

  container.append(personalDiv, name.container, surname.container, dateOfbirth.container, btnSave);

  const checkInputs = () => {
    const nameInput = name.input;
    const nameValue = nameInput.value.trim();
    const surnameInput = surname.input;
    const surnameValue = surnameInput.value.trim();
    const birthInput = dateOfbirth.input;
    const birthValue = birthInput.value.trim();

    const checkNameResult: Array<string> = checkName(nameValue);
    const checkSurnameResult: Array<string> = checkSurname(surnameValue);
    const checkBirthResult = checkBirth(birthValue);

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
  }

  btnEdit.addEventListener('click',()=>{
    btnSave.classList.remove('btn-invisible');
    name.input.removeAttribute('readonly');
    surname.input.removeAttribute('readonly');
    dateOfbirth.input.removeAttribute('readonly');
    name.input.classList.remove('input-info');
    surname.input.classList.remove('input-info');
    dateOfbirth.input.classList.remove('input-info');
  })

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

  btnSave.addEventListener('click',()=>{
    checkInputs();
    const warningsArray = document.querySelectorAll('.small-visible');
    if (warningsArray.length === 0) {
      btnSave.classList.add('btn-invisible');
      name.input.setAttribute('readonly', 'readonly');
      surname.input.setAttribute('readonly', 'readonly');
      dateOfbirth.input.setAttribute('readonly', 'readonly');
      name.input.classList.add('input-info');
      surname.input.classList.add('input-info');
      dateOfbirth.input.classList.add('input-info');
    }
  })

  return container;
};
