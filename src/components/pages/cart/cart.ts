import { IUpdateCart } from '../../../types/shared';
import { setLocalStorageValue } from '../../app/localStorage/localStorage';
import { ApiClient } from '../../shared/api/stp-client-api';
import { KEY_CART } from './has-cart';

const createCart = async () => {
  const cart = await new ApiClient().addProductToCartAnonymousCustomer();
  const { id } = cart;
  setLocalStorageValue(KEY_CART, id);
  return cart;
};

const updateCart = async (options: IUpdateCart) => {
  const quantityItemElem = document.querySelector('.quantity-item') as HTMLElement;
  const { id, version, centAmount, productId } = options;
  const cart = await new ApiClient().updateCart({
    id,
    version,
    centAmount,
    productId,
  });
  // console.log(cart);
  quantityItemElem.classList.add('active');
  quantityItemElem.textContent = `${cart.lineItems.length}`;
};

export { createCart, updateCart };
