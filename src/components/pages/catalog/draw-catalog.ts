import { createCustomElement } from '../../shared/utilities/helper-functions';

const createSearch = (): HTMLElement => {
  const container = createCustomElement('div', ['search-wrapper']);
  const headingImg = createCustomElement('div', ['heading-img']);
  const heading = createCustomElement('h2', ['heading-login'], 'Catalog');
  const input = createCustomElement('input', ['input-search']);
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('autofocus', '');
  input.setAttribute('placeholder', 'Search');
  headingImg.append(input, heading);
  container.append(headingImg);
  return container;
};

export const drawCatalog = () => {
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mainWrapper.innerHTML = '';
  const searcher = createSearch();
  mainWrapper.append(searcher);
};
