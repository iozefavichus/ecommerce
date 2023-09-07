// import { CartDraft } from '@commercetools/platform-sdk';
import { createPageTitle } from '../../shared/utilities/title';
// import { StpClientApi } from '../../shared/api/stpClient-api';
// import { createCustomElement } from '../../shared/utilities/helper-functions';

const drawCartPage = () => {
  const mailWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mailWrapper.innerHTML = '';
  const title = createPageTitle('Cart');

  mailWrapper.append(title);
};

export { drawCartPage };


// const cartDraft: CartDraft = {
//   key: `test-cart-key-${String(Math.ceil(Math.random()*10000))}`,
//   currency: 'USD',
//   country: 'US',
// }

// export const createCartDraftWithCustomer = async (customer) => {
//   const cartDraft: CartDraft = {
//     key: 'test-cart-key-' + randomUUID(),
//     currency: 'EUR',
//     country: 'DE',
//     customerId: customer.body.customer.id,
//   }

//   return cartDraft
// }
// const DrawCart= async ()=>{
//   const cart = await new StpClientApi().createCart(cartDraft);
//   if(cart.body.lineItems.length === 0){
//     const mailWrapper = document.querySelector('.main__wrapper') as HTMLElement;
//     const wrapper = createCustomElement('div',['wrapper']);
//     mailWrapper.append(wrapper);
//     const emptyCart = createCustomElement('div', ['empty__text'], `Your shopping cart is empty! Let's go to the catalog to choose something new!`);
//     const btnCatalog = createCustomElement('button', ['btn-catalog'],'To catalog') as HTMLButtonElement;
//     wrapper.append(emptyCart, btnCatalog);
//   }
// }

// DrawCart();
