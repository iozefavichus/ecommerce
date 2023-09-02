import { createCustomElement } from '../../shared/utilities/helper-functions';

export const createFormElement = <T extends HTMLElement>(
  tag: string,
  classNames: string[],
  id?: string,
  parent?: string | HTMLElement,
  type?: string,
): T => {
  const element = document.createElement(tag) as T;
  element.className = classNames.join(' ');
  if (id) {
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
  if (type) {
    element.setAttribute('type', type);
  }

  return element;
};

export const createLabel = (classNames: string[], labelfor: string, adjHTML?: string): HTMLElement => {
  const element = document.createElement('label');
  element.setAttribute('for', labelfor);
  element.className = classNames.join(' ');
  element.insertAdjacentHTML('beforeend', adjHTML ?? '');
  return element;
};

export interface FromDivObject {
  container: HTMLElement;
  label: HTMLElement;
  input: HTMLInputElement;
  message: HTMLElement;
}

export const createFormDiv = (
  labelName: string,
  labeltext: string,
  inputType: string,
  inputId?: string,
): FromDivObject => {
  const container = createCustomElement('div', ['form-control']);
  const label = createLabel(['label'], labelName, labeltext);
  container.append(label);
  const input = createFormElement<HTMLInputElement>('input', ['input'], inputId, container, inputType);
  const message = createCustomElement('div', ['small-text'], 'error message');
  container.append(message);

  return {
    container,
    label,
    input,
    message,
  };
};

export const createFormWithOptions = (labelName: string, labeltext: string): HTMLElement => {
  const container = createCustomElement('div', ['form-control']);

  const label = createLabel(['label'], labelName, labeltext);

  const select = createCustomElement('select', ['select-country']);
  select.setAttribute('name', labelName);
  select.id = labelName;

  const option = createCustomElement('option', ['country'], 'USA');
  option.setAttribute('value', 'USA');
  select.append(option);

  const message = createCustomElement('div', ['small-text'], 'error message');

  container.append(label, select, message);

  return container;
};
