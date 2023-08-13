import { createCustomElement } from '../../shared/utilities/helper-functions';

const create404 = (): HTMLElement => {
  const error = createCustomElement('p', ['error'], 'E');
  const span1 = createCustomElement('span', [''], 'r');
  const span2 = createCustomElement('span', [''], 'ror');
  const code = createCustomElement('p', ['code'], '4');
  const span3 = createCustomElement('span', [''], '0');
  const span4 = createCustomElement('span', [''], '4');
  error.append(span1, span2);
  code.append(span3, span4);
  return error;
};

export const drawNotFound = () => {
  const div = createCustomElement('div', ['']);
  const notFound = create404();
  div.append(notFound);
};
