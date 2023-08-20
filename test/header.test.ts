import * as header from '../src/components/pages/header/header';

describe('Header module', () => {
  const QUANTITY_ELEM = 4;
  const QUANTITY_ELEM_LOGIN = 5;
  const IS_LOGIN = true;
  const LOGOUT = false;
  const COLOR_GREEN = 'rgb(8, 250, 4)';
  const COLOR_BLACK = 'rgb(0, 0, 0)';

  test('it should create a navbar block with the correct structure', () => {
    const navbar = header.createNavBar();
    expect(navbar).not.toBeNull();
    expect(navbar.tagName).toBe('NAV');
    expect(navbar.children.length).toBe(QUANTITY_ELEM);
  });

  test('It should create hamburger button with four span', () => {
    const hamburgerBtn = header.createHamburgerBtn();
    expect(hamburgerBtn).not.toBeNull();
    expect(hamburgerBtn.children.length).toBe(QUANTITY_ELEM);
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
      expect(wrapper?.children.length).toBe(QUANTITY_ELEM);

      const iconBar = wrapper?.querySelector(`.${header.headerClasses.ICON_BAR}`);
      expect(iconBar?.children.length).toBe(QUANTITY_ELEM_LOGIN);

      const SVG = iconBar?.querySelector('path');
      expect(SVG?.getAttribute('fill')).toBe(COLOR_GREEN);
    });

    test('It should correct structure in header if user is login', () => {
      header.drawHeader(LOGOUT);

      const headerElem = document.querySelector('header');
      expect(headerElem).not.toBeNull();

      const wrapper = headerElem?.querySelector(`.${header.headerClasses.HEADER_WRAPPER}`);
      expect(wrapper?.children.length).toBe(QUANTITY_ELEM);

      const iconBar = wrapper?.querySelector(`.${header.headerClasses.ICON_BAR}`);
      expect(iconBar?.children.length).toBe(QUANTITY_ELEM);

      const SVG = iconBar?.querySelector('path');
      expect(SVG?.getAttribute('fill')).toBe(COLOR_BLACK);
    });
  });
});
