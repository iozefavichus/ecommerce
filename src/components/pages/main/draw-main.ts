import { createCustomElement } from '../../shared/utilities/helper-functions';

const createDiscover = (): HTMLElement => {
  const imgWrapper = createCustomElement('div', ['wrapper-img']);
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

export const drawMain = () => {
  const body = document.querySelector('body');
  const wrapper = createCustomElement('div', ['wrapper']);
  body?.append(wrapper);
  const discover = createDiscover();
  wrapper.append(discover);
};
