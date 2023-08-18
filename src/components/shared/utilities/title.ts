import { createCustomElement } from './helper-functions';

export const createPageTitle = (title: string): HTMLElement => {
  const bgMain = createCustomElement('div', ['reg-img']);
  const registrationBlock = createCustomElement('div', ['page__block']);
  const registrationTitle = createCustomElement('p', ['page__title'], title);
  const registrationSubtitle = createCustomElement('p', ['page__subtitle'], `Home > ${title}`);

  registrationBlock.append(registrationTitle, registrationSubtitle);
  bgMain.append(registrationBlock);
  return bgMain;
};
