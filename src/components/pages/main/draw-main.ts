import { createCustomElement } from '../../shared/utilities/helper-functions';
import { StpClientApi } from '../../shared/api/stpClient-api';
import { drawCard } from '../catalog/draw-catalog';

const createDiscover = (): HTMLElement => {
  const bgMain = createCustomElement('div', ['main-img']);
  const discoverBlock = createCustomElement('div', ['discover-block']);
  const discoverInnerBlock = createCustomElement('div', ['discover-inner-block']);
  const discoverAppointment = createCustomElement('p', ['discover__appointment'], 'New Arrival');
  const discoverTitle = createCustomElement('p', ['discover__title'], `Discover Our <br/>New Collection`);
  const discoverSubtitle = createCustomElement(
    'p',
    ['discover__subtitle'],
    'Comfort is trusted by millions of businesses worldwide',
  );
  const discoverBtn = createCustomElement('a', ['discover__button'], 'BUY Now') as HTMLLinkElement;
  discoverBtn.href = '/catalog';
  discoverInnerBlock.append(discoverAppointment, discoverTitle, discoverSubtitle, discoverBtn);
  discoverBlock.append(discoverInnerBlock);
  bgMain.append(discoverBlock);
  return bgMain;
};

const createBrowse = (): HTMLElement => {
  const sectionBrowse = createCustomElement('section', ['browse']);
  const browseTitle = createCustomElement('p', ['browse__title'], `Browse The Range <br/>`);
  const browseSubtitle = createCustomElement('p', ['browse__subtitle'], 'View our products');
  const card = createCustomElement('div', ['browse__card']);
  const imgBlock1 = createCustomElement('div', ['browse__img']);
  const imgBlock2 = createCustomElement('div', ['browse__img']);
  const imgBlock3 = createCustomElement('div', ['browse__img']);
  const imgBrowse1 = createCustomElement('img', ['browse__img1']);
  const imgText1 = createCustomElement('p', ['browse__img-text'], 'Dining');
  const imgBrowse2 = createCustomElement('img', ['browse__img2']);
  const imgText2 = createCustomElement('p', ['browse__img-text'], 'Living');
  const imgBrowse3 = createCustomElement('img', ['browse__img3']);
  const imgText3 = createCustomElement('p', ['browse__img-text'], 'Bedroom');
  imgBlock1.append(imgBrowse1, imgText1);
  imgBlock2.append(imgBrowse2, imgText2);
  imgBlock3.append(imgBrowse3, imgText3);
  card.append(imgBlock1, imgBlock2, imgBlock3);
  sectionBrowse.append(browseTitle, browseSubtitle, card);
  return sectionBrowse;
};

export const drawMain = () => {
  const body = document.querySelector('body');
  const main = createCustomElement('main', ['main']);
  body?.append(main);
  const wrapper = createCustomElement('div', ['main__wrapper']);
  main.append(wrapper);
  const productWrapper = createCustomElement('div', ['product__wrapper']);
  const discover = createDiscover();
  const browse = createBrowse();
  const sectionProducts = createCustomElement('section', ['products']);
  const productsTitle = createCustomElement('p', ['products__title'], 'Our Products');
  sectionProducts.append(productsTitle);
  wrapper.append(discover, browse, sectionProducts, productWrapper);
  const products = new StpClientApi().getProducts(4);
  products.then((products) => {
    products.forEach((product) => {
      drawCard(product, productWrapper);
    });
  });
};
