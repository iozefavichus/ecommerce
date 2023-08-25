import { setLocalStorageValue } from '../../app/localStorage/localStorage';
import { customRoute } from '../../app/router/router';
import { StpClientApi } from '../../shared/api/stpClient-api';

let productPath: string;
export const PRODUCT_BODY = 'product.body';
export const PRODUCT_KEY = 'productKey';

export const openDetail = () => {
  const cards = document.querySelectorAll('.products__img');
  cards?.forEach((card) => {
    card.addEventListener('click', async (event) => {
      const targetElem = event.currentTarget as HTMLElement;
      if (targetElem.dataset.key) {
        const { key } = targetElem.dataset;
        setLocalStorageValue(PRODUCT_KEY, `${key}`);
        productPath = key;
        try {
          const response = await new StpClientApi().getProductByKey(key);
          const product = await response.body;
          const productBody = JSON.stringify(product);
          setLocalStorageValue(PRODUCT_BODY, productBody);
          console.log(product);
          customRoute(productPath, product);
        } catch {
          customRoute(productPath, 'Sorry but, product is finished');
        }
      }
    });
  });
};
