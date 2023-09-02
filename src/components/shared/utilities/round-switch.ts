import { createCustomElement } from "./helper-functions";

export const createRoundSwitch = (classNameContainer: string, text: string, classNameInput: string): HTMLElement=>{
    const container = createCustomElement('div',[classNameContainer]);

    const textMes = createCustomElement('div',[], text);
    const divForswitch = createCustomElement('div',[]);

    const label = createCustomElement('label',['switch']);
    const input = createCustomElement('input',[classNameInput]);
    input.setAttribute('type', 'checkbox');
    input.id = classNameInput;
    const span = createCustomElement('span',['slider-round']);

    label.append(input,span);
    divForswitch.append(label);

    container.append(textMes, divForswitch);

    return container;
  }