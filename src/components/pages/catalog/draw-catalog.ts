import { Product, ProductProjection } from '@commercetools/platform-sdk';
import { createCustomElement, disableBtn } from '../../shared/utilities/helper-functions';
import { openDetail } from '../detail/open-detail';
import {
  filterByColor,
  filterPriceProducts,
  filterProducts,
  filterValue,
  searchValue,
  sortedValue,
} from './sort-catalog';
import { KEY_CART, hasCart } from '../cart/has-cart';
import { getLocalStorage, setLocalStorageValue } from '../../app/local-storage/local-storage';
import { createCart, updateCart } from '../cart/cart';
import { ApiClient } from '../../shared/api/stp-client-api';
import { disableCartBtnToProductCard } from '../../app/product-in-cart/has-product-in-cart';
import { animationProductInCart } from '../../app/animation-product/animation-product';

const createSearch = (): HTMLElement => {
  const container = createCustomElement('div', ['search-wrapper']);
  const headingImg = createCustomElement('div', ['heading-img']);
  const heading = createCustomElement('h2', ['heading-login'], 'Catalog');
  headingImg.append(heading);
  container.append(headingImg);
  return container;
};

const createCategory = (): HTMLElement => {
  const wrapperCategory = createCustomElement('div', ['wrapper__category']);
  const categoryTitle = createCustomElement('h1', ['wrapper__category-title'], 'Category');
  const select = createCustomElement('select', ['wrapper__category-select']);

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
  sortBlock.append(showTextSort, showSort);

  const input = createCustomElement('input', ['input-search']);
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('autofocus', '');
  input.setAttribute('placeholder', 'Search');

  wrapperCategory.append(categoryTitle, select, sortBlock, input);
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
  const btnNavPrev = createCustomElement('button', ['navigation__btn', 'navigation__btn-prev'], 'Prev');
  const btnNav1 = createCustomElement('button', ['navigation__btn', 'navigation__btn-active'], '1');
  const btnNavNext = createCustomElement('button', ['navigation__btn', 'navigation__btn-next'], 'Next');
  btnNavPrev.setAttribute('data-value', 'prev');
  btnNavNext.setAttribute('data-value', 'next');
  btnNavPrev.setAttribute('disabled', '');
  navBlock.append(btnNavPrev, btnNav1, btnNavNext);
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
  const cartBtn = createCustomElement('button', ['cart-btn']) as HTMLButtonElement;
  cartBtn.title = 'add to cart';
  const productKey = product.key;

  disableCartBtnToProductCard(productKey as string, cartBtn);
  const productImg = product.masterData.current.masterVariant?.images;
  const productName = product.masterData.current.name.en;
  const productPrice = product.masterData.current.masterVariant?.prices;
  const discountedPrice = product.masterData.current.masterVariant?.prices;
  cartBtn.addEventListener('click', async (event) => {
    const btnElem = event.target as HTMLElement;
    if (!btnElem.classList.contains('disable')) {
      animationProductInCart(event);
      if (hasCart()) {
        const id = getLocalStorage(KEY_CART) as string;
        const { version } = await new ApiClient().getCartById(id);
        updateCart({
          id,
          version,
          productId: product.id,
        });
        disableBtn(btnElem as HTMLButtonElement);
      } else {
        await createCart(product.id);
        disableBtn(btnElem as HTMLButtonElement);
      }
    }
  });
  let price: string;
  let priceDiscount: string;
  card.setAttribute('data-key', productKey as string);
  const imgBlock = createCustomElement('div', ['products__img-block']);
  imgBlock.addEventListener('click', (event) => {
    const targetElem = event?.currentTarget as HTMLElement;
    const parentElem = targetElem.parentElement;
    const { key } = parentElem!.dataset;
    if (key) {
      openDetail(key);
    }
  });
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
    card.append(blockProperty, cartBtn);
  }
  if (discountedPrice) {
    const discountedInCent: number = <number>(
      (discountedPrice[0].discounted ? discountedPrice[0].discounted.value.centAmount : undefined)
    );
    priceDiscount = (discountedInCent / 100).toFixed(2);
    const blockProperty = createPriceDiscountBlock(priceDiscount);
    const priceEl = document.querySelectorAll('.product__price');
    Array.from(priceEl).forEach((price) => price.classList.add('through'));
    card.append(blockProperty, cartBtn);
  }
  imgBlock.append(img);
  el.append(card);
};

