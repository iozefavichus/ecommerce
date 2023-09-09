import { Product } from '@commercetools/platform-sdk';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createPageTitle } from '../../shared/utilities/title';
import { nextImage, prevImage, updateImagePosition } from './slider';
import { openPopup } from './popup';
import { StpClientApi } from '../../shared/api/stpClient-api';
import { KEY_CART, hasCart } from '../cart/has-cart';
import { getLocalStorage } from '../../app/localStorage/localStorage';
import { createCart, updateCart } from '../cart/cart';

const detailClasses = {
  DETAIL: 'detail',
  IMG_BLOCK: 'detail__images-block',
  INFO_BLOCK: 'detail__info-block',
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
  ADD_PRODUCT: 'add-product-btn',
  REMOVE_PRODUCT: 'remove-product-btn',
  BTNS_CONTAINER: 'detail__btns',
};

const createInformBlock = (name: string, price: string, description: string, discountPrice?: string): HTMLElement => {
  const productInfo = createCustomElement('div', [detailClasses.INFO]);
  const productName = createCustomElement('h2', [detailClasses.NAME], `${name}`);
  const productPrice = createCustomElement('p', [detailClasses.BASE_PRICE], `USD ${price}`);
  const productDescription = createCustomElement('p', [detailClasses.DESCRIPTION], `${description}`);
  const priceContainer = createCustomElement('div', [detailClasses.PRICES]);

  if (discountPrice) {
    productPrice.style.textDecoration = 'line-through';
    const discount = createCustomElement('p', [detailClasses.DISCOUNT], `USD ${discountPrice}`);
    priceContainer.append(discount, productPrice);
    productInfo.append(productName, priceContainer, productDescription);
  } else {
    priceContainer.append(productPrice);
    productInfo.append(productName, priceContainer, productDescription);
  }

  return productInfo;
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
    const InfoBlock = createCustomElement('div', [detailClasses.INFO_BLOCK]);
    const btnsContainer = createCustomElement('div', [detailClasses.BTNS_CONTAINER]);
    const addBtn = createCustomElement('button', [detailClasses.ADD_PRODUCT, 'button'], 'Add to cart');
    addBtn.addEventListener('click', async () => {
      if (hasCart()) {
        const id = getLocalStorage(KEY_CART) as string;
        const { version } = await new StpClientApi().getCartById(id);
        updateCart({
          id,
          version,
          centAmount: productPrice![0].value.centAmount,
          productId: product.id,
        }).then((data) => console.log(data));
      } else {
        const cart = await createCart();
        console.log('Hello');
        const { id, version } = cart;
        updateCart({
          id,
          version,
          centAmount: productPrice![0].value.centAmount,
          productId: product.id,
        });
      }
    });
    const removeBtn = createCustomElement(
      'button',
      [detailClasses.REMOVE_PRODUCT, 'button', 'disable'],
      'Remove from cart',
    );

    btnsContainer.append(addBtn, removeBtn);
    detail.append(imgBlock, InfoBlock);
    if (productPrice) {
      const basePrice = productPrice[0].value.centAmount;
      const discountPrice = productPrice[0].discounted?.value.centAmount;
      price = (basePrice / 100).toFixed(2);
      if (discountPrice) {
        const discount = (discountPrice / 100).toFixed(2);
        const productInfo = createInformBlock(productName, price, productDescription, discount);
        InfoBlock.append(productInfo, btnsContainer);
      } else {
        const productInfo = createInformBlock(productName, price, productDescription);
        InfoBlock.append(productInfo, btnsContainer);
      }
    }
    mailWrapper.append(title, detail);
  }
};
