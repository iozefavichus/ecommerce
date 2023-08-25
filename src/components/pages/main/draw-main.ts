import { createCustomElement } from '../../shared/utilities/helper-functions';

const createDiscover = (): HTMLElement => {
  const bgMain = createCustomElement('div', ['main-img']);
  const discoverBlock = createCustomElement('div', ['discover-block']);
  const discoverInnerBlock = createCustomElement('div', ['discover-inner-block']);
  const discoverAppointment = createCustomElement('p', ['discover__appointment'], 'New Arrival');
  const discoverTitle = createCustomElement('p', ['discover__title'], `Discover Our <br/>New Collection`);
  const discoverSubtitle = createCustomElement(
    'p',
    ['discover__subtitle'],
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.',
  );
  const discoverBtn = createCustomElement('button', ['discover__button'], 'BUY Now');
  discoverInnerBlock.append(discoverAppointment, discoverTitle, discoverSubtitle, discoverBtn);
  discoverBlock.append(discoverInnerBlock);
  bgMain.append(discoverBlock);
  return bgMain;
};

const createBrowse = (): HTMLElement => {
  const sectionBrowse = createCustomElement('section', ['browse']);
  const browseTitle = createCustomElement('p', ['browse__title'], `Browse The Range <br/>`);
  const browseSubtitle = createCustomElement(
    'p',
    ['browse__subtitle'],
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  );
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

const createOurProducts = (): HTMLElement => {
  const sectionProducts = createCustomElement('section', ['products']);
  const productsTitle = createCustomElement('p', ['products__title'], 'Our Products');
  const card = createCustomElement('div', ['products__card']);
  const imgBlock1 = createCustomElement('div', ['products__img']);
  // for test product detailed page
  imgBlock1.setAttribute('data-key', '79500');
  const imgBlock2 = createCustomElement('div', ['products__img']);
  const imgBlock3 = createCustomElement('div', ['products__img']);
  const imgBlock4 = createCustomElement('div', ['products__img']);
  const imgBlock5 = createCustomElement('div', ['products__img']);
  const imgBlock6 = createCustomElement('div', ['products__img']);
  const imgBlock7 = createCustomElement('div', ['products__img']);
  const imgBlock8 = createCustomElement('div', ['products__img']);
  const imgProducts1 = createCustomElement('img', ['products__img1']);
  const imgText1 = createCustomElement('p', ['products__img-text'], 'Syltherine');
  const imgDesc1 = createCustomElement('p', ['products__img-desc'], 'Stylish cafe chair');
  const imgPrice1 = createCustomElement('p', ['products__img-price'], 'Rp 2.500.000');
  const imgProducts2 = createCustomElement('img', ['products__img2']);
  const imgText2 = createCustomElement('p', ['products__img-text'], 'Leviosa');
  const imgDesc2 = createCustomElement('p', ['products__img-desc'], 'Stylish cafe chair');
  const imgPrice2 = createCustomElement('p', ['products__img-price'], 'Rp 2.500.000');
  const imgProducts3 = createCustomElement('img', ['products__img3']);
  const imgText3 = createCustomElement('p', ['products__img-text'], 'Lolito');
  const imgDesc3 = createCustomElement('p', ['products__img-desc'], 'Luxury big sofa');
  const imgPrice3 = createCustomElement('p', ['products__img-price'], 'Rp 7.000.000');
  const imgProducts4 = createCustomElement('img', ['products__img4']);
  const imgText4 = createCustomElement('p', ['products__img-text'], 'Respira');
  const imgDesc4 = createCustomElement('p', ['products__img-desc'], 'Outdoor bar table and stool');
  const imgPrice4 = createCustomElement('p', ['products__img-price'], 'Rp 500.000');
  const imgProducts5 = createCustomElement('img', ['products__img5']);
  const imgText5 = createCustomElement('p', ['products__img-text'], 'Grifo');
  const imgDesc5 = createCustomElement('p', ['products__img-desc'], 'Night lamp');
  const imgPrice5 = createCustomElement('p', ['products__img-price'], 'Rp 1.500.000');
  const imgProducts6 = createCustomElement('img', ['products__img6']);
  const imgText6 = createCustomElement('p', ['products__img-text'], 'Muggo');
  const imgDesc6 = createCustomElement('p', ['products__img-desc'], 'Small mug');
  const imgPrice6 = createCustomElement('p', ['products__img-price'], 'Rp 150.000');
  const imgProducts7 = createCustomElement('img', ['products__img7']);
  const imgText7 = createCustomElement('p', ['products__img-text'], 'Pingky');
  const imgDesc7 = createCustomElement('p', ['products__img-desc'], 'Cute bed set');
  const imgPrice7 = createCustomElement('p', ['products__img-price'], 'Rp 7.000.000');
  const imgProducts8 = createCustomElement('img', ['products__img8']);
  const imgText8 = createCustomElement('p', ['products__img-text'], 'Potty');
  const imgDesc8 = createCustomElement('p', ['products__img-desc'], 'Minimalist flower pot');
  const imgPrice8 = createCustomElement('p', ['products__img-price'], 'Rp 500.000');
  const imgBtn = createCustomElement('button', ['products__btn'], 'Show More');
  imgBlock1.append(imgProducts1, imgText1, imgDesc1, imgPrice1);
  imgBlock2.append(imgProducts2, imgText2, imgDesc2, imgPrice2);
  imgBlock3.append(imgProducts3, imgText3, imgDesc3, imgPrice3);
  imgBlock4.append(imgProducts4, imgText4, imgDesc4, imgPrice4);
  imgBlock5.append(imgProducts5, imgText5, imgDesc5, imgPrice5);
  imgBlock6.append(imgProducts6, imgText6, imgDesc6, imgPrice6);
  imgBlock7.append(imgProducts7, imgText7, imgDesc7, imgPrice7);
  imgBlock8.append(imgProducts8, imgText8, imgDesc8, imgPrice8);
  card.append(imgBlock1, imgBlock2, imgBlock3, imgBlock4, imgBlock5, imgBlock6, imgBlock7, imgBlock8);
  sectionProducts.append(productsTitle, card, imgBtn);
  return sectionProducts;
};

export const drawMain = () => {
  const body = document.querySelector('body');
  const main = createCustomElement('main', ['main']);
  body?.append(main);
  const wrapper = createCustomElement('div', ['main__wrapper']);
  main.append(wrapper);
  const discover = createDiscover();
  const browse = createBrowse();
  const ourProducts = createOurProducts();
  wrapper.append(discover, browse, ourProducts);
};
