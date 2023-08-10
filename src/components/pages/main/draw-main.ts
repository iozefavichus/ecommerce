import { createCustomElement } from '../../shared/utilities/helper-functions';

const createDiscover = (): HTMLElement => {
  const imgWrapper = createCustomElement('div', ['main__wrapper']);
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
  imgWrapper.append(bgMain);
  return imgWrapper;
};

const createBrowse = (): HTMLElement => {
  const wrapper = createCustomElement('div', ['main__wrapper']);
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
  wrapper.append(sectionBrowse);
  return wrapper;
};

export const drawMain = () => {
  const body = document.querySelector('body');
  const wrapper = createCustomElement('main', ['main']);
  body?.append(wrapper);
  const discover = createDiscover();
  const browse = createBrowse();
  wrapper.append(discover, browse);
};
