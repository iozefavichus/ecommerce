import { createPageTitle } from '../../shared/utilities/title';
import { StpClientApi } from '../../shared/api/stpClient-api';
import { getLocalStorage, removeLocalStorageValue } from '../../app/localStorage/localStorage';
import { KEY_CART, hasCart } from './has-cart';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { productImage } from './poduct-image';

const DrawCart = async () => {
  const mailWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  const wrapper = createCustomElement('div', ['cart-wrapper']);
  mailWrapper.append(wrapper);
  if (hasCart()) {
    const id = getLocalStorage(KEY_CART) as string;
    const cart = await new StpClientApi().getCartById(id);
    if (cart.lineItems.length === 0) {
      const emptyCart = createCustomElement(
        'div',
        ['empty__text'],
        `Your shopping cart is empty! Let's go to the catalog to choose something new!`,
      );
      const btnCatalog = createCustomElement('button', ['btn-catalog'], 'To catalog') as HTMLButtonElement;
      wrapper.append(emptyCart, btnCatalog);
    } else {
      let total = 0;
      const divCart = createCustomElement('div', ['container-cart']);

      for (let i = 0; i < cart.lineItems.length; i += 1) {
        const divItem = createCustomElement('div', ['cart-item']);

        const numberDiv = createCustomElement('div', ['cart-number'], `${i + 1}.`);

        const divImg = createCustomElement('div', [`cart-img${i}`]);
        const productID = cart.lineItems[i].productId;
        if (productID) {
          productImage(productID, i);
        }
        const name = cart.lineItems[i].name.en;
        const divName = createCustomElement('div', ['cart-name'], `${name}`);

        const price = cart.lineItems[i].price.value.centAmount;
        total += price / 100;
        const divPriceForOne = createCustomElement('div', ['cart-price'], `${price / 100}USD`);

        const { quantity } = cart.lineItems[i];
        const divQuantity = createCustomElement('div', ['cart-quantity']);
        const quantityValue = createCustomElement('input', ['quantity'], `${quantity}`) as HTMLFormElement;
        quantityValue.setAttribute('value', `${quantity}`);
        const btnMinus = createCustomElement('button', ['btn-minus'], '-') as HTMLButtonElement;
        btnMinus.addEventListener('click', () => {
          // if(quantity===1){
          // } else {
          // const updateQuantity = new StpClientApi().updateCart();
          // }
        });
        const btnPlus = createCustomElement('button', ['btn-plus'], '+') as HTMLButtonElement;
        btnPlus.addEventListener('click', () => {
          // const updateQuantity = new StpClientApi().updateCart();
        });
        divQuantity.append(btnMinus, quantityValue, btnPlus);

        const priceForAll = (price / 100) * quantity;
        const divPriceForAll = createCustomElement('div', ['cart-all-price'], `${priceForAll}USD`);

        const divForDeleteBtn = createCustomElement('div', ['cart-delete']);
        const BtnDelete = createCustomElement('button', ['cart-btn-delete'], 'Delete') as HTMLButtonElement;

        // BtnDelete.addEventListener('click',()=>{
        //   const removeItem = new StpClientApi().deleteItemFromCart();
        // })
        divForDeleteBtn.append(BtnDelete);

        divItem.append(numberDiv, divImg, divName, divPriceForOne, divQuantity, divPriceForAll, divForDeleteBtn);
        divCart.append(divItem);
      }
      const totalDiv = createCustomElement('div', ['cart-total'], `Total price: ${total}USD`);
      const btnCLearCart = createCustomElement('button', ['btn-clear'], 'Clear cart') as HTMLButtonElement;

      btnCLearCart.addEventListener('click', () => {
        const cLearCart = async () => {
          const cart = await new StpClientApi().getCartById(id);
          const cartVersion = cart.version;
          const clear = await new StpClientApi().deleteCart(id, cartVersion);
          removeLocalStorageValue(KEY_CART);
          console.log(clear);
          wrapper.innerHTML = '';
          const emptyCart = createCustomElement(
            'div',
            ['empty__text'],
            `Your shopping cart is empty! Let's go to the catalog to choose something new!`,
          );
          const btnCatalog = createCustomElement('button', ['btn-catalog'], 'To catalog') as HTMLButtonElement;
          wrapper.append(emptyCart, btnCatalog);
        };
        cLearCart();
      });

      wrapper.append(divCart, totalDiv, btnCLearCart);
    }
  } else {
    const emptyCart = createCustomElement(
      'div',
      ['empty__text'],
      `Your shopping cart is empty! Let's go to the catalog to choose something new!`,
    );
    const btnCatalog = createCustomElement('button', ['btn-catalog'], 'To catalog') as HTMLButtonElement;
    wrapper.append(emptyCart, btnCatalog);
  }
};

const drawCartPage = () => {
  const mailWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mailWrapper.innerHTML = '';
  const title = createPageTitle('Cart');
  mailWrapper.append(title);
  DrawCart();
};

export { drawCartPage };
