import { createCustomElement } from '../../shared/utilities/helper-functions';
import { updateImagePosition, curIndex as sliderIndex } from './slider';

const body = document.querySelector('body');
const popupWrapper = createCustomElement('div', ['popup-wrapper']);
const closePopupBtn = createCustomElement('div', ['close-popup'], 'X');

const closePopup = (event: MouseEvent) => {
  const targetElem = event.target as HTMLElement;
  if (targetElem.classList.contains('popup-wrapper') || targetElem.classList.contains('close-popup')) {
    const detailPage = document.querySelector('.detail');
    const imgBlock = document.querySelector('.detail__images-block');
    body?.classList.remove('popup');
    imgBlock?.classList.remove('popup');
    if (imgBlock) {
      detailPage?.prepend(imgBlock);
      updateImagePosition(sliderIndex.index);
    }
    body?.removeChild(popupWrapper);
  }
};

export const openPopup = () => {
  body?.classList.add('popup');
  const imgBlock = document.querySelector('.detail__images-block');
  imgBlock?.classList.add('popup');
  if (imgBlock) {
    popupWrapper.append(imgBlock, closePopupBtn);
  }
  body?.append(popupWrapper);
  updateImagePosition(sliderIndex.index);
};

popupWrapper.addEventListener('click', (event) => {
  closePopup(event);
});
