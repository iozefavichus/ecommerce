import { createCustomElement } from '../../shared/utilities/helper-functions';

const createPageTitle = (): HTMLElement => {
    const bgMain = createCustomElement('div', ['reg-img']);
    const registrationBlock = createCustomElement('div', ['registration-block']);
    const registrationTitle = createCustomElement('p', ['registration__title'], `Registration page`);
    const registrationSubtitle = createCustomElement('p', ['registration__subtitle'], `Home > Registration page`);

    registrationBlock.append(registrationTitle, registrationSubtitle);
    bgMain.append(registrationBlock);
    return bgMain;

}

const createRegistration = (): HTMLElement => {
    const bgMain = createCustomElement('div', ['reg-main']);
    const registrationForm = createCustomElement('form',['registration_form']);
    const registrationContainer = createCustomElement('div', ['reg-container']);
    const nameLabel = createCustomElement('label',['label'],'Name *');
    nameLabel.setAttribute('for','name');
    nameLabel.setAttribute('required','');
    const nameInput = createCustomElement('input',['input']);
    nameInput.setAttribute('name','name');
    const surnameLabel = createCustomElement('label',['label'],'Surname *');
    surnameLabel.setAttribute('for','surname');
    surnameLabel.setAttribute('required','');
    const surnameInput = createCustomElement('input',['input']);
    surnameInput.setAttribute('name','surname');
    const birthLabel = createCustomElement('label',['label'],'Date of birthday *');
    birthLabel.setAttribute('required','');
    const birthInput = createCustomElement('input',['input']);
    const streetLabel = createCustomElement('label',['label'],'Street *');
    streetLabel.setAttribute('required','');
    const streetInput = createCustomElement('input',['input']);
    const cityLabel = createCustomElement('label',['label'],'City *');
    cityLabel.setAttribute('required','');
    const cityInput = createCustomElement('input',['input']);
    const postLabel = createCustomElement('label',['label'],'Postal Code *');
    postLabel.setAttribute('required','');
    const postInput = createCustomElement('input',['input']);
    const countryLabel = createCustomElement('label',['label'],'Country *');
    const countryInput = createCustomElement('input',['input']);
    const emailLabel = createCustomElement('label',['label'],'Email *');
    const emailInput = createCustomElement('input',['input']);
    emailInput.setAttribute('type','email');
    const passwordLabel = createCustomElement('label',['label'],'Password *');
    const passwordInput = createCustomElement('input',['input']);
    passwordInput.setAttribute('type','psw');
    const registrationBtn = createCustomElement('button', ['registration__button'], 'Register');


    registrationForm.append(registrationContainer);
    registrationContainer.append(nameLabel, nameInput, surnameLabel, surnameInput, birthLabel, birthInput, streetLabel, streetInput, cityLabel, cityInput, postLabel, postInput, countryLabel, countryInput, emailLabel, emailInput, passwordLabel, passwordInput, registrationBtn);
    bgMain.append(registrationForm);
    return bgMain;
}

export const drawRegistration = () => {
    const body = document.querySelector('body');
    const wrapper = createCustomElement('div', ['wrapper']);
    body?.append(wrapper);
    const pageTitle = createPageTitle();
    wrapper.append(pageTitle);
    const registration = createRegistration();
    wrapper.append(registration);
  };