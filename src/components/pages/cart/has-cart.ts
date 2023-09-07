import { getLocalStorage } from '../../app/localStorage/localStorage';

const KEY_CART = 'CartId';

const hasCart = (): boolean => {
  const cart = getLocalStorage(KEY_CART);
  if (cart) {
    return true;
  }
  return false;
};

export { KEY_CART, hasCart };
