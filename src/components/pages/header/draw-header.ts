import { accountSVG } from '../../../assets/icons/accountSVG';
import { customRoute } from '../../app/router/router';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { openCloseMenuToBtn, closeMenuToNav } from './hamburger-menu';

const headerClasses: Record<string, string> = {
  NAV: 'nav',
};

const createNavBar = (): HTMLElement => {
  const navBar = createCustomElement('nav', [headerClasses.NAV]);
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

const createIconBar = (isLogin: boolean): HTMLElement => {
  const colorProfile = isLogin ? 'rgb(8, 250, 4)' : 'rgb(0, 0, 0)';
  const iconProfile = accountSVG(colorProfile);
  const iconBar = createCustomElement('div', ['icon-bar']);
  const logIn = createCustomElement('a', ['login-link'], 'Log in') as HTMLLinkElement;
  logIn.href = '/login';
  const logOut = createCustomElement('a', ['log-out'], 'Log out') as HTMLLinkElement;
  const registrationLink = createCustomElement('a', ['registration-link'], 'Registration') as HTMLLinkElement;
  registrationLink.href = '/registration';
  const linkProfile = createCustomElement('a', ['profile-link']) as HTMLLinkElement;
  linkProfile.innerHTML = iconProfile;
  linkProfile.href = '/profile';
  const linkBasket = createCustomElement('a', ['basket-link']) as HTMLLinkElement;
  linkBasket.href = '/basket';
  const logBtn = isLogin ? logOut : logIn;
  const regBtn = isLogin ? '' : registrationLink;
  iconBar.append(linkProfile, linkBasket, logBtn, regBtn);
  return iconBar;
};

const createHamburgerBtn = (): HTMLElement => {
  let quantitySpan = 4;
  const button = createCustomElement('div', ['hamburger']);
  button.addEventListener('click', openCloseMenuToBtn);

  while (quantitySpan > 0) {
    const span = createCustomElement('span', ['hamburger__line']);
    button.append(span);
    quantitySpan -= 1;
  }
  return button;
};

export const drawHeader = (isLogin: boolean): void => {
  const body = document.querySelector('body');
  const header = createCustomElement('header', ['header']);
  body?.append(header);
  const wrapper = createCustomElement('div', ['header__wrapper']);
  header.append(wrapper);
  const logo = createCustomElement('div', ['logo']);
  const logoLink = createCustomElement('a', ['logo__link']) as HTMLLinkElement;
  logoLink.href = '/';
  logoLink.addEventListener('click', (event) => {
    event.preventDefault();
    const linkElem = event.currentTarget as HTMLElement;
    const path = linkElem.getAttribute('href') as string;
    customRoute(path);
  });
  const logoIcon = createCustomElement('div', ['logo__icon']);
  const logoText = createCustomElement('h1', ['logo__text'], 'Comfort');
  logoLink.append(logoText);
  logo.append(logoIcon, logoLink);
  const navBar = createNavBar();
  navBar.addEventListener('click', closeMenuToNav);
  const hamburgerBtn = createHamburgerBtn();
  const iconBar = createIconBar(isLogin);
  wrapper.append(logo, navBar, hamburgerBtn, iconBar);
};
