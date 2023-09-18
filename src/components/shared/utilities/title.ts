import { createCustomElement } from './helper-functions';

export const createPageTitle = (title: string): HTMLElement => {
  const bgMain = createCustomElement('div', ['reg-img']);
  const registrationBlock = createCustomElement('div', ['page__block']);
  const registrationTitle = createCustomElement('p', ['page__title'], title);

  registrationBlock.append(registrationTitle);
  bgMain.append(registrationBlock);
  return bgMain;
};
