import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createPageTitle } from '../../shared/utilities/title';

export const drawSuccessPassword = () => {
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mainWrapper.innerHTML = '';
  const wrapper = createCustomElement('div', ['wrapper']);
  mainWrapper?.append(wrapper);
  const pageTitle = createPageTitle('Change password');
  wrapper.append(pageTitle);
  const successDiv = createCustomElement('div', ['success__text'], 'Congratulations! Your password was changed!');
  const subtitle = createCustomElement('div', ['success_subtitle'], 'You will redirect automatically in 3 seconds');
  wrapper.append(successDiv);
  wrapper.append(subtitle);
};
