import { createCustomElement } from '../../shared/utilities/helper-functions';

const createNavBar = (): HTMLElement => {
  const navBar = createCustomElement('nav', ['nav']);
  const linkHome = createCustomElement('a', ['nav-link'], 'Home') as HTMLLinkElement;
  linkHome.href = '/';
  const linkShop = createCustomElement('a', ['nav-link'], 'Shop') as HTMLLinkElement;
  linkShop.href = '/shop';
  const linkAbout = createCustomElement('a', ['nav-link'], 'About') as HTMLLinkElement;
  linkAbout.href = '/about';
  const linkContact = createCustomElement('a', ['nav-link'], 'Contact') as HTMLLinkElement;
  linkContact.href = '/contact';
  navBar.append(linkHome, linkShop, linkAbout, linkContact);

  return navBar;
};

const createIconBar = (): HTMLElement => {
  const iconBar = createCustomElement('div', ['icon-bar']);
  const logIn = createCustomElement('a', ['login-link'], 'Log in') as HTMLLinkElement;
  logIn.href = '/login';
  const linkProfile = createCustomElement('a', ['profile-link']) as HTMLLinkElement;
  linkProfile.href = '/profile';
  const profileIcon = createCustomElement('div', ['profile__icon']);
  linkProfile.append(profileIcon);
  const linkBasket = createCustomElement('a', ['basket-link']) as HTMLLinkElement;
  linkBasket.href = '/basket';
  const basketIcon = createCustomElement('div', ['basket__icon']);
  linkBasket.append(basketIcon);
  iconBar.append(linkProfile, linkBasket, logIn);
  return iconBar;
};

export const drawHeader = (): void => {
  const body = document.querySelector('body');
  const header = createCustomElement('header', ['header']);
  body?.append(header);
  const wrapper = createCustomElement('div', ['header__wrapper']);
  header.append(wrapper);
  const logo = createCustomElement('a', ['logo']) as HTMLLinkElement;
  logo.href = '/';
  const logoIcon = createCustomElement('div', ['logo__icon']);
  const logoText = createCustomElement('h1', ['logo__text'], 'Comfort');
  logo.append(logoIcon, logoText);
  const navBar = createNavBar();
  const iconBar = createIconBar();
  wrapper.append(logo, navBar, iconBar);
};