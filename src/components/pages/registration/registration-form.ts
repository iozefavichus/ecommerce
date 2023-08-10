import { createCustomElement } from "../../shared/utilities/helper-functions";

const createFormElement = <T extends HTMLElement>(tag: string, classNames: string[], id?: string, parent?: string | HTMLElement, type?: string):T => {

    const element = document.createElement(tag) as T;
    element.className = classNames.join(' ');
    if(id){
        element.setAttribute('id', id);
    }
    if (parent) {
        let root: HTMLElement;
      if (typeof parent === 'string' && document.querySelector(parent)) {
          root = document.querySelector(parent) as HTMLElement;
          root.append(element);
        } else if (parent instanceof HTMLElement) {
          root = parent;
          root.append(element);
        }
      }
    if(type){
        element.setAttribute('type', type);
    }

    return element;
  };

const createLabel = (classNames: string[], labelfor: string,  adjHTML?: string): HTMLElement => {
    const element = document.createElement('label');
    element.setAttribute('for', labelfor);
    element.className = classNames.join(' ');
    element.insertAdjacentHTML('beforeend', adjHTML ?? '');
    return element;
  };

 interface FromDivObject {
    container: HTMLElement,
    label: HTMLElement,
    input: HTMLInputElement,
    message: HTMLElement,
 }

const createFormDiv = (labelName: string, labeltext: string, inputId: string, inputType: string): FromDivObject => {
    const container = createCustomElement('div', ['form-control']);
    const label = createLabel(['label'], labelName, labeltext );
    container.append(label);
    const input = createFormElement<HTMLInputElement>('input', ['input'], inputId, container, inputType);
    const message = createCustomElement('div', ['small-text'],'error message');
    container.append(message);

    return {
           container,
           label,
           input,
           message
        }
}

interface RegistrationObject {
    form: HTMLFormElement,
    wrapper: HTMLElement,
    nameDiv: FromDivObject,
    surnameDiv: FromDivObject,
    birthDiv: FromDivObject,
    streetDiv: FromDivObject,
    cityDiv: FromDivObject,
    postDiv: FromDivObject,
    countryDiv: FromDivObject,
    emailDiv: FromDivObject,
    passwordDiv: FromDivObject,
    submitBtn: HTMLButtonElement
}

export const RegistrationForm = (
): RegistrationObject => {
  const wrapper = createCustomElement('div', ['reg-main']);
  const form = createFormElement<HTMLFormElement>('form', ['registration_form'], 'form', wrapper);
  const container = createCustomElement('div', ['reg-container']);

  const nameDiv = createFormDiv('name', 'Name*', 'name', 'text');
  const surnameDiv  = createFormDiv('surname','Surname*','surname','text');
  const birthDiv = createFormDiv('birth', 'Date of birth*', 'birth', 'date');
  const streetDiv  = createFormDiv('street','Street*','street','text');
  const cityDiv = createFormDiv('city', 'City*', 'city', 'text');
  const postDiv  = createFormDiv('post','Post code*','post','text');
  const countryDiv  = createFormDiv('country','Country*','country','text');
  const emailDiv = createFormDiv('email', 'Email*', 'email', 'text');
  const passwordDiv  = createFormDiv('password','Password*','password','password');
  const submitBtn = createFormElement<HTMLButtonElement>('button', ['registration__button'], 'button-submit', container, 'submit');
  submitBtn.insertAdjacentHTML('beforeend','Register');

  form.append(container);
  container.append(nameDiv.container, surnameDiv.container, birthDiv.container, streetDiv.container, cityDiv.container, postDiv.container, countryDiv.container, emailDiv.container, passwordDiv.container,  submitBtn);

  return {form, wrapper, nameDiv, surnameDiv, birthDiv, streetDiv, cityDiv, postDiv, countryDiv, emailDiv, passwordDiv, submitBtn};
};


