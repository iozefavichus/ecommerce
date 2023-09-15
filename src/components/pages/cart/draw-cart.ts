import { createPageTitle } from '../../shared/utilities/title';
import { getLocalStorage, removeLocalStorageValue } from '../../app/local-storage/local-storage';
import { KEY_CART, hasCart } from './has-cart';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { ApiClient } from '../../shared/api/stp-client-api';
import { lineItem } from './lineItem';
import { totalpricebeforeDiscount } from './total-price-before-discount';
import { EmptyCart } from './empty-cart';

const DrawCart = async () => {
  const mailWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  const wrapper = createCustomElement('div', ['cart-wrapper']);
  mailWrapper.append(wrapper);

  if (hasCart()) {
    const id = getLocalStorage(KEY_CART) as string;
    const cart = await new ApiClient().getCartById(id);
    const total = cart.totalPrice.centAmount/100;

    if (cart.lineItems.length === 0) {
      EmptyCart();
    } else {
      const divCart = createCustomElement('div', ['container-cart']);

      for (let i = 0; i < cart.lineItems.length; i += 1) {
        const item = lineItem(cart, i);
        divCart.append(item);
      }

      const totalBefore = totalpricebeforeDiscount(cart);
      const totalDiv = createCustomElement('div', ['cart-total'], `Total price: ${totalBefore / 100}USD`);
      if (!(cart.discountCodes.length === 0)) {
        totalDiv.classList.add('crossline');
      }
      const totalNewDiv = createCustomElement('div', ['cartnew-total'], `Total price: ${total}USD`);
      if(cart.discountCodes.length===0){
        totalNewDiv.classList.add('invisible');
      }

      const promoDiv = createCustomElement('div', ['div-promo']);
      const promoTitle = createCustomElement('div', ['promo-title'], 'Promo code');
      const warningPromo = createCustomElement('div', ['promo-warning'], 'Your discount code is activeted!');
      warningPromo.classList.add('invisible');
      const promoCode = createCustomElement('input', ['promo-code']) as HTMLInputElement;
      let promoValue = promoCode.value;
      promoCode.addEventListener('input', (event) => {
        promoValue = (event.target as HTMLInputElement).value.trim();
      });
      const btnPromo = createCustomElement('button', ['btn-promo'], 'Apply') as HTMLButtonElement;

      btnPromo.addEventListener('click',async ()=>{
          const {version} = await new ApiClient().getCartById(id);
          const promo = await new ApiClient().addDiscountCode(id, version, promoValue);
          const totalnew = document.querySelector('.cartnew-total');
          const total = document.querySelector('.cart-total');
          total?.classList.add('crossline');
          totalnew?.classList.remove('invisible');
          const totalValue = await promo.totalPrice.centAmount
          if(totalnew){
            totalnew.textContent = `Total price: ${totalValue/100}USD`;
          }
          warningPromo.classList.remove('invisible');

      })

      promoDiv.append(promoTitle,promoCode,btnPromo,warningPromo );

      const btnCLearCart = createCustomElement('button', ['btn-clear'], 'Clear cart') as HTMLButtonElement;

      btnCLearCart.addEventListener('click', async () => {
          const {version} = await new ApiClient().getCartById(id);
          const clear = await new ApiClient().deleteCart(id, version);
          removeLocalStorageValue(KEY_CART);
          EmptyCart();
      });

      wrapper.append(divCart, promoDiv, totalDiv, totalNewDiv, btnCLearCart);
    }
  } else {
    EmptyCart();
  }
};

const drawCartPage = () => {
  const mailWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mailWrapper.textContent = '';
  const title = createPageTitle('Cart');
  mailWrapper.append(title);
  DrawCart();
};

export { drawCartPage };
