import { Product, ProductProjection } from '@commercetools/platform-sdk';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { StpClientApi } from '../../shared/api/stpClient-api';
import { openDetail } from '../detailed/open-detail';
import {
  filterByColor,
  filterPriceProducts,
  filterProducts,
  filterValue,
  searchValue,
  sortedValue,
} from './sort-catalog';

const createSearch = (): HTMLElement => {
  const container = createCustomElement('div', ['search-wrapper']);
  const headingImg = createCustomElement('div', ['heading-img']);
  const heading = createCustomElement('h2', ['heading-login'], 'Catalog');
  const input = createCustomElement('input', ['input-search']);
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('autofocus', '');
  input.setAttribute('placeholder', 'Search');
  headingImg.append(heading, input);
  container.append(headingImg);
  return container;
};

const createPanel = (): HTMLElement => {
  const wrapper = createCustomElement('div', ['panel__wrapper']);
  const showBlock = createCustomElement('div', ['panel__wrapper-show']);
  const showText = createCustomElement('p', ['panel__wrapper-show__text'], `Showing 1–16 of 32 results`);
  showText.setAttribute('id', 'numberProducts');
  const sortBlock = createCustomElement('div', ['panel__wrapper-show--sort']);
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
  showBlock.append(showText, sortBlock);
  sortBlock.append(showTextSort, showSort);
  wrapper.append(showBlock);
  return wrapper;
};

const createCategory = (): HTMLElement => {
  const wrapperCategory = createCustomElement('div', ['wrapper__category']);
  const categoryTitle = createCustomElement('h1', ['wrapper__category-title'], 'Category');
  const select = createCustomElement('select', ['wrapper__category-select']);
  wrapperCategory.append(categoryTitle, select);
  return wrapperCategory;
};

