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

const setLabel = (elem: HTMLElement, labelfor: string): void=> {
    elem.setAttribute('for', labelfor);
  };

const setInput = (elem: HTMLElement, name?: string, type?:string, placeholder?: string, required?: boolean ): void=> {
    elem.setAttribute('name', name ?? '');
    elem.setAttribute('type', type ?? '');
    elem.setAttribute('placeholder', placeholder ?? '');
    if (required) {
        elem.setAttribute('required','');
    }
  };

const createRegistration = (): HTMLElement => {
    const bgMain = createCustomElement('div', ['reg-main']);
    const registrationForm = createCustomElement('form',['registration_form']);
    const registrationContainer = createCustomElement('div', ['reg-container']);
    const nameLabel = createCustomElement('label',['label'],'Name *');
    setLabel(nameLabel, 'name');
    const nameInput = createCustomElement('input',['input']);
    setInput(nameInput, 'name', 'text', '', true)
    const surnameLabel = createCustomElement('label',['label'],'Surname *');
    setLabel(surnameLabel, 'surname');
    const surnameInput = createCustomElement('input',['input']);
    setInput(surnameInput, 'surname', 'text', '', true)
    const birthLabel = createCustomElement('label',['label'],'Date of birthday *');
    setLabel(birthLabel, 'birth');
    const birthInput = createCustomElement('input',['input']);
    setInput(birthInput, 'birth', 'date', '', true)
    const streetLabel = createCustomElement('label',['label'],'Street *');
    setLabel(streetLabel, 'street');
    const streetInput = createCustomElement('input',['input']);
    setInput(streetInput, 'street', 'text', '', true)
    const cityLabel = createCustomElement('label',['label'],'City *');
    setLabel(cityLabel, 'city');
    const cityInput = createCustomElement('input',['input']);
    setInput(cityInput, 'city', 'text', '', true)
    const postLabel = createCustomElement('label',['label'],'Postal Code *');
    setLabel(postLabel, 'post');
    const postInput = createCustomElement('input',['input']);
    setInput(postInput, 'post', 'number', '', true)
    const countryLabel = createCustomElement('label',['label'],'Country *');
    setLabel(countryLabel, 'country');
    const countryInput = createCustomElement('input',['input']);
    setInput(countryInput, 'country', 'text', '', true)
    const emailLabel = createCustomElement('label',['label'],'Email *');
    setLabel(emailLabel, 'email');
    const emailInput = createCustomElement('input',['input']);
    setInput(emailInput, 'email', 'text', '', true)
    const passwordLabel = createCustomElement('label',['label'],'Password *');
    setLabel(passwordLabel, 'password');
    const passwordInput = createCustomElement('input',['input']);
    setInput(passwordInput, 'password', 'psw', '', true)
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