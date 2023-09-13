import { Cart } from '@commercetools/platform-sdk';
import { IUpdateCart } from '../../../types/shared';
import { setLocalStorageValue } from '../../app/local-storage/local-storage';
import { ApiClient } from '../../shared/api/stp-client-api';
import { KEY_CART } from './has-cart';

const createCart = async (productId: string): Promise<Cart> => {
  const quantityItemElem = document.querySelector('.quantity-item') as HTMLElement;
  const cart = await new ApiClient().addProductToCartAnonymousCustomer(productId);
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

  quantityItemElem.classList.add('active');
  quantityItemElem.textContent = `${cart.totalLineItemQuantity}`;
  return cart;
};

export { createCart, updateCart };
