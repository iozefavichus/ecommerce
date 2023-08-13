import { customRoute } from '../../app/router/router';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { renderChangeContent } from '../../shared/utilities/render';

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
  logIn.addEventListener('click', (event): void => {
    event.preventDefault();
    customRoute(event);
    const newPath = window.location.pathname;
    renderChangeContent(newPath);
  });
  const registrationLink = createCustomElement('a', ['registration-link'], 'Registration') as HTMLLinkElement;
  registrationLink.href = '/registration';
  const linkProfile = createCustomElement('a', ['profile-link']) as HTMLLinkElement;
  linkProfile.href = '/profile';
  linkProfile.addEventListener('click', (event): void => {
    event.preventDefault();
    customRoute(event);
  });
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
  const logo = createCustomElement('a', ['logo']) as HTMLLinkElement;
  logo.href = '/';
  const logoIcon = createCustomElement('div', ['logo__icon']);
  const logoText = createCustomElement('h1', ['logo__text'], 'Comfort');
  logo.append(logoIcon, logoText);
  const navBar = createNavBar();
  const iconBar = createIconBar();
  wrapper.append(logo, navBar, iconBar);
};
