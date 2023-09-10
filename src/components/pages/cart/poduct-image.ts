import { StpClientApi } from '../../shared/api/stpClient-api';
import { createCustomElement } from '../../shared/utilities/helper-functions';

export const productImage = async (productID: string, i: number) => {
  const client = new StpClientApi();
  const product = (await client.getProductByID(productID))?.body;
  const img = product.masterData.current.masterVariant?.images;
  const divForImg = document.querySelector(`.cart-img${i}`);
  const image = createCustomElement('img', ['image-item']) as HTMLImageElement;
  if (img) {
    image.src = img[0].url;
  }
  divForImg?.append(image);
};
