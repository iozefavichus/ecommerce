
import { createPageTitle } from '../../shared/utilities/title';
import { StpClientApi } from '../../shared/api/stpClient-api';
import { getLocalStorage } from '../../app/localStorage/localStorage';
import { KEY_CART, hasCart } from './has-cart';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { productImage } from './poduct-image';


const DrawCart= async ()=>{
  const mailWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  const wrapper = createCustomElement('div',['wrapper']);
  mailWrapper.append(wrapper);
  if (hasCart()) {
    const id = getLocalStorage(KEY_CART) as string;
    const cart = await new StpClientApi().getCartById(id);
    if(cart.lineItems.length === 0){
      const emptyCart = createCustomElement('div', ['empty__text'], `Your shopping cart is empty! Let's go to the catalog to choose something new!`);
      const btnCatalog = createCustomElement('button', ['btn-catalog'],'To catalog') as HTMLButtonElement;
      wrapper.append(emptyCart, btnCatalog);
    } else {
      let total = 0;
      const divCart = createCustomElement('div',['container-cart']);

      for(let i=0; i<cart.lineItems.length; i+=1 ){

        const divItem = createCustomElement('div',['cart-item']);

        const numberDiv = createCustomElement('div',['cart-number'],`${i}.`);

        const divImg = createCustomElement('div',[`cart-img${i}`]);
        const productID = cart.lineItems[i].productId;
        if(productID){
          productImage(productID,i);
        }
        const name = cart.lineItems[i].name.en;
        const divName = createCustomElement('div',['cart-name'],`${name}`);

        const price = cart.lineItems[i].price.value.centAmount;
        total += price/100;
        const divPriceForOne = createCustomElement('div',['cart-price'],`${price/100}USD`);

        const {quantity} = cart.lineItems[i];
        const divQuantity = createCustomElement('div',['cart-quantity']);
        const quantityValue = createCustomElement('input',['quantity'],`${quantity}`) as HTMLFormElement;
        quantityValue.setAttribute('value',`${quantity}`);
        const btnMinus = createCustomElement('button',['btn-minus'],'-') as HTMLButtonElement;
        const btnPlus = createCustomElement('button',['btn-plus'],'+') as HTMLButtonElement;
        divQuantity.append(btnMinus, quantityValue, btnPlus);

        const priceForAll = price/100*quantity;
        const divPriceForAll = createCustomElement('div',['cart-all-price'], `${priceForAll}USD`);

        const divForDeleteBtn =  createCustomElement('div',['cart-delete']);
        const BtnDelete = createCustomElement('button',['cart-btn-delete'],'Delete') as HTMLButtonElement;
        divForDeleteBtn.append(BtnDelete);

        divItem.append(numberDiv, divImg, divName, divPriceForOne, divQuantity, divPriceForAll, divForDeleteBtn);
        divCart.append(divItem);
      }
      const totalDiv = createCustomElement('div',['cart-total'],`Total price: ${total}USD`);
      wrapper.append(divCart,totalDiv);
    }
  } else {
      const emptyCart = createCustomElement('div', ['empty__text'], `Your shopping cart is empty! Let's go to the catalog to choose something new!`);
      const btnCatalog = createCustomElement('button', ['btn-catalog'],'To catalog') as HTMLButtonElement;
      wrapper.append(emptyCart, btnCatalog);
  }
 }


const drawCartPage = () => {
  const mailWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mailWrapper.innerHTML = '';
  const title = createPageTitle('Cart');
  mailWrapper.append(title);
  DrawCart();

};

export { drawCartPage };