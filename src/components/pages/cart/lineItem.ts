import { Cart } from '@commercetools/platform-sdk';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { productImage } from './poduct-image';
import { ApiClient } from '../../shared/api/stp-client-api';
import { getLocalStorage } from '../../app/local-storage/local-storage';
import { KEY_CART } from './has-cart';
import { updateCart } from './cart';
import { customRoute } from '../../app/router/router';
import { totalpricebeforeDiscount } from './total-price-before-discount';

export const lineItem = (cart: Cart, i: number): HTMLElement => {
  const divItem = createCustomElement('div', ['cart-item']);

  const numberDiv = createCustomElement('div', ['cart-number'], `${i + 1}.`);

  const divImg = createCustomElement('div', [`cart-img${i}`]);
  const productID = cart.lineItems[i].productId;
  const lineID = cart.lineItems[i].id;
  if (productID) {
    productImage(productID, i);
  }
  const name = cart.lineItems[i].name.en;
  const divName = createCustomElement('div', ['cart-name'], `${name}`);

  let price = cart.lineItems[i].price.discounted?.value.centAmount;
  if (!price) {
    price = cart.lineItems[i].price.value.centAmount;
  }
  const divPriceForOne = createCustomElement('div', ['cart-price'], `${price / 100}USD`);

  const { quantity } = cart.lineItems[i];
  let count = quantity;
  const divQuantity = createCustomElement('div', ['cart-quantity']);
  const quantityValue = createCustomElement('input', ['quantity'], `${quantity}`) as HTMLFormElement;
  quantityValue.setAttribute('value', `${quantity}`);
  const btnMinus = createCustomElement('button', ['btn-minus'], '-') as HTMLButtonElement;

  btnMinus.addEventListener('click', async () => {
    const id = getLocalStorage(KEY_CART) as string;
    const cart = await new ApiClient().getCartById(id);
    const { version } = cart;
    const { quantity } = cart.lineItems[i];

    if (quantity === 1) {
      const { version } = await new ApiClient().getCartById(id);
      const removeItem = await new ApiClient().deletelineItemFromCart(id, version, lineID);
      customRoute('/cart');
    } else {
      const { version } = await new ApiClient().getCartById(id);
      count -= 1;
      const updateQuantity = await new ApiClient().changeQuantity(id, version, lineID, count);
      quantityValue.setAttribute('value', `${count}`);
      if (price) {
        divPriceForAll.innerHTML = `${(count * price) / 100}USD`;
      }
      const total = document.querySelector('.cart-total');
      const totalBefore = totalpricebeforeDiscount(updateQuantity);
      if (total) {
        total.textContent = `Total price: ${totalBefore / 100}USD`;
      }
      const totalNew = document.querySelector('.cartnew-total');
      const totalNewValue = updateQuantity.totalPrice.centAmount;
      if (totalNew) {
        totalNew.textContent = `Total price: ${totalNewValue / 100}USD`;
      }
    }
  });

  const priceForAll = (price / 100) * quantity;
  const divPriceForAll = createCustomElement('div', ['cart-all-price'], `${priceForAll}USD`);

  const btnPlus = createCustomElement('button', ['btn-plus'], '+') as HTMLButtonElement;
  btnPlus.addEventListener('click', async () => {
    const id = getLocalStorage(KEY_CART) as string;
    const cart = await new ApiClient().getCartById(id);
    const { version } = cart;
    const cartNew = await updateCart({
      id,
      version,
      productId: productID,
    });
    count += 1;
    quantityValue.setAttribute('value', `${count}`);
    if (price) {
      divPriceForAll.innerHTML = `${(count * price) / 100}USD`;
    }
    const total = document.querySelector('.cart-total');
    const totalBefore = totalpricebeforeDiscount(cartNew);
    if (total) {
      total.textContent = `Total price: ${totalBefore / 100}USD`;
    }
    const totalNew = document.querySelector('.cartnew-total');
    const totalNewValue = cartNew.totalPrice.centAmount;
    if (totalNew) {
      totalNew.textContent = `Total price: ${totalNewValue / 100}USD`;
    }
  });
  divQuantity.append(btnMinus, quantityValue, btnPlus);

  const divForDeleteBtn = createCustomElement('div', ['cart-delete']);
  const BtnDelete = createCustomElement('button', ['cart-btn-delete'], 'Delete') as HTMLButtonElement;

  BtnDelete.addEventListener('click', async () => {
    const id = getLocalStorage(KEY_CART) as string;
    const { version } = await new ApiClient().getCartById(id);
    const removeItem = await new ApiClient().deletelineItemFromCart(id, version, lineID);
    customRoute('/cart');
  });
  divForDeleteBtn.append(BtnDelete);

  divItem.append(numberDiv, divImg, divName, divPriceForOne, divQuantity, divPriceForAll, divForDeleteBtn);
  return divItem;
};
