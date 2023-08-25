import { Product } from '@commercetools/platform-sdk';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createPageTitle } from '../../shared/utilities/title';

const createInformBlock = (name: string, price: number): HTMLElement => {
  const informBlock = createCustomElement('div', ['product-info']);
  const productName = createCustomElement('h2', ['product-name'], `${name}`);
  const productPrice = createCustomElement('p', ['product-price'], `USD ${price}`);

  informBlock.append(productName, productPrice);
  return informBlock;
};

const createImagesBlock = (product: Product, numberImg = 0) => {
  const productImgs = product.masterData.current.masterVariant?.images;
  const ImgBlock = createCustomElement('div', ['detail__images-block']);
  const smallImages = createCustomElement('div', ['detail__small-images']);
  const bigImage = createCustomElement('div', ['detail__big-img']);
  if (productImgs) {
    productImgs.forEach((img, index) => {
      const smallImg = createCustomElement('div', ['small-img']);
      smallImg.setAttribute('data-img-num', `${index}`);
      smallImg.style.backgroundImage = `url(${productImgs[index].url})`;
      smallImages.append(smallImg);
    });
    bigImage.style.backgroundImage = `url(${productImgs[numberImg].url})`;
  }

  ImgBlock.append(smallImages, bigImage);
  return ImgBlock;
};

export const drawDetail = (product: Product | string) => {
  const mailWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  if (typeof product === 'string') {
    const textNotFound = createCustomElement('h1', ['not-found-product'], product);
    mailWrapper.append(textNotFound);
  } else {
    const productName = product.masterData.current.name.en;
    const productPrice = product.masterData.current.masterVariant?.prices;
    let price: number;

    mailWrapper.innerHTML = '';
    const title = createPageTitle('Detail');
    const detail = createCustomElement('div', ['detail']);
    const imgBlock = createImagesBlock(product);
    detail.append(imgBlock);
    if (productPrice) {
      price = productPrice[0].value.centAmount / 100;
      const informBlock = createInformBlock(productName, price);
      detail.append(informBlock);
    }
    mailWrapper.append(title, detail);
  }
};
