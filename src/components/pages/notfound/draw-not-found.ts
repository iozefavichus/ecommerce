import { createCustomElement } from '../../shared/utilities/helper-functions';

const create404 = (): HTMLElement => {
  const wrapImage = createCustomElement('div', ['wrapImage']);
  const div = createCustomElement('div', ['not__found']);
  const error = createCustomElement('p', ['error'], 'E');
  const span1 = createCustomElement('span', [''], 'r');
  const span2 = createCustomElement('span', [''], 'ror');
  const code = createCustomElement('p', ['code'], '4');
  const span3 = createCustomElement('span', [''], '0');
  const span4 = createCustomElement('span', [''], '4');
  const button = createCustomElement('a', ['main-btn'], 'Main Page') as HTMLLinkElement;
  button.href = '/';
  error.append(span1, span2);
  code.append(span3, span4);
  div.append(error, code, button);
  wrapImage.append(div);
  return wrapImage;
};

export const drawNotFound = () => {
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mainWrapper.innerHTML = '';
  const notFound = create404();
  mainWrapper.append(notFound);
};
