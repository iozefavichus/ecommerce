
import { createPageTitle } from '../../shared/utilities/title';
import { StpClientApi } from '../../shared/api/stpClient-api';
import { getLocalStorage, removeLocalStorageValue } from '../../app/localStorage/localStorage';
import { KEY_CART, hasCart } from './has-cart';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { productImage } from './poduct-image';


const DrawCart = async ()=>{
  const mailWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  const wrapper = createCustomElement('div',['cart-wrapper']);
  mailWrapper.append(wrapper);
  if (hasCart()) {
    const id = getLocalStorage(KEY_CART) as string;
    const cart = await new StpClientApi().getCartById(id);
    console.log(cart);
    if(cart.lineItems.length === 0){
      const emptyCart = createCustomElement('div', ['empty__text'], `Your shopping cart is empty! Let's go to the catalog to choose something new!`);
      const btnCatalog = createCustomElement('button', ['btn-catalog'],'To catalog') as HTMLButtonElement;
      wrapper.append(emptyCart, btnCatalog);
    } else {
      let total = 0;
      const divCart = createCustomElement('div',['container-cart']);
      const {version} = cart;
      for(let i=0; i<cart.lineItems.length; i+=1 ){
        const lineId = cart.lineItems[i].id;
        console.log(lineId);

        const divItem = createCustomElement('div',['cart-item']);

        const numberDiv = createCustomElement('div',['cart-number'],`${i+1}.`);

        const divImg = createCustomElement('div',[`cart-img${i}`]);
        const productID = cart.lineItems[i].productId;
        if(productID){
          productImage(productID,i);
        }
        const name = cart.lineItems[i].name.en;
        const divName = createCustomElement('div',['cart-name'],`${name}`);

        const price = cart.lineItems[i].price.value.centAmount;
        const divPriceForOne = createCustomElement('div',['cart-price'],`${price/100}USD`);

        const {quantity} = cart.lineItems[i];
        total += (price*quantity)/100;
        const divQuantity = createCustomElement('div',['cart-quantity']);
        const quantityValue = createCustomElement('input',['quantity'],`${quantity}`) as HTMLFormElement;
        quantityValue.setAttribute('value',`${quantity}`);
        const btnMinus = createCustomElement('button',['btn-minus'],'-') as HTMLButtonElement;
        btnMinus.addEventListener('click',()=>{
          // if(quantity===1){

          // } else {
            // const updateQuantity = new StpClientApi().updateCart();
          // }
        })
        const btnPlus = createCustomElement('button',['btn-plus'],'+') as HTMLButtonElement;
        btnPlus.addEventListener('click',()=>{
          // const updateQuantity = new StpClientApi().updateCart();
        })
        divQuantity.append(btnMinus, quantityValue, btnPlus);

        const priceForAll = price/100*quantity;
        const divPriceForAll = createCustomElement('div',['cart-all-price'], `${priceForAll}USD`);

        const divForDeleteBtn =  createCustomElement('div',['cart-delete']);
        const BtnDelete = createCustomElement('button',['cart-btn-delete'],'Delete') as HTMLButtonElement;

        BtnDelete.addEventListener('click',()=>{
          const removeItem = new StpClientApi().deleteItemFromCart(id, version, lineId);
          console.log(removeItem);
        })
        divForDeleteBtn.append(BtnDelete);

        divItem.append(numberDiv, divImg, divName, divPriceForOne, divQuantity, divPriceForAll, divForDeleteBtn);
        divCart.append(divItem);
      }
      const totalDiv = createCustomElement('div',['cart-total'],`Total price: ${total}USD`);
      const promoDiv = createCustomElement('div',['div-promo']);
      const promoTitle = createCustomElement('div',['promo-title'],'Promo code');
      const promoCode = createCustomElement('input',['promo-code']) as HTMLInputElement;
      let promoValue = promoCode.value;
      promoCode.addEventListener('input',(event)=>{
        promoValue = (event.target as HTMLInputElement).value.trim();
        console.log(promoValue);
      })

      // console.log(promoValue);
      const btnPromo = createCustomElement('button', ['btn-promo'],'Apply') as HTMLButtonElement

      btnPromo.addEventListener('click',()=>{
        const addPromo = async() => {
          const cart = await new StpClientApi().getCartById(id);
          const {version} = cart;
          const promo = await new StpClientApi().addDiscountCode(id, version, promoValue);
          console.log(promo);
        }
        addPromo();
      })

      promoDiv.append(promoTitle,promoCode,btnPromo);
      const btnCLearCart = createCustomElement('button',['btn-clear'],'Clear cart') as HTMLButtonElement;

      btnCLearCart.addEventListener('click',()=>{
          const cLearCart = async() => {
          const cart = await new StpClientApi().getCartById(id);
          console.log(cart);
          const cartVersion = cart.version;
          const clear = await new StpClientApi().deleteCart(id,cartVersion);
          removeLocalStorageValue(KEY_CART);
          console.log(clear);
          wrapper.innerHTML ='';
          const emptyCart = createCustomElement('div', ['empty__text'], `Your shopping cart is empty! Let's go to the catalog to choose something new!`);
          const btnCatalog = createCustomElement('button', ['btn-catalog'],'To catalog') as HTMLButtonElement;
          wrapper.append(emptyCart, btnCatalog);
        }
        cLearCart();
      })
      wrapper.append(divCart,promoDiv,totalDiv,btnCLearCart);
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