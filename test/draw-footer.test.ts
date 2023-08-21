import { drawFooter, footerClasses } from '../src/components/pages/footer/draw-footer';

describe('Draw footer module', () => {
  const QUANTITY_FOOTER_ELEM = 4;
  const RSS_LINK = 'https://rs.school/';
  beforeAll(() => {
    document.body.innerHTML = '';
  });

  test('It should draw footer with correct structure', () => {
    drawFooter();

    const footer = document.querySelector('footer');
    expect(footer).not.toBeNull();

    const footerContainer = document.querySelector(`.${footerClasses.CONTAINER}`);
    expect(footerContainer?.children.length).toBe(QUANTITY_FOOTER_ELEM);

    const address = footerContainer?.querySelector(`.${footerClasses.ADDRESS_CONTAIN}`);
    expect(address).not.toBeNull();

    const footerNav = footerContainer?.querySelector(`.${footerClasses.FOOTER_NAV}`);
    expect(footerNav).not.toBeNull();

    const rssLink = footerContainer?.querySelector(`.${footerClasses.RSS_LINK}`);
    expect(rssLink?.tagName).toBe('A');
    expect(rssLink?.getAttribute('href')).toBe(RSS_LINK);
    expect(rssLink?.getAttribute('target')).toBe('_blank');

    const year = footerContainer?.querySelector(`.${footerClasses.YEAR}`);
    expect(year).not.toBeNull();
  });
});
