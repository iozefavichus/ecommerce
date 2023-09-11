
import { createPageTitle } from '../../shared/utilities/title';
import { StpClientApi } from '../../shared/api/stpClient-api';
import { getLocalStorage, removeLocalStorageValue } from '../../app/localStorage/localStorage';
import { KEY_CART, hasCart } from './has-cart';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { productImage } from './poduct-image';
// import { version } from 'html-webpack-plugin';


const DrawCart = async ()=>{
  const mailWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  const wrapper = createCustomElement('div',['cart-wrapper']);
  mailWrapper.append(wrapper);
  if (hasCart()) {
    const id = getLocalStorage(KEY_CART) as string;
    const cart = await new StpClientApi().getCartById(id);
    if(cart.customLineItems.length === 0){
      const emptyCart = createCustomElement('div', ['empty__text'], `Your shopping cart is empty! Let's go to the catalog to choose something new!`);
      const btnCatalog = createCustomElement('button', ['btn-catalog'],'To catalog') as HTMLButtonElement;
      wrapper.append(emptyCart, btnCatalog);
    } else {
      const divCart = createCustomElement('div',['container-cart']);
      for(let i=0; i<cart.customLineItems.length; i+=1 ){
        const lineId = cart.customLineItems[i].id;
        const {slug} = cart.customLineItems[i];
        const taxCategoryId = String(cart.customLineItems[i].taxCategory?.id);
        const {centAmount} = cart.lineItems[i].price.value;
        const divItem = createCustomElement('div',['cart-item']);

        const numberDiv = createCustomElement('div',['cart-number'],`${i+1}.`);

        const divImg = createCustomElement('div',[`cart-img${i}`]);
        const productID = cart.lineItems[i].productId;
        if(productID){
          productImage(productID,i);
        }
        const name = cart.customLineItems[i].name.en;

        const divName = createCustomElement('div',['cart-name'],`${name}`);

        const price = cart.lineItems[i].price.value.centAmount;
        const divPriceForOne = createCustomElement('div',['cart-price'],`${price/100}USD`);

        const {quantity} = cart.customLineItems[i];
        const divQuantity = createCustomElement('div',['cart-quantity']);
        const quantityValue = createCustomElement('input',['quantity'],`${quantity}`) as HTMLFormElement;
        quantityValue.setAttribute('value',`${quantity}`);
        const btnMinus = createCustomElement('button',['btn-minus'],'-') as HTMLButtonElement;
        btnMinus.addEventListener('click',()=>{
          if(quantity===1){
            btnMinus.classList.add('non-active');
          } else {
            const {version}=cart;
            const updateQuantity = new StpClientApi().removeOneItemFromCart(id,version,lineId);
            console.log(updateQuantity);
          }
        })

        const priceForAll = price/100*quantity;
        const divPriceForAll = createCustomElement('div',['cart-all-price'], `${priceForAll}USD`);

        const btnPlus = createCustomElement('button',['btn-plus'],'+') as HTMLButtonElement;
        btnPlus.addEventListener('click',()=>{
          const plus = async() =>{
            const cart = await new StpClientApi().getCartById(id);
            const {version} = cart;
            const updateQuantity = await new StpClientApi().update2Cart(id, version, name, centAmount, slug, taxCategoryId)
            const cartNew = await new StpClientApi().getCartById(id);
            const quantityNew = cartNew.customLineItems[i].quantity;
            quantityValue.setAttribute('value',`${quantityNew}`);
            divPriceForAll.textContent = `${(price/100)*(quantity+1)}USD`;
            const total = cartNew.totalPrice.centAmount/100;
            const totalDiv = document.querySelector('.cart-total');
            if(totalDiv){
              totalDiv.textContent = `Total price: ${total}USD`;
            }
            console.log(cartNew);
            console.log(updateQuantity);

          };
          plus();
        })
        divQuantity.append(btnMinus, quantityValue, btnPlus);

        const divForDeleteBtn =  createCustomElement('div',['cart-delete']);
        const BtnDelete = createCustomElement('button',['cart-btn-delete'],'Delete') as HTMLButtonElement;

        BtnDelete.addEventListener('click',()=>{
          const remove = async() => {
            const cart = await new StpClientApi().getCartById(id);
            const {version} = cart;
            const removeItem = await new StpClientApi().deleteItemFromCart(id, version, lineId);
            console.log(removeItem);
          }
          remove();
        })
        divForDeleteBtn.append(BtnDelete);

        divItem.append(numberDiv, divImg, divName, divPriceForOne, divQuantity, divPriceForAll, divForDeleteBtn);
        divCart.append(divItem);
      }
      const total = cart.totalPrice.centAmount/100;
      const totalDiv = createCustomElement('div',['cart-total'],`Total price: ${total}USD`);
      const promoDiv = createCustomElement('div',['div-promo']);
      const promoTitle = createCustomElement('div',['promo-title'],'Promo code');
      const promoCode = createCustomElement('input',['promo-code']) as HTMLInputElement;
      let promoValue = promoCode.value;
      promoCode.addEventListener('input',(event)=>{
        promoValue = (event.target as HTMLInputElement).value.trim();
        // console.log(promoValue);
      })
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