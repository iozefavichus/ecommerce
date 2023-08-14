import { customRoute } from '../../app/router/router';
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
  const registrationLink = createCustomElement('a', ['registration-link'], 'Registration') as HTMLLinkElement;
  registrationLink.href = '/registration';
  const linkProfile = createCustomElement('a', ['profile-link']) as HTMLLinkElement;
  linkProfile.href = '/profile';
  const linkBasket = createCustomElement('a', ['basket-link']) as HTMLLinkElement;
  linkBasket.href = '/basket';
  iconBar.append(linkProfile, linkBasket, logIn, registrationLink);
  return iconBar;
};

export const drawHeader = (): void => {
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
  const iconBar = createIconBar();
  wrapper.append(logo, navBar, iconBar);
};
