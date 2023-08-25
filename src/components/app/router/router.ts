import { Product } from '@commercetools/platform-sdk';
import { renderChangeContent } from '../../shared/utilities/render';
import { getLocalStorage } from '../localStorage/localStorage';
import { PRODUCT_BODY } from '../../pages/detailed/open-detail';

const body = document.querySelector('body');

export const customRoute = (pathName: string, product?: Product | string): void => {
  window.history.pushState({}, '', pathName);
  const newPath = window.location.pathname;
  const productInLocalStorage = getLocalStorage(PRODUCT_BODY);
  if (product) {
    renderChangeContent(newPath, product);
  } else if (productInLocalStorage) {
    renderChangeContent(newPath, JSON.parse(productInLocalStorage));
  } else {
    renderChangeContent(newPath);
  }
};

export const routing = (): void => {
  body?.addEventListener('click', (event): void => {
    const elem = event.target as HTMLElement;

    if (elem.tagName === 'A') {
      event.preventDefault();
      const path = elem.getAttribute('href') as string;
      customRoute(path);
    }
  });
};
