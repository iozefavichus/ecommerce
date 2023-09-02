import * as header from '../src/components/pages/header/header';

describe('Header module', () => {
  const NAV_ELEM = 4;
  const SPANS_COUNT = 4;
  const QUANTITY_ICON_BAR = 3;
  const IS_LOGIN = true;
  const LOGOUT = false;

  test('it should create a navbar block with the correct structure', () => {
    const navbar = header.createNavBar();
    expect(navbar).not.toBeNull();
    expect(navbar.tagName).toBe('NAV');
    expect(navbar.children.length).toBe(NAV_ELEM);
  });

  test('It should create hamburger button with four span', () => {
    const hamburgerBtn = header.createHamburgerBtn();
    expect(hamburgerBtn).not.toBeNull();
    expect(hamburgerBtn.children.length).toBe(SPANS_COUNT);
  });

  describe('It create header', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
    });

    test('It should correct structure in header if user is login', () => {
      header.drawHeader(IS_LOGIN);

      const headerElem = document.querySelector('header');
      expect(headerElem).not.toBeNull();

      const wrapper = headerElem?.querySelector(`.${header.headerClasses.HEADER_WRAPPER}`);
      expect(wrapper?.children.length).toBe(NAV_ELEM);

      const iconBar = wrapper?.querySelector(`.${header.headerClasses.ICON_BAR}`);
      expect(iconBar?.children.length).toBe(QUANTITY_ICON_BAR);
    });

    test('It should correct structure in header if user is login', () => {
      header.drawHeader(LOGOUT);

      const headerElem = document.querySelector('header');
      expect(headerElem).not.toBeNull();

      const wrapper = headerElem?.querySelector(`.${header.headerClasses.HEADER_WRAPPER}`);
      expect(wrapper?.children.length).toBe(NAV_ELEM);

      const iconBar = wrapper?.querySelector(`.${header.headerClasses.ICON_BAR}`);
      expect(iconBar?.children.length).toBe(QUANTITY_ICON_BAR);
    });
  });
});
