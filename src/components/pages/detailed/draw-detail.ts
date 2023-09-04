import { Product } from '@commercetools/platform-sdk';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createPageTitle } from '../../shared/utilities/title';
import { nextImage, prevImage, updateImagePosition } from './slider';
import { openPopup } from './popup';

const detailClasses = {
  DETAIL: 'detail',
  IMG_BLOCK: 'detail__images-block',
  IMG_WRAPPER: 'detail__img-wrapper',
  NOT_PRODUCT: 'not-found-product',
  IMG: 'img',
  PREV_BTN: 'prev-img',
  NEXT_BTN: 'next-img',
  INFO: 'product-info',
  NAME: 'product-name',
  PRICES: 'price-container',
  BASE_PRICE: 'product-price',
  DISCOUNT: 'product-discount',
  DESCRIPTION: 'product-description',
};

const createInformBlock = (name: string, price: string, description: string, discountPrice?: string): HTMLElement => {
  const informBlock = createCustomElement('div', [detailClasses.INFO]);
  const productName = createCustomElement('h2', [detailClasses.NAME], `${name}`);
  const productPrice = createCustomElement('p', [detailClasses.BASE_PRICE], `USD ${price}`);
  const productDescription = createCustomElement('p', [detailClasses.DESCRIPTION], `${description}`);
  const priceContainer = createCustomElement('div', [detailClasses.PRICES]);

  if (discountPrice) {
    productPrice.style.textDecoration = 'line-through';
    const discount = createCustomElement('p', [detailClasses.DISCOUNT], `USD ${discountPrice}`);
    priceContainer.append(discount, productPrice);
    informBlock.append(productName, priceContainer, productDescription);
  } else {
    priceContainer.append(productPrice);
    informBlock.append(productName, priceContainer, productDescription);
  }

  return informBlock;
};

const createImagesBlock = (product: Product): HTMLElement => {
  const productImgs = product.masterData.current.masterVariant?.images;
  const ImgBlock = createCustomElement('div', [detailClasses.IMG_BLOCK]);
  const imgWrapper = createCustomElement('div', [detailClasses.IMG_WRAPPER]);
  const prevBtn = createCustomElement('div', [detailClasses.PREV_BTN], '&#8249;');
  prevBtn.addEventListener('click', () => {
    const currentIndex = prevImage();
    updateImagePosition(currentIndex);
  });
  const nextBtn = createCustomElement('div', [detailClasses.NEXT_BTN], '&#8250;');
  nextBtn.addEventListener('click', () => {
    const currentIndex = nextImage();
    updateImagePosition(currentIndex);
  });

  if (productImgs) {
    productImgs.forEach((img, index) => {
      const image = createCustomElement('img', [detailClasses.IMG]) as HTMLImageElement;
      image.addEventListener('click', openPopup);
      image.setAttribute('data-img-num', `${index}`);
      image.src = img.url;
      imgWrapper.append(image);
    });
    if (productImgs?.length > 1) {
      ImgBlock.append(imgWrapper, prevBtn, nextBtn);
    } else {
      ImgBlock.append(imgWrapper);
    }
  }
  return ImgBlock;
};

export const drawDetail = async (product: Product | string): Promise<void> => {
  const mailWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  if (typeof product === 'string') {
    const textNotFound = createCustomElement('h1', [detailClasses.NOT_PRODUCT], product);
    mailWrapper.append(textNotFound);
  } else {
    const productName = product.masterData.current.name.en;
    const productPrice = product.masterData.current.masterVariant?.prices;
    const productDescription = product.masterData.current.metaDescription?.en ?? '';
    let price: string;

    mailWrapper.innerHTML = '';
    const title = createPageTitle('About the product');
    const detail = createCustomElement('div', [detailClasses.DETAIL]);
    const imgBlock = createImagesBlock(product);

    detail.append(imgBlock);
    if (productPrice) {
      const basePrice = productPrice[0].value.centAmount;
      const discountPrice = productPrice[0].discounted?.value.centAmount;
      price = (basePrice / 100).toFixed(2);
      if (discountPrice) {
        const discount = (discountPrice / 100).toFixed(2);
        const informBlock = createInformBlock(productName, price, productDescription, discount);
        detail.append(informBlock);
      } else {
        const informBlock = createInformBlock(productName, price, productDescription);
        detail.append(informBlock);
      }
    }
    mailWrapper.append(title, detail);
  }
};
