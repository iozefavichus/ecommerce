import { createCustomElement } from "../src/components/shared/utilities/helper-functions";
import { drawCartPage } from "../src/components/pages/cart/draw-cart";

describe('When the cart is empty', () => {
    beforeAll(() => {
        document.body.innerHTML = '';
      });
    it('returns message about it', () => {
      const wrapper = createCustomElement('div',['main__wrapper']);
      const body = document.querySelector('body');
      body?.append(wrapper);
      drawCartPage();
      const result = document.querySelector('.modal-container');
      const waitingResult = result?.classList.contains('modal-invisible');
      const expected = true;
      expect(result?.classList.contains('modal-invisible')).toEqual(expected);
    });
  });