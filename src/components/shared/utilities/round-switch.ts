import { createCustomElement } from './helper-functions';

export const createRoundSwitch = (classNameContainer: string, text: string, classNameInput: string): HTMLElement => {
  const container = createCustomElement('div', [classNameContainer]);

  const textMes = createCustomElement('div', [], text);
  const divForswitch = createCustomElement('div', []);

  const label = createCustomElement('label', ['switch']);
  const input = createCustomElement('input', [classNameInput]);
  input.setAttribute('type', 'checkbox');
  input.setAttribute('disabled', 'true');
  input.id = classNameInput;
  const span = createCustomElement('span', ['slider-round']);

  label.append(input, span);
  divForswitch.append(label);

  input.addEventListener('click', () => {
    if (!input.hasAttribute('checked')) {
      input.setAttribute('checked', 'checked');
    } else {
      input.removeAttribute('checked');
    }
  });

  container.append(textMes, divForswitch);

  return container;
};
