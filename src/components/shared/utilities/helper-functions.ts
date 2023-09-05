import { customRoute } from '../../app/router/router';
import { StpClientApi } from '../api/stpClient-api';

const createCustomElement = (tag: string, classNames?: string[], adjHTML?: string): HTMLElement => {
  const element = document.createElement(tag);
  if (classNames) {
    element.className = classNames?.join(' ');
  }
  element.insertAdjacentHTML('beforeend', adjHTML ?? '');
  return element;
};

const isProduct = async (key: string) => {
  try {
    const response = await new StpClientApi().getProductByKey(key);
    const product = await response.body;
    customRoute(key, product);
  } catch {
    customRoute(key, 'Sorry but, product is finished');
  }
};

export { createCustomElement, isProduct };
