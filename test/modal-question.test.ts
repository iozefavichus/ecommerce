import { confirmationWindow } from "../src/components/pages/cart/modal-question";
import { createCustomElement } from "../src/components/shared/utilities/helper-functions";


describe('When the modal window is', () => {
    beforeAll(() => {
        document.body.innerHTML = '';
      });
    it('there is two buttons', () => {
      const body = document.querySelector('body');
      const container = createCustomElement('div',['modal-container']);
      body?.append(container);
      confirmationWindow();
      const result = container.getElementsByTagName('button')
      const expected = 2;
      expect(result.length).toEqual(expected);
    });
  });