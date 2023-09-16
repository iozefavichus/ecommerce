import { EmptyCart } from "../src/components/pages/cart/empty-cart";
import { createCustomElement } from "../src/components/shared/utilities/helper-functions";


describe('When the cart is empty', () => {
    beforeAll(() => {
        document.body.innerHTML = '';
      });
    it('returns message about it', () => {
      const wrapper = createCustomElement('div',['cart-wrapper']);
      const body = document.querySelector('body');
      body?.append(wrapper);
      EmptyCart();
      const result = document.querySelector('.empty__text')
      const expected = `Your shopping cart is empty! Let's go to the catalog to choose something new!`;
      expect(result?.textContent).toEqual(expected);
    });
  });