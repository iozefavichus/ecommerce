import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createPageTitle } from '../../shared/utilities/title';

export const drawSuccessUpdate = () => {
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mainWrapper.innerHTML = '';
  const wrapper = createCustomElement('div', ['wrapper']);
  mainWrapper?.append(wrapper);
  const pageTitle = createPageTitle('Change information');
  wrapper.append(pageTitle);
  const successDiv = createCustomElement('div', ['success__text'], 'Congratulations! Your changes are saved!');
  const subtitle = createCustomElement('div', ['success_subtitle'], 'You will redirect automatically in 3 seconds');
  wrapper.append(successDiv);
  wrapper.append(subtitle);
};
