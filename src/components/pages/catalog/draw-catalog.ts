import { Product, ProductProjection } from '@commercetools/platform-sdk';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { StpClientApi } from '../../shared/api/stpClient-api';
import { openDetail } from '../detailed/open-detail';
import { searchValue, sortedValue } from './sort-catalog';

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
  const showText = createCustomElement('p', ['panel__wrapper-show__text'], `Showing 1–16 of 32 results`);
  showText.setAttribute('id', 'numberProducts');
  const sortBlock = createCustomElement('div', ['panel__wrapper-show--sort']);
  const showTextNumber = createCustomElement('p', ['panel__wrapper-show__text', 'panel__wrapper-show__text2'], 'Show');
  const showNumber = createCustomElement('div', ['panel__wrapper-show--number', 'panel__wrapper-show__text2'], '16');
  showNumber.setAttribute('id', 'numberCards');
  const showTextSort = createCustomElement(
    'p',
    ['panel__wrapper-show__text', 'panel__wrapper-show__text2'],
    'Short by',
  );
  const showSort = createCustomElement('select', ['panel__wrapper-show--default', 'panel__wrapper-show__text2']);
  const sortedValue = createCustomElement('option', [''], `Sort by ...`);
  const sortedValue1 = createCustomElement('option', ['panel__wrapper-show--sorted_value'], `by name from a to z`);
  const sortedValue2 = createCustomElement('option', ['panel__wrapper-show--sorted_value'], `by name from z to a`);
  const sortedValue3 = createCustomElement('option', ['panel__wrapper-show--sorted_value'], `by price from ascending`);
  const sortedValue4 = createCustomElement('option', ['panel__wrapper-show--sorted_value'], `by price from descending`);
  sortedValue.setAttribute('hidden', '');
  sortedValue1.setAttribute('data-value', 'sortNameASC');
  sortedValue2.setAttribute('data-value', 'sortNameDESC');
  sortedValue3.setAttribute('data-value', 'sortPriceUp');
  sortedValue4.setAttribute('data-value', 'sortPriceDown');
  showSort.append(sortedValue, sortedValue1, sortedValue2, sortedValue3, sortedValue4);
  filterBlock.append(filterRange, filterText, filterFour, filterList, separator);
  showBlock.append(showText, sortBlock);
  sortBlock.append(showTextNumber, showNumber, showTextSort, showSort);
  wrapper.append(filterBlock, showBlock);
  return wrapper;
};

const createNavigation = (): HTMLElement => {
  const navBlock = createCustomElement('div', ['navigation']);
  const btnNav1 = createCustomElement('button', ['navigation__btn', 'navigation__btn-active'], '1');
  const btnNav2 = createCustomElement('button', ['navigation__btn'], '2');
  const btnNavNext = createCustomElement('button', ['navigation__btn', 'navigation__btn-next'], 'Next');
  navBlock.append(btnNav1, btnNav2, btnNavNext);
  return navBlock;
};

const createBlockProperty = (name: string, price: string): HTMLElement => {
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
  let price: string;
  card.setAttribute('data-key', productKey as string);
  const imgBlock = createCustomElement('div', ['products__img-block']);
  const img = createCustomElement('img', ['product__img']) as HTMLImageElement;
  card.append(imgBlock);
  if (productImg && productImg?.length > 0) {
    const srcImageProduct = productImg[0].url;
    img.style.backgroundImage = `url(${srcImageProduct})`;
  }
  if (productPrice) {
    const priceInCent = productPrice[0].value.centAmount;
    price = (priceInCent / 100).toFixed(2);
    const blockProperty = createBlockProperty(productName, price);
    card.append(blockProperty);
  }
  card.addEventListener('click', (event) => {
    const targetElem = event?.currentTarget as HTMLElement;
    const { key } = targetElem.dataset;
    if (key) {
      openDetail(key);
    }
  });
  imgBlock.append(img);
  el.append(card);
};

export const drawSortCard = (product: ProductProjection, el: HTMLElement): void => {
  const cardSort = createCustomElement('div', ['product__card']);
  const productKey = product.key;
  const productImg = product.masterVariant.images;
  const productName = product.name.en;
  const productPrice = product.masterVariant.prices;
  let price: string;
  cardSort.setAttribute('data-key', productKey as string);
  const imgBlock = createCustomElement('div', ['products__img-block']);
  const img = createCustomElement('img', ['product__img']) as HTMLImageElement;
  cardSort.append(imgBlock);
  if (productImg && productImg?.length > 0) {
    const srcImageProduct = productImg[0].url;
    img.style.backgroundImage = `url(${srcImageProduct})`;
  }
  if (productPrice) {
    const priceInCent = productPrice[0].value.centAmount;
    price = (priceInCent / 100).toFixed(2);
    const blockProperty = createBlockProperty(productName, price);
    cardSort.append(blockProperty);
  }
  cardSort.addEventListener('click', (event) => {
    const targetElem = event?.currentTarget as HTMLElement;
    const { key } = targetElem.dataset;
    if (key) {
      openDetail(key);
    }
  });
  imgBlock.append(img);
  el.append(cardSort);
};

export const drawCatalog = async () => {
  const productWrapper = createCustomElement('div', ['product__wrapper']);
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mainWrapper.innerHTML = '';
  const searcher = createSearch();
  const panel = createPanel();
  const navigation = createNavigation();
  mainWrapper.append(searcher, panel, productWrapper, navigation);
  const sortField = document.querySelector('.panel__wrapper-show--default') as HTMLSelectElement;
  const searchField = document.querySelector('.input-search') as HTMLInputElement;
  const btnPagination = document.querySelector('.navigation__btn-active') as HTMLButtonElement;
  if (btnPagination?.textContent === '1') {
    btnPagination.setAttribute('disabled', '');
  }
  const products = await new StpClientApi().getProducts();
  const numberCards = document.querySelector('#numberCards');
  const numberProducts = document.querySelector('#numberProducts');
  const size = Object.keys(products).length;
  if (numberCards !== undefined && numberCards !== null) {
    numberCards.textContent = String(size);
  }
  if (numberProducts !== undefined && numberProducts !== null) {
    numberProducts.textContent = `Showing 1–${String(size)} of ${String(size)} results`;
  }
  sortField?.addEventListener('change', async (event) => {
    const sortProducts = await sortedValue(event);
    productWrapper.innerHTML = '';
    sortProducts?.forEach((product) => {
      drawSortCard(product, productWrapper);
    });
  });
  searchField?.addEventListener('input', async (event) => {
    const searchProducts = await searchValue(event);
    productWrapper.innerHTML = '';
    searchProducts.forEach((product) => {
      drawSortCard(product, productWrapper);
    });
  });
  products.forEach((product) => {
    drawCard(product, productWrapper);
  });
};
