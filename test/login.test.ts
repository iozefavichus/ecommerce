import * as login from '../src/components/pages/log-in/draw-login';

describe('Login module', () => {
  test('it should create a mail block with the correct structure', () => {
    const mailBlock = login.createMailBlock();

    expect(mailBlock.tagName).toBe('LABEL');
    expect(mailBlock.classList.contains(login.loginClasses.LABEL_MAIL)).toBe(true);

    const inputMail = mailBlock.querySelector('input') as HTMLInputElement;
    expect(inputMail.classList.contains(login.loginClasses.INPUT_MAIL)).toBe(true);
    expect(inputMail).not.toBeNull();
    expect(inputMail.type).toBe('text');
    expect(inputMail.placeholder).toBe('mail');
    expect(inputMail.getAttribute('autocomplete')).toBe('email');
    expect(inputMail.hasAttribute('required')).toBe(true);
  });

  test('it should create a password block with the correct structure', () => {
    const pasBlock = login.createPasswordBlock();

    expect(pasBlock.tagName).toBe('LABEL');
    expect(pasBlock.classList.contains(login.loginClasses.LABEL_PAS)).toBe(true);

    const pasInput = pasBlock.querySelector('input') as HTMLInputElement;
    expect(pasInput.classList.contains(login.loginClasses.INPUT_PAS)).toBe(true);
    expect(pasInput).not.toBeNull();
    expect(pasInput.type).toBe('password');
    expect(pasInput.placeholder).toBe('password');
    expect(pasInput.autocomplete).toBe('current-password');
    expect(pasInput.hasAttribute('required')).toBe(true);
  });

  test('it should create a checkbox block with the correct structure', () => {
    const checkLabel = login.createCheckbox();

    expect(checkLabel.tagName).toBe('LABEL');
    expect(checkLabel.classList.contains(login.loginClasses.LABEL_CHECKBOX)).toBe(true);

    const checkInput = checkLabel.querySelector('input') as HTMLInputElement;
    expect(checkInput.classList.contains(login.loginClasses.OPEN_PAS)).toBe(true);
    expect(checkInput).not.toBeNull();
    expect(checkInput.type).toBe('checkbox');
  });

  describe('It create login page', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div class="main__wrapper"></div>';
    });

    test('it should create a login page inside main wrapper', () => {
      login.drawLogInPage();
      const mainWrapper = document.querySelector('.main__wrapper');

      const authBlock = mainWrapper?.querySelector(`.${login.loginClasses.AUTH}`);
      expect(authBlock).not.toBeNull();

      const headerAuth = authBlock?.querySelector(`.${login.loginClasses.IMG}`);
      expect(headerAuth).not.toBeNull();

      const authForm = authBlock?.querySelector(`.${login.loginClasses.AUTH_FORM}`);
      expect(authForm).not.toBeNull();

      const p = authBlock?.querySelector('.or');
      expect(p).not.toBeNull();

      const regBtn = authBlock?.querySelector(`.${login.loginClasses.REG_BTN}`);
      expect(regBtn).not.toBeNull();
    });
  });
});
