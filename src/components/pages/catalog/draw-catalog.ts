import { Product } from '@commercetools/platform-sdk';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { StpClientApi } from '../../shared/api/stpClient-api';

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

const createPanel = (): HTMLElement => {
  const wrapper = createCustomElement('div', ['panel__wrapper']);
  const filterBlock = createCustomElement('div', ['panel__wrapper-filter']);
  const filterRange = createCustomElement('img', ['panel__wrapper-img', 'panel__wrapper-range']);
  const filterFour = createCustomElement('img', ['panel__wrapper-img', 'panel__wrapper-four']);
  const filterText = createCustomElement('p', ['panel__wrapper-text'], 'Filter');
  const filterList = createCustomElement('img', ['panel__wrapper-img', 'panel__wrapper-list']);
  const separator = createCustomElement('span', ['panel__wrapper-separator']);
  const showBlock = createCustomElement('div', ['panel__wrapper-show']);
  const showText = createCustomElement('p', ['panel__wrapper-show__text'], 'Showing 1–16 of 32 results');
  const sortBlock = createCustomElement('div', ['panel__wrapper-show--sort']);
  const showTextNumber = createCustomElement('p', ['panel__wrapper-show__text', 'panel__wrapper-show__text2'], 'Show');
  const showNumber = createCustomElement('div', ['panel__wrapper-show--number', 'panel__wrapper-show__text2'], '16');
  const showTextSort = createCustomElement(
    'p',
    ['panel__wrapper-show__text', 'panel__wrapper-show__text2'],
    'Short by',
  );
  const showSort = createCustomElement(
    'div',
    ['panel__wrapper-show--default', 'panel__wrapper-show__text2'],
    'Default',
  );
  filterBlock.append(filterRange, filterText, filterFour, filterList, separator);
  showBlock.append(showText, sortBlock);
  sortBlock.append(showTextNumber, showNumber, showTextSort, showSort);
  wrapper.append(filterBlock, showBlock);
  return wrapper;
};

const createBlockProperty = (name: string, price: number): HTMLElement => {
  const propertyBlock = createCustomElement('div', ['product__info']);
  const productName = createCustomElement('h2', ['product__name'], `${name}`);
  const productPrice = createCustomElement('p', ['product__price'], `USD ${price}`);

  propertyBlock.append(productName, productPrice);
  return propertyBlock;
};

export const drawCard = (product: Product, el: HTMLElement): void => {
  const card = createCustomElement('div', ['product__card']);
  const productKey = product.key;
  const productImg = product.masterData.current.masterVariant?.images;
  const productName = product.masterData.current.name.en;
  const productPrice = product.masterData.current.masterVariant?.prices;
  let price: number;
  card.setAttribute('data-key', productKey as string);
  const imgBlock = createCustomElement('div', ['products__img-block']);
  const img = createCustomElement('img', ['product__img']) as HTMLImageElement;
  card.append(imgBlock);
  if (productImg && productImg?.length > 0) {
    const srcImageProduct = productImg[0].url;
    img.style.backgroundImage = `url(${srcImageProduct})`;
  }
  if (productPrice) {
    price = productPrice[0].value.centAmount / 100;
    const blockProperty = createBlockProperty(productName, price);
    card.append(blockProperty);
  }
  imgBlock.append(img);
  el.append(card);
};

export const drawCatalog = async () => {
  const productWrapper = createCustomElement('div', ['product__wrapper']);
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mainWrapper.innerHTML = '';
  const searcher = createSearch();
  const panel = createPanel();
  mainWrapper.append(searcher, panel, productWrapper);
  const products = await new StpClientApi().getProducts();
  products.forEach((product) => {
    drawCard(product, productWrapper);
  });
};
