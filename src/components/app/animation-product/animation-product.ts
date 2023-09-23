import { createCustomElement } from '../../shared/utilities/helper-functions';

const animationProductInCart = (event: MouseEvent) => {
  const parentElem = (event.target as HTMLElement).parentElement;
  const cartBtn = createCustomElement('button', ['cart-btn', 'animation']) as HTMLButtonElement;
  const x = event.offsetX;
  let y = event.offsetY;
  cartBtn.style.right = `${x}px`;
  cartBtn.style.bottom = `100px`;
  parentElem?.append(cartBtn);
  const animation = setTimeout(() => {
    cartBtn.style.bottom = `${(y += 1000)}px`;
  }, 0);
  const removeCartBtn = setTimeout(() => {
    parentElem?.removeChild(cartBtn);
  }, 1500);
};

const animationDeleteProduct = (event: MouseEvent) => {
  const parentElem = (event.target as HTMLElement).parentElement;
  const textElem = createCustomElement('p', ['text-delete'], 'Product is delete');
  parentElem?.append(textElem);
  setTimeout(() => {
    parentElem?.removeChild(textElem);
  }, 1000);
};

export { animationProductInCart, animationDeleteProduct };
