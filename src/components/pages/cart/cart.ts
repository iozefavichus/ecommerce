import { Cart } from '@commercetools/platform-sdk';
import { IUpdateCart } from '../../../types/shared';
import { removeLocalStorageValue, setLocalStorageValue } from '../../app/local-storage/local-storage';
import { ApiClient } from '../../shared/api/stp-client-api';
import { KEY_CART } from './has-cart';

const createCart = async (productId: string): Promise<Cart> => {
  const quantityItemElem = document.querySelector('.quantity-item') as HTMLElement;
  const cart = await new ApiClient().addCart(productId);
  const { id } = cart;
  setLocalStorageValue(KEY_CART, id);
  quantityItemElem.classList.add('active');
  quantityItemElem.textContent = `${cart.totalLineItemQuantity}`;
  return cart;
};

const updateCart = async (options: IUpdateCart) => {
  const quantityItemElem = document.querySelector('.quantity-item') as HTMLElement;
  const { id, version, productId } = options;
  const cart = await new ApiClient().updateCart({
    id,
    version,
    productId,
  });
  const countProduct = cart.totalLineItemQuantity;
  quantityItemElem.classList.add('active');
  quantityItemElem.textContent = `${countProduct}`;
  return cart;
};

const removeItem = async (options: IUpdateCart) => {
  const quantityItemElem = document.querySelector('.quantity-item') as HTMLElement;
  const { id, version, productId } = options;
  const newCart = await new ApiClient().deleteItemFromCart({
    id,
    version,
    productId,
  });
  const countProduct = newCart.totalLineItemQuantity;
  if (!countProduct) {
    const { id, version } = newCart;
    await new ApiClient().deleteCart(id, version);
    removeLocalStorageValue('CartId');
    quantityItemElem.classList.remove('active');
    quantityItemElem.textContent = '';
  } else {
    quantityItemElem.textContent = `${countProduct}`;
  }
};

export { createCart, updateCart, removeItem };