const createFilter = (): HTMLElement => {
  const wrapper = createCustomElement('div', ['filter__wrapper']);
  const filterItem = createCustomElement('div', ['filter_item_wrapper']);
  const filterName = createCustomElement('div', ['filter_name']);
  const filterPrice = createCustomElement('div', ['filter_price']);
  const filterColor = createCustomElement('div', ['filter_color']);
  const resetBtn = createCustomElement('div', ['reset', 'button'], 'Reset');
  const filterTitlesName = createCustomElement('div', ['filter_titles_name'], 'Name');
  const filterTitlesPrice = createCustomElement('div', ['filter_titles_price'], 'Price');
  const selectName = createCustomElement('select', ['filter_select_name']);
  const rangeSlider = createCustomElement('div', ['range-slider']);
  const inputPrice1 = createCustomElement('input', ['min-price']) as HTMLInputElement;
  const inputPrice2 = createCustomElement('input', ['max-price']) as HTMLInputElement;
  const multicolored = createCustomElement('input', ['multicolored']) as HTMLInputElement;
  multicolored.setAttribute('data-color', 'multicolored');
  const white = createCustomElement('input', ['white']) as HTMLInputElement;
  white.setAttribute('data-color', 'white');
  const green = createCustomElement('input', ['green']) as HTMLInputElement;
  green.setAttribute('data-color', 'green');
  const grey = createCustomElement('input', ['grey']) as HTMLInputElement;
  grey.setAttribute('data-color', 'grey');
  const red = createCustomElement('input', ['red']) as HTMLInputElement;
  red.setAttribute('data-color', 'red');
  filterColor.append(multicolored, red, green, white, grey);
  filterColor.addEventListener('click', (event) => {
    const targetElem = event.target as HTMLElement;
    const { color } = targetElem.dataset;
    if (color) {
      filterByColor(color);
    }
  });
  inputPrice1.addEventListener('blur', async () => {
    const minPrice = inputPrice1.value;
    const maxPrice = +inputPrice2.value > 0 ? inputPrice2.value : inputPrice2.getAttribute('placeholder');
    filterPriceProducts(minPrice, maxPrice!);
  });
  inputPrice2.addEventListener('blur', async () => {
    const minPrice =
      +inputPrice1.value > +inputPrice1.getAttribute('placeholder')!
        ? inputPrice1.value
        : inputPrice1.getAttribute('placeholder');
    const maxPrice = inputPrice2.value;
    filterPriceProducts(minPrice!, maxPrice!);
  });
  inputPrice1.setAttribute('type', 'text');
  inputPrice2.setAttribute('type', 'text');
  inputPrice1.setAttribute('placeholder', '350');
  inputPrice2.setAttribute('placeholder', '3250');
  filterName.append(filterTitlesName, selectName);
  rangeSlider.append(inputPrice1, inputPrice2);
  filterPrice.append(filterTitlesPrice, rangeSlider);
  filterItem.append(filterName, filterPrice, filterColor, resetBtn);
  wrapper.append(filterItem);
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

const createPriceDiscountBlock = (price: string): HTMLElement => {
  const discountBlock = createCustomElement('div', ['discount__info']);
  const discountPrice = createCustomElement('p', ['discount__price'], `USD ${price}`);

  discountBlock.append(discountPrice);
  return discountBlock;
};

export const drawCard = (product: Product, el: HTMLElement): void => {
  const card = createCustomElement('div', ['product__card']);
  const productKey = product.key;
  const productImg = product.masterData.current.masterVariant?.images;
  const productName = product.masterData.current.name.en;
  const productPrice = product.masterData.current.masterVariant?.prices;
  const discountedPrice = product.masterData.current.masterVariant?.prices;
  let price: string;
  let priceDiscount: string;
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
  if (discountedPrice) {
    const discountedInCent: number = <number>(
      (discountedPrice[0].discounted ? discountedPrice[0].discounted.value.centAmount : undefined)
    );
    priceDiscount = (discountedInCent / 100).toFixed(2);
    const blockProperty = createPriceDiscountBlock(priceDiscount);
    const priceEl = document.querySelectorAll('.product__price');
    Array.from(priceEl).forEach((price) => price.classList.add('through'));
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
  const discountedPrice = product.masterVariant.prices;
  let price: string;
  let priceDiscount: string;
  cardSort.setAttribute('data-key', productKey as string);
  const imgBlock = createCustomElement('div', ['products__img-block']);
  const img = createCustomElement('img', ['product__img']) as HTMLImageElement;
  cardSort.append(imgBlock);
  if (productImg && productImg?.length > 0) {
    const srcImageProduct = productImg[0].url;
    img.style.backgroundImage = `url(${srcImageProduct})`;
    img.style.width = '285px';
  }
  if (productPrice) {
    const priceInCent = productPrice[0].value.centAmount;
    price = (priceInCent / 100).toFixed(2);
    const blockProperty = createBlockProperty(productName, price);
    cardSort.append(blockProperty);
  }
  if (discountedPrice) {
    const discountCents = discountedPrice[0].discounted?.value.centAmount as number;
    priceDiscount = (discountCents / 100).toFixed(2);
    const blockProperty = createPriceDiscountBlock(priceDiscount);
    const priceEl = document.querySelectorAll('.product__price');
    Array.from(priceEl).forEach((price) => price.classList.add('through'));
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
  const filter = createFilter();
  const category = createCategory();
  mainWrapper.append(searcher, panel, category, filter, productWrapper, navigation);
  const sortField = document.querySelector('.panel__wrapper-show--default') as HTMLSelectElement;
  const searchField = document.querySelector('.input-search') as HTMLInputElement;
  const btnPagination = document.querySelector('.navigation__btn-active') as HTMLButtonElement;
  const categoryList = document.querySelector('.wrapper__category-select') as HTMLSelectElement;
  const filterName = document.querySelector('.filter_select_name') as HTMLSelectElement;
  const resetBtn = document.querySelector('.reset');

  if (btnPagination?.textContent === '1') {
    btnPagination.setAttribute('disabled', '');
  }
  const products = new StpClientApi().getProducts(12);
  resetBtn?.addEventListener('click', () => {
    drawCatalog();
  });
  const categories = await new StpClientApi().getCategory();
  for (let i = 0; i < categories.length; i++) {
    const categoryItem = createCustomElement('option', ['wrapper__category-element']) as HTMLOptionElement;
    categoryItem.setAttribute('data-id', `${categories[i].id}`);
    categoryItem.innerHTML = categories[i].name.en;
    categoryList.append(categoryItem);
  }
  categoryList?.addEventListener('change', async (event) => {
    const filterProducts = await filterValue(event);
    productWrapper.innerHTML = '';
    filterProducts?.forEach((product) => {
      drawSortCard(product, productWrapper);
    });
  });
  products.then((products) => {
    products.forEach((product) => {
      const optionName = createCustomElement('option', ['filter_options_name']) as HTMLOptionElement;
      optionName.setAttribute('data-key', `${product.key}`);
      optionName.innerHTML = product.masterData.current.name.en;
      filterName.append(optionName);
    });
  });
  filterName?.addEventListener('change', async (event) => {
    const filterNameProducts = await filterProducts(event);
    productWrapper.innerHTML = '';
    filterNameProducts?.forEach((product) => {
      drawSortCard(product, productWrapper);
    });
  });
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
  products.then((products) => {
    products.forEach((product) => {
      drawCard(product, productWrapper);
    });
  });
};
