import * as login from '../src/components/pages/log-in/login';

describe('login module', () => {
  test('it should create a mail block with the correct structure', () => {
    const mailBlock = login.createMailBlock();

    expect(mailBlock.tagName).toBe('LABEL');
    expect(mailBlock.classList.contains('label-mail')).toBe(true);

    const inputMail = mailBlock.querySelector('input') as HTMLInputElement;
    expect(inputMail).not.toBeNull();
    expect(inputMail.type).toBe('text');
    expect(inputMail.placeholder).toBe('mail');
    expect(inputMail.getAttribute('autocomplete')).toBe('email');
    expect(inputMail.hasAttribute('required')).toBe(true);
  });
});
