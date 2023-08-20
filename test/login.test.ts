import * as login from '../src/components/pages/log-in/login';

describe('login module', () => {
  test('it should create a mail block with the correct structure', () => {
    const mailBlock = login.createMailBlock();

    expect(mailBlock.tagName).toBe('LABEL');
    expect(mailBlock.classList.contains(login.loginClasses.LABEL_MAIL)).toBe(true);

    const inputMail = mailBlock.querySelector(`.${login.loginClasses.INPUT_MAIL}`) as HTMLInputElement;
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

    const pasInput = pasBlock.querySelector(`.${login.loginClasses.INPUT_PAS}`) as HTMLInputElement;
    expect(pasInput).not.toBeNull();
    expect(pasInput.type).toBe('password');
    expect(pasInput.placeholder).toBe('password');
    expect(pasInput.autocomplete).toBe('current-password');
    expect(pasInput.hasAttribute('required')).toBe(true);
  });
});
