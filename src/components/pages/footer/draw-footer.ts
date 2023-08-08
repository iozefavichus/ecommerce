import { createCustomElement } from '../../shared/utilities/helper-functions';

const createAddressContainer = (): HTMLElement => {
  const addressContainer = createCustomElement('div', ['address-container']);
  const mallName = createCustomElement('a', ['mall-name'], 'Comfort.') as HTMLLinkElement;
  mallName.href = '/';
  const address = createCustomElement('div', ['address']);
  const addressLink = createCustomElement('a', ['address__link']) as HTMLLinkElement;
  addressLink.href = 'https://goo.gl/maps/HnTZhtb3iDB2m6t5A';
  addressLink.setAttribute('target', '_blank');
  address.setAttribute('itemscope', '');
  address.setAttribute('itemtype', 'http://schema.org/PostalAddress');
  address.append(addressLink);
  const streetAddress = createCustomElement('span', ['street'], '2 Stoneygate Road, Newmilns,');
  streetAddress.setAttribute('itemprop', 'streetAddress');
  const streetLocal = createCustomElement('span', ['local'], 'Ayrshire, United Kingdom');
  streetLocal.setAttribute('itemprop', 'addressLocality');
  addressLink.append(streetAddress);
  addressContainer.append(mallName, addressLink, streetLocal);
  return addressContainer;
};

const createFooterLinksContainer = (): HTMLElement => {
  const footerLinks = createCustomElement('div', ['footer__nav']);
  const linkHome = createCustomElement('a', ['nav-link'], 'Home') as HTMLLinkElement;
  linkHome.href = '/';
  const linkShop = createCustomElement('a', ['nav-link'], 'Shop') as HTMLLinkElement;
  linkShop.href = '/shop';
  const linkAbout = createCustomElement('a', ['nav-link'], 'About') as HTMLLinkElement;
  linkAbout.href = '/about';
  const linkContact = createCustomElement('a', ['nav-link'], 'Contact') as HTMLLinkElement;
  linkContact.href = '/contact';
  footerLinks.append(linkHome, linkShop, linkAbout, linkContact);

  return footerLinks;
};

export const drawFooter = (): void => {
  const body = document.querySelector('body');
  const footer = createCustomElement('footer', ['footer']);
  const wrapper = createCustomElement('div', ['footer__wrapper']);
  const footerContainer = createCustomElement('div', ['footer__container']);
  const addressContainer = createAddressContainer();
  const footerLinks = createFooterLinksContainer();
  const rssLink = createCustomElement('a', ['rss-link']) as HTMLLinkElement;
  rssLink.href = 'https://rs.school/';
  rssLink.setAttribute('target', '_blank');
  const rssLogo = createCustomElement('div', ['rss-logo']);
  rssLink.append(rssLogo);
  const yearCreate = createCustomElement('h3', ['year'], '2023Q1');

  footer.append(wrapper);
  wrapper.append(footerContainer);
  footerContainer.append(addressContainer, footerLinks, rssLink, yearCreate);
  body?.append(footer);
};
