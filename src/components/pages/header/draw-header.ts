import { createCustomElement } from '../../shared/utilities/helper-functions';

const createNavBar = (): HTMLElement => {
  const navBar = createCustomElement('nav', ['nav']);
  const linkHome = createCustomElement('a', ['nav-link'], 'Home') as HTMLLinkElement;
  linkHome.href = '#';
  const linkShop = createCustomElement('a', ['nav-link'], 'Shop') as HTMLLinkElement;
  linkShop.href = '#';
  const linkAbout = createCustomElement('a', ['nav-link'], 'About') as HTMLLinkElement;
  linkAbout.href = '#';
  const linkContact = createCustomElement('a', ['nav-link'], 'Contact') as HTMLLinkElement;
  linkContact.href = '#';
  navBar.append(linkHome, linkShop, linkAbout, linkContact);

  return navBar;
};

const createIconBar = (): HTMLElement => {
  const iconBar = createCustomElement('div', ['icon-bar']);
  const logIn = createCustomElement('a', ['login-link'], 'Log in') as HTMLLinkElement;
  logIn.href = '#';
  const linkBasket = createCustomElement('a', ['basket']) as HTMLLinkElement;
  linkBasket.href = '#';
  const basketIcon = createCustomElement('span', ['basket__icon']);
  linkBasket.append(basketIcon);
  iconBar.append(linkBasket, logIn);
  return iconBar;
};

export const drawHeader = () => {
  const body = document.querySelector('body');
  const header = createCustomElement('header', ['header']);
  body?.append(header);
  const wrapper = createCustomElement('div', ['header__wrapper']);
  header.append(wrapper);
  const logo = createCustomElement('a', ['logo']) as HTMLLinkElement;
  logo.href = '#';
  const logoIcon = createCustomElement('div', ['logo__icon']);
  const logoText = createCustomElement('h1', ['logo__text'], 'Comfort');
  logo.append(logoIcon, logoText);
  const navBar = createNavBar();
  const iconBar = createIconBar();
  wrapper.append(logo, navBar, iconBar);
};
