import { customRoute } from '../src/components/app/router/router';
import { render } from '../src/components/shared/utilities/render';

describe('Router module', () => {
  const notLogin = false;
  const pages: Record<string, string> = {
    MAIN: '/',
    CATALOG: '/catalog',
    ABOUT: '/about',
    REGISTRATION: '/registration',
    CART: '/cart',
    PROFILE: '/profile',
    LOGIN: '/login',
  };
  beforeAll(() => {
    document.body.innerHTML = '';
  });

  test('It should first render with correct structure', () => {
    render(notLogin);

    const body = document.querySelector('body');
    expect(body?.children.length === 3).toBe(true);
    expect(body?.querySelector('header')).not.toBeNull();
    expect(body?.querySelector('main')).not.toBeNull();
    expect(body?.querySelector('footer')).not.toBeNull();
  });

  test('It should correct structure after rout on main page', () => {
    customRoute(pages.MAIN);

    const mainWrapper = document.querySelector('.main__wrapper');
    expect(mainWrapper).not.toBeNull();
    const mainImg = mainWrapper?.querySelector('.main-img');
    expect(mainImg).not.toBeNull();
    const browse = mainWrapper?.querySelector('.browse');
    expect(browse).not.toBeNull();
    const prodSection = mainWrapper?.querySelector('.products');
    expect(prodSection).not.toBeNull();
    const products = mainWrapper?.querySelector('.product__wrapper');
    expect(products).not.toBeNull();
  });

  test('it should correct structure after rout on catalog page', () => {
    customRoute(pages.CATALOG);

    const mainWrapper = document.querySelector('.main__wrapper');
    expect(mainWrapper).not.toBeNull();
    const searchWrap = mainWrapper?.querySelector('.search-wrapper');
    expect(searchWrap).not.toBeNull();
    const category = mainWrapper?.querySelector('.wrapper__category');
    expect(category).not.toBeNull();
    const filter = mainWrapper?.querySelector('.filter__wrapper');
    expect(filter).not.toBeNull();
    const productsSection = mainWrapper?.querySelector('.product__wrapper');
    expect(productsSection).not.toBeNull();
    const navigation = mainWrapper?.querySelector('.navigation');
    expect(navigation).not.toBeNull();
  });

  test('it should correct structure after rout on about page', () => {
    customRoute(pages.ABOUT);

    const mainWrapper = document.querySelector('.main__wrapper');
    expect(mainWrapper).not.toBeNull();
    const title = mainWrapper?.querySelector('.reg-img');
    expect(title).not.toBeNull();
    const wrapper = mainWrapper?.querySelector('.outer-container');
    expect(wrapper).not.toBeNull();
  });

  test('it should correct structure after rout on registration page', () => {
    customRoute(pages.REGISTRATION);

    const mainWrapper = document.querySelector('.main__wrapper');
    expect(mainWrapper).not.toBeNull();
    const title = mainWrapper?.querySelector('.reg-img');
    expect(title).not.toBeNull();
    const wrapper = mainWrapper?.querySelector('.reg-main');
    expect(wrapper).not.toBeNull();
  });

  test('it should correct structure after rout on cart page', () => {
    customRoute(pages.CART);

    const mainWrapper = document.querySelector('.main__wrapper');
    expect(mainWrapper).not.toBeNull();
    const title = mainWrapper?.querySelector('.reg-img');
    expect(title).not.toBeNull();
    const cartWrapper = mainWrapper?.querySelector('.cart-wrapper');
    expect(cartWrapper).not.toBeNull();
    const modal = mainWrapper?.querySelector('.modal-container');
    expect(modal).not.toBeNull();
  });

  test('it should correct structure after rout on profile page', () => {
    customRoute(pages.PROFILE);

    const mainWrapper = document.querySelector('.main__wrapper');
    expect(mainWrapper).not.toBeNull();
    const title = mainWrapper?.querySelector('.reg-img');
    expect(title).not.toBeNull();
    const person = mainWrapper?.querySelector('.container-personal');
    expect(person).not.toBeNull();
    const pasContainer = mainWrapper?.querySelector('.btnchange-container');
    expect(pasContainer).not.toBeNull();
    const addressContainer = mainWrapper?.querySelector('.container-addresses');
    expect(addressContainer).not.toBeNull();
  });

  test('it should correct structure after rout on login page', () => {
    customRoute(pages.LOGIN);

    const mainWrapper = document.querySelector('.main__wrapper');
    expect(mainWrapper).not.toBeNull();
    const title = mainWrapper?.querySelector('.heading-img');
    expect(title).not.toBeNull();
    const authForm = mainWrapper?.querySelector('.authorization-form');
    expect(authForm).not.toBeNull();
    const p = mainWrapper?.querySelector('.or');
    expect(p).not.toBeNull();
    const regBtn = mainWrapper?.querySelector('.registration-btn');
    expect(regBtn).not.toBeNull();
  });
});
