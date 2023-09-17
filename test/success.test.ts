import { createCustomElement } from "../src/components/shared/utilities/helper-functions";
import { drawSuccessPassword } from "../src/components/pages/profile/successpassword";
import { drawSuccessUpdate } from "../src/components/pages/profile/successupdate";

describe('When the password successfully change', () => {
    beforeAll(() => {
        document.body.innerHTML = '';
      });
    it('returns message about it', () => {
      const wrapper = createCustomElement('div',['main__wrapper']);
      const body = document.querySelector('body');
      body?.append(wrapper);
      drawSuccessPassword();
      const result = document.querySelector('.success__text')
      const expected = `Congratulations! Your password was changed!`;
      expect(result?.textContent).toEqual(expected);
    });
  });

  describe('When updates are successfully', () => {
    beforeAll(() => {
        document.body.innerHTML = '';
      });
    it('returns message about it', () => {
      const wrapper = createCustomElement('div',['main__wrapper']);
      const body = document.querySelector('body');
      body?.append(wrapper);
      drawSuccessUpdate();
      const result = document.querySelector('.success__text')
      const expected = `Congratulations! Your changes are saved!`;
      expect(result?.textContent).toEqual(expected);
    });
  });