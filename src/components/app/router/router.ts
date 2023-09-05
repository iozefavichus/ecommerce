import { Product } from '@commercetools/platform-sdk';
import { renderChangeContent } from '../../shared/utilities/render';

const body = document.querySelector('body');

export const customRoute = (pathName: string, product?: Product | string): void => {
  window.history.pushState({}, '', pathName);
  const newPath = window.location.pathname;
  if (product) {
    renderChangeContent(newPath, product);
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
