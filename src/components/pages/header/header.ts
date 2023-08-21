import { accountSVG } from '../../../assets/icons/accountSVG';
import { Constants } from '../../../types/shared';
import { customRoute } from '../../app/router/router';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { openCloseMenuToBtn, closeMenuToNav } from './hamburger-menu';

const headerClasses: Constants = {
  HEADER: 'header',
  HEADER_WRAPPER: 'header__wrapper',
  LOGO: 'logo',
  LOGO_LINK: 'logo__link',
  LOGO_ICON: 'logo__icon',
  LOGO_TEXT: 'logo__text',
  NAV: 'nav',
  NAV_LINK: 'nav-link',
  HAMBURGER_BTN: 'hamburger',
  HAMBURGER_LINE: 'hamburger__line',
  ICON_BAR: 'icon-bar',
  PROFILE_LINK: 'profile-link',
  BASKET_LINK: 'basket-link',
  LOGIN_LINK: 'login-link',
  LOGOUT: 'log-out',
  REG_LINK: 'registration-link',
};

const links: Constants = {
  HOME: '/',
  SHOP: '/shop',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  REG: '/registration',
  PROFILE: '/profile',
  BASKET: '/basket',
};

const createNavBar = (): HTMLElement => {
  const navBar = createCustomElement('nav', [headerClasses.NAV]);
  const linkHome = createCustomElement('a', [headerClasses.NAV_LINK], 'Home') as HTMLLinkElement;
  linkHome.href = links.HOME;
  const linkShop = createCustomElement('a', [headerClasses.NAV_LINK], 'Shop') as HTMLLinkElement;
  linkShop.href = links.SHOP;
  const linkAbout = createCustomElement('a', [headerClasses.NAV_LINK], 'About') as HTMLLinkElement;
  linkAbout.href = links.ABOUT;
  const linkContact = createCustomElement('a', [headerClasses.NAV_LINK], 'Contact') as HTMLLinkElement;
  linkContact.href = links.CONTACT;
  navBar.append(linkHome, linkShop, linkAbout, linkContact);

  return navBar;
};

const createIconBar = (isLogin: boolean): HTMLElement => {
  const colorProfile = isLogin ? 'rgb(8, 250, 4)' : 'rgb(0, 0, 0)';
  const iconProfile = accountSVG(colorProfile);
  const iconBar = createCustomElement('div', [headerClasses.ICON_BAR]);
  const logIn = createCustomElement('a', [headerClasses.LOGIN_LINK], 'Log in') as HTMLLinkElement;
  logIn.href = links.LOGIN;
  const logOut = createCustomElement('a', [headerClasses.LOGOUT], 'Log out') as HTMLLinkElement;
  const registrationLink = createCustomElement('a', [headerClasses.REG_LINK], 'Registration') as HTMLLinkElement;
  registrationLink.href = links.REG;
  const linkProfile = createCustomElement('a', [headerClasses.PROFILE_LINK]) as HTMLLinkElement;
  linkProfile.innerHTML = iconProfile;
  linkProfile.href = links.PROFILE;
  const linkBasket = createCustomElement('a', [headerClasses.BASKET_LINK]) as HTMLLinkElement;
  linkBasket.href = links.PROFILE;
  const logBtn = isLogin ? logOut : '';
  // const regBtn = isLogin ? '' : registrationLink;
  iconBar.append(linkProfile, linkBasket, logIn, registrationLink, logBtn);
  return iconBar;
};

const createHamburgerBtn = (): HTMLElement => {
  let quantitySpan = 4;
  const button = createCustomElement('div', [headerClasses.HAMBURGER_BTN]);
  button.addEventListener('click', openCloseMenuToBtn);

  while (quantitySpan > 0) {
    const span = createCustomElement('span', [headerClasses.HAMBURGER_LINE]);
    button.append(span);
    quantitySpan -= 1;
  }
  return button;
};

const drawHeader = (isLogin: boolean): void => {
  const body = document.querySelector('body');
  const header = createCustomElement('header', [headerClasses.HEADER]);
  const wrapper = createCustomElement('div', [headerClasses.HEADER_WRAPPER]);
  const logo = createCustomElement('div', [headerClasses.LOGO]);
  const logoLink = createCustomElement('a', [headerClasses.LOGO_LINK]) as HTMLLinkElement;
  logoLink.href = links.HOME;
  logoLink.addEventListener('click', (event): void => {
    event.preventDefault();
    const linkElem = event.currentTarget as HTMLElement;
    const path = linkElem.getAttribute('href') as string;
    customRoute(path);
  });
  const logoIcon = createCustomElement('div', [headerClasses.LOGO_ICON]);
  const logoText = createCustomElement('h1', [headerClasses.LOGO_TEXT], 'Comfort');
  logoLink.append(logoText);
  logo.append(logoIcon, logoLink);
  const navBar = createNavBar();
  navBar.addEventListener('click', closeMenuToNav);
  const hamburgerBtn = createHamburgerBtn();
  const iconBar = createIconBar(isLogin);
  wrapper.append(logo, navBar, hamburgerBtn, iconBar);
  header.append(wrapper);
  body?.append(header);
};

export { headerClasses, links, createNavBar, createIconBar, createHamburgerBtn, drawHeader };
