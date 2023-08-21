import { Constants } from '../../../types/shared';
import { createCustomElement } from '../../shared/utilities/helper-functions';

const footerClasses: Constants = {
  NAV_LINK: 'nav-link',
  ADDRESS: 'address',
  ADDRESS_CONTAIN: 'address-container',
  ADDRESS_LINK: 'address__link',
  STREET: 'street',
  LOCAL: 'local',
  MALL_NAME: 'mall-name',
  FOOTER: 'footer',
  FOOTER_NAV: 'footer__nav',
  WRAPPER: 'footer__wrapper',
  CONTAINER: 'footer__container',
  RSS_LINK: 'rss-link',
  RSS_LOGO: 'rss-logo',
  YEAR: 'year',
};

const createAddressContainer = (): HTMLElement => {
  const addressContainer = createCustomElement('div', [footerClasses.ADDRESS_CONTAIN]);
  const mallName = createCustomElement('a', [footerClasses.MALL_NAME], 'Comfort.') as HTMLLinkElement;
  mallName.href = '/';
  const address = createCustomElement('div', [footerClasses.ADDRESS]);
  const addressLink = createCustomElement('a', [footerClasses.ADDRESS_LINK]) as HTMLLinkElement;
  addressLink.href = 'https://goo.gl/maps/HnTZhtb3iDB2m6t5A';
  addressLink.setAttribute('target', '_blank');
  address.setAttribute('itemscope', '');
  address.setAttribute('itemtype', 'http://schema.org/PostalAddress');
  address.append(addressLink);
  const streetAddress = createCustomElement('span', [footerClasses.ADDRESS], '2 Stoneygate Road, Newmilns,');
  streetAddress.setAttribute('itemprop', 'streetAddress');
  const streetLocal = createCustomElement('span', [footerClasses.LOCAL], 'Ayrshire, United Kingdom');
  streetLocal.setAttribute('itemprop', 'addressLocality');
  addressLink.append(streetAddress);
  addressContainer.append(mallName, addressLink, streetLocal);
  return addressContainer;
};

const createFooterLinksContainer = (): HTMLElement => {
  const footerLinks = createCustomElement('div', [footerClasses.FOOTER_NAV]);
  const linkHome = createCustomElement('a', [footerClasses.NAV_LINK], 'Home') as HTMLLinkElement;
  linkHome.href = '/';
  const linkShop = createCustomElement('a', [footerClasses.NAV_LINK], 'Shop') as HTMLLinkElement;
  linkShop.href = '/shop';
  const linkAbout = createCustomElement('a', [footerClasses.NAV_LINK], 'About') as HTMLLinkElement;
  linkAbout.href = '/about';
  const linkContact = createCustomElement('a', [footerClasses.NAV_LINK], 'Contact') as HTMLLinkElement;
  linkContact.href = '/contact';
  footerLinks.append(linkHome, linkShop, linkAbout, linkContact);

  return footerLinks;
};

const drawFooter = (): void => {
  const body = document.querySelector('body');
  const footer = createCustomElement('footer', [footerClasses.FOOTER]);
  const wrapper = createCustomElement('div', [footerClasses.WRAPPER]);
  const footerContainer = createCustomElement('div', [footerClasses.CONTAINER]);
  const addressContainer = createAddressContainer();
  const footerLinks = createFooterLinksContainer();
  const rssLink = createCustomElement('a', [footerClasses.RSS_LINK]) as HTMLLinkElement;
  rssLink.href = 'https://rs.school/';
  rssLink.setAttribute('target', '_blank');
  const rssLogo = createCustomElement('div', [footerClasses.RSS_LOGO]);
  rssLink.append(rssLogo);
  const yearCreate = createCustomElement('h3', [footerClasses.YEAR], '2023');

  footer.append(wrapper);
  wrapper.append(footerContainer);
  footerContainer.append(addressContainer, footerLinks, rssLink, yearCreate);
  body?.append(footer);
};

export { footerClasses, drawFooter };
