import * as hum from '../src/components/pages/header/hamburger-menu';

describe('Hamburger module', () => {
  beforeAll(() => {
    document.body.innerHTML = '<div class="hamburger"></div><nav class="nav"></nav>';
  });

  test('It open menu', () => {
    const body = document.querySelector('body');
    const btn = document.querySelector('.hamburger');
    const menu = document.querySelector('.nav');

    hum.openCloseMenuToBtn();
    expect(body?.classList.contains('open')).toBe(true);
    expect(btn?.classList.contains('open')).toBe(true);
    expect(menu?.classList.contains('active')).toBe(true);
  });

  test('It close menu', () => {
    const body = document.querySelector('body');
    const btn = document.querySelector('.hamburger');
    const menu = document.querySelector('.nav');

    hum.openCloseMenuToBtn();
    expect(body?.classList.contains('open')).toBe(false);
    expect(btn?.classList.contains('open')).toBe(false);
    expect(menu?.classList.contains('active')).toBe(false);
  });
});
