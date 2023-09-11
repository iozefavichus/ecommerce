import { getLocalStorage } from '../../app/local-storage/local-storage';

const KEY_CART = 'CartId';

const hasCart = (): boolean => {
  const cartId = getLocalStorage(KEY_CART);
  if (cartId) {
    return true;
  }
  return false;
};

export { KEY_CART, hasCart };