export const drawSortCard = (product: ProductProjection, el: HTMLElement): void => {
  const cardSort = createCustomElement('div', ['product__card']);
  const cartBtn = createCustomElement('div', ['cart-btn']);
  cartBtn.title = 'add to cart';
  cartBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const btn = event.currentTarget as HTMLButtonElement;
    disableBtn(btn);
  });
  const productKey = product.key;
  const productImg = product.masterVariant.images;
  const productName = product.name.en;
  const productPrice = product.masterVariant.prices;
  const discountedPrice = product.masterVariant.prices;
  let price: string;
  let priceDiscount: string;
  cardSort.setAttribute('data-key', productKey as string);
  const imgBlock = createCustomElement('div', ['products__img-block']);
  imgBlock.addEventListener('click', (event) => {
    const targetElem = event?.currentTarget as HTMLElement;
    const parentElem = targetElem.parentElement;
    const { key } = parentElem!.dataset;
    if (key) {
      openDetail(key);
    }
  });
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
    cardSort.append(blockProperty, cartBtn);
  }
  if (discountedPrice) {
    const discountCents = discountedPrice[0].discounted?.value.centAmount as number;
    priceDiscount = (discountCents / 100).toFixed(2);
    const blockProperty = createPriceDiscountBlock(priceDiscount);
    const priceEl = document.querySelectorAll('.product__price');
    Array.from(priceEl).forEach((price) => price.classList.add('through'));
    cardSort.append(blockProperty, cartBtn);
  }
  imgBlock.append(img);
  el.append(cardSort);
};

export const drawCatalog = async () => {
  const productWrapper = createCustomElement('div', ['product__wrapper']);
  const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mainWrapper.innerHTML = '';
  const searcher = createSearch();
  const navigation = createNavigation();
  const filter = createFilter();
  const category = createCategory();
  mainWrapper.append(searcher, category, filter, productWrapper, navigation);
  const sortField = document.querySelector('.panel__wrapper-show--default') as HTMLSelectElement;
  const searchField = document.querySelector('.input-search') as HTMLInputElement;
  const btnPaginationPrev = document.querySelector('.navigation__btn-prev') as HTMLButtonElement;
  const btnPaginationNext = document.querySelector('.navigation__btn-next') as HTMLButtonElement;
  const categoryList = document.querySelector('.wrapper__category-select') as HTMLSelectElement;
  const filterName = document.querySelector('.filter_select_name') as HTMLSelectElement;
  const resetBtn = document.querySelector('.reset');

  let currentPage = 1;

  btnPaginationNext?.addEventListener('click', () => {
    currentPage++;
    fetchAndDisplayProducts(currentPage);
  });
  btnPaginationPrev?.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchAndDisplayProducts(currentPage);
    }
  });

  const products = new ApiClient().getProducts(12);
  resetBtn?.addEventListener('click', () => {
    drawCatalog();
  });
  const categories = await new ApiClient().getCategory();
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

const handlePopState = (event: PopStateEvent) => {
  const { state } = event;

  if (state && state.page) {
    const { page } = state;
    const url = `/catalog?page=${page}`;

    // fetchAndDisplayProducts(page);
    window.history.pushState(state, '', url);
  }
};

window.addEventListener('popstate', handlePopState);

const getPageHistory = () => {
  const historyStr = getLocalStorage('pageHistory');
  return historyStr ? JSON.parse(historyStr) : [];
};

const addToPageHistory = (pageNumber: number) => {
  const history = getPageHistory();
  history.push(pageNumber);
  setLocalStorageValue('pageHistory', JSON.stringify(history));
};

document.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayProducts(1);
});

const fetchAndDisplayProducts = async (pageNumber: number) => {
  try {
    const productWrapper = document.querySelector('.product__wrapper') as HTMLElement;

    if (productWrapper) {
      const btnPagination = document.querySelector('.navigation__btn-active') as HTMLButtonElement;
      const btnPaginationPrev = document.querySelector('.navigation__btn-prev') as HTMLButtonElement;
      const btnPaginationNext = document.querySelector('.navigation__btn-next') as HTMLButtonElement;

      if (btnPagination) {
        btnPagination.textContent = pageNumber.toString();
      }

      const state = { page: pageNumber };
      const title = `Page ${pageNumber}`;
      const url = `/catalog?page=${pageNumber}`;
      window.history.pushState(state, title, url);

      addToPageHistory(pageNumber);

      const products = await new ApiClient().getProductsFromCatalog(12, 12 * (pageNumber - 1));

      productWrapper.innerHTML = '';

      if (btnPaginationPrev) {
        if (pageNumber <= 1) {
          btnPaginationPrev.setAttribute('disabled', '');
        } else {
          btnPaginationPrev.removeAttribute('disabled');
        }
      }

      if (btnPaginationNext) {
        if (pageNumber >= 3) {
          btnPaginationNext.setAttribute('disabled', '');
        } else {
          btnPaginationNext.removeAttribute('disabled');
        }
      }

      products.forEach((product) => {
        drawSortCard(product, productWrapper);
      });
    } else {
      // eslint-disable-next-line no-console
      console.error('.product__wrapper element not found in the document.');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('An error occurred while receiving products:', error);
  }
};
