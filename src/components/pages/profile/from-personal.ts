import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createFormDiv } from '../registration/creationform-helpers';
import { CheckIt, setError, setSuccess } from '../registration/validation-helpers';
import { checkName, checkSurname, checkBirth, checkEmail } from '../registration/validation';
import { customRoute } from '../../app/router/router';
// import { StpClientApi } from '../../shared/api/stpClient-api';
// import { personalInfoObj } from '../../../types/shared';

export const PersonalInfo = (nameValue: string|undefined, surnameValue: string|undefined, dateOfbirthValue: string|undefined): HTMLElement => {

  const emailValue = localStorage.getItem('email');

  const container = createCustomElement('div', ['container-personal']);

  const personalDiv = createCustomElement('div',['title-personalinfo'],'Personal Information');

  const btnEdit = createCustomElement('button', ['btn-edit'], 'Edit') as HTMLButtonElement;
  personalDiv.append(btnEdit);

  const email = createFormDiv('email', 'Email', 'email-personal', 'text');
  email.container.classList.add('container-info');
  email.input.classList.add('input-info');
  email.input.setAttribute('readonly', 'readonly');
  email.input.value = `${emailValue}`;

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

  const btnChangePass =createCustomElement('button', ['btn-cnahge'], 'Change password') as HTMLButtonElement;
  btnChangePass.addEventListener(('click'),()=>{
    customRoute('/changepassword');

  })

  container.append(personalDiv, email.container, name.container, surname.container, dateOfbirth.container, btnSave, btnChangePass);

  // const checkInputs = () => {
  //   const nameInput = name.input;
  //   const nameValue = nameInput.value.trim();
  //   const surnameInput = surname.input;
  //   const surnameValue = surnameInput.value.trim();
  //   const birthInput = dateOfbirth.input;
  //   const birthValue = birthInput.value.trim();

  //   const checkNameResult: Array<string> = checkName(nameValue);
  //   const checkSurnameResult: Array<string> = checkSurname(surnameValue);
  //   const checkBirthResult = checkBirth(birthValue);

  //   CheckIt(checkNameResult, nameInput);
  //   CheckIt(checkSurnameResult, surnameInput);

  //   if (birthValue === '') {
  //     setError(birthInput, 'Date of birth cannot be blank');
  //   }

  //   if (!checkBirthResult) {
  //     setError(birthInput, 'Oops! You must be over 13 years old');
  //   } else {
  //     setSuccess(birthInput);
  //   }
  // }

  btnEdit.addEventListener('click',()=>{
    btnSave.classList.remove('btn-invisible');
    email.input.removeAttribute('readonly');
    name.input.removeAttribute('readonly');
    surname.input.removeAttribute('readonly');
    dateOfbirth.input.removeAttribute('readonly');
    email.input.classList.remove('input-info');
    name.input.classList.remove('input-info');
    surname.input.classList.remove('input-info');
    dateOfbirth.input.classList.remove('input-info');
  })


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

  // const personalInfo: personalInfoObj = {
  //   email: email.input.value.trim(),
  //   password:'aa',
  //   firstName: name.input.value.trim(),
  //   lastName: surname.input.value.trim(),
  //   dateOfBirth: dateOfbirth.input.value.trim(),

  // };


  btnSave.addEventListener('click',()=>{
    // checkInputs();
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
      // const email = localStorage.getItem('email');
      if(email){
        // const customer =  new StpClientApi().getCustomerInfoByEmail(email);
        // const updateCustomer = new StpClientApi().updateCustomer(customer, personalInfo);
        // updateCustomer
      // .then(async (data) => {
        // if (data.statusCode === 201) {
        //   try {
        //     btnSave.classList.add('btn-invisible');
        //     name.input.setAttribute('readonly', 'readonly');
        //     surname.input.setAttribute('readonly', 'readonly');
        //     dateOfbirth.input.setAttribute('readonly', 'readonly');
        //     name.input.classList.add('input-info');
        //     surname.input.classList.add('input-info');
        //     dateOfbirth.input.classList.add('input-info');
        //   } catch {
        //     throw Error('Cannot update personal information');
        //   }
        // }
      // })
      }
    }
  })

  return container;
};
