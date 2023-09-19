import { KEY_CART, hasCart } from '../../pages/cart/has-cart';
import { ApiClient } from '../../shared/api/stp-client-api';
import { activeBtn, disableBtn } from '../../shared/utilities/helper-functions';
import { getLocalStorage } from '../local-storage/local-storage';

const disableCartBtnToProductCard = async (key: string, addBtn: HTMLButtonElement, removeBtn?: HTMLButtonElement) => {
  const cartId = getLocalStorage(KEY_CART);
  if (cartId) {
    const cart = await new ApiClient().getCartById(cartId);
    const productsInCart = cart.lineItems;
    productsInCart.forEach((product) => {
      const keyProductInCart = product.productKey;
      if (key === keyProductInCart) {
        disableBtn(addBtn);
        if (removeBtn) {
          disableBtn(addBtn);
          activeBtn(removeBtn);
        }
      }
    });
  }
};

const viewQuantityItemInCart = async (): Promise<void> => {
  const itemsCountElem = document.querySelector('.quantity-item') as HTMLElement;
  const cartId = getLocalStorage(KEY_CART);
  if (cartId) {
    const cart = await new ApiClient().getCartById(cartId);
    const quantityItem = cart?.totalLineItemQuantity;
    const itemsNum = quantityItem ?? '';
    itemsCountElem.classList.add('active');
    itemsCountElem.textContent = `${itemsNum}`;
    if (!quantityItem) {
      itemsCountElem.classList.remove('active');
    }
  } else {
    itemsCountElem.classList.remove('active');
  }
};

export { disableCartBtnToProductCard, viewQuantityItemInCart };
