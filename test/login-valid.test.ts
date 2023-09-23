import { validationMail, validationPassword } from '../src/components/app/validation/login-valid';
import { render } from '../src/components/shared/utilities/render';
import { drawLogInPage } from '../src/components/pages/log-in/draw-login';

describe('Login valid module', () => {
  describe('validationMail function', () => {
    const NOT_CORRECT_1 = 'name @mail.com';
    const NOT_CORRECT_2 = 'name@mail';
    const NOT_CORRECT_3 = 'name@mail.com ';

    beforeEach(() => {
      document.body.innerHTML = '';
      render(false);
      drawLogInPage();
    });

    test('show warning tex if mail have not correct formate', () => {
      const warningElem = document.querySelector('.warning-text') as HTMLElement;
      const WAR_TEXT = 'Delete the space in the email line';

      validationMail(NOT_CORRECT_1, warningElem);

      expect(warningElem.textContent).toBe(WAR_TEXT);
    });

    test('show warning tex if mail have not correct formate', () => {
      const warningElem = document.querySelector('.warning-text') as HTMLElement;
      const WAR_TEXT = 'Your formatted email address is not correct! Correct formatted user@domen.name';

      validationMail(NOT_CORRECT_2, warningElem);

      expect(warningElem.textContent).toBe(WAR_TEXT);
    });

    test('show warning tex if mail have space at the end', () => {
      const warningElem = document.querySelector('.warning-text') as HTMLElement;
      const WAR_TEXT = 'Delete the space in the email line';

      validationMail(NOT_CORRECT_3, warningElem);

      expect(warningElem.textContent).toBe(WAR_TEXT);
    });
  });

  describe('validationPassword function', () => {
    const NOT_CORRECT_1 = 'aA1!aaa';
    const NOT_CORRECT_2 = 'AA1!AAAA';
    const NOT_CORRECT_3 = 'aa1!aaaa';
    const NOT_CORRECT_4 = 'aaA!aaaa';
    const NOT_CORRECT_5 = 'aaA1aaaa';
    const NOT_CORRECT_6 = 'aA1!aaaa ';

    beforeEach(() => {
      document.body.innerHTML = '';
      render(false);
      drawLogInPage();
    });

    test('show warning tex if password have long < 8', () => {
      const warningElem = document.querySelector('.warning-text') as HTMLElement;
      const WAR_TEXT = 'Password must be at least 8 characters long.';

      validationPassword(NOT_CORRECT_1, warningElem);
      expect(warningElem.textContent).toBe(WAR_TEXT);
    });

    test('show warning tex if password not have a lowercase', () => {
      const warningElem = document.querySelector('.warning-text') as HTMLElement;
      const WAR_TEXT = 'Password must contain at least one lowercase letter (a-z).';

      validationPassword(NOT_CORRECT_2, warningElem);
      expect(warningElem.textContent).toBe(WAR_TEXT);
    });

    test('show warning tex if password not have a uppercase', () => {
      const warningElem = document.querySelector('.warning-text') as HTMLElement;
      const WAR_TEXT = 'Password must contain at least one uppercase letter (A-Z).';

      validationPassword(NOT_CORRECT_3, warningElem);

      expect(warningElem.textContent).toBe(WAR_TEXT);
    });

    test('show warning tex if password no have a number', () => {
      const warningElem = document.querySelector('.warning-text') as HTMLElement;
      const WAR_TEXT = 'Password must contain at least one digit (0-9).';

      validationPassword(NOT_CORRECT_4, warningElem);
      expect(warningElem.textContent).toBe(WAR_TEXT);
    });

    test('show warning tex if password not have a symbol !@#$%^&*', () => {
      const warningElem = document.querySelector('.warning-text') as HTMLElement;
      const WAR_TEXT = 'Password must contain at least one special character (e.g., !@#$%^&*).';

      validationPassword(NOT_CORRECT_5, warningElem);

      expect(warningElem.textContent).toBe(WAR_TEXT);
    });

    test('show warning tex if password have space at the end', () => {
      const warningElem = document.querySelector('.warning-text') as HTMLElement;
      const WAR_TEXT = 'Delete the space in the password line';

      validationPassword(NOT_CORRECT_6, warningElem);
      expect(warningElem.textContent).toBe(WAR_TEXT);
    });
  });
});
