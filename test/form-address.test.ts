import { AddressesInfo } from "../src/components/pages/profile/form-addresses";
import { createCustomElement } from "../src/components/shared/utilities/helper-functions";

const customerAddresses = {
    country: 'US',
    streetName: 'First street',
    city: 'New York',
    postalCode: '11111',
};

describe('When the cart is empty', () => {
    beforeAll(() => {
        document.body.innerHTML = '';
      });
    it('returns message about it', () => {
        const wrapper = createCustomElement('div',['cart-wrapper']);
      const body = document.querySelector('body');
      body?.append(wrapper);
      const container = AddressesInfo([customerAddresses]);
      wrapper.append(container);
      const result = container.querySelector('.input-info');
      const waitingResult = result?.hasAttribute('readonly');
      const expected = true;
      expect(waitingResult).toEqual(expected);
    });
  });