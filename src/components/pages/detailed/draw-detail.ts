import { Product } from '@commercetools/platform-sdk';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createPageTitle } from '../../shared/utilities/title';

const createInformBlock = (name: string, price: number): HTMLElement => {
  const informBlock = createCustomElement('div', ['product-info']);
  const productName = createCustomElement('h2', ['product-name'], `${name}`);
  const productPrice = createCustomElement('p', ['product-price'], `EUR ${price}`);

  informBlock.append(productName, productPrice);
  return informBlock;
};

export const drawDetail = (product: Product) => {
  const productImg = product.masterData.current.masterVariant?.images;
  const productName = product.masterData.current.name.en;
  const productPrice = product.masterData.current.masterVariant?.prices;
  let price: number;

  const mailWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mailWrapper.innerHTML = '';
  const title = createPageTitle('Detail');
  const detail = createCustomElement('div', ['detail']);
  const imgBlock = createCustomElement('div', ['img-container']);
  detail.append(imgBlock);
  const img = createCustomElement('img', ['img-product']) as HTMLImageElement;
  if (productImg && productImg.length > 0) {
    const srcImageProduct = productImg[0].url;
    img.style.backgroundImage = `url(${srcImageProduct})`;
  }
  if (productPrice) {
    price = productPrice[0].value.centAmount / 100;
    const informBlock = createInformBlock(productName, price);
    detail.append(informBlock);
  }
  imgBlock.append(img);
  mailWrapper.append(title, detail);
};
