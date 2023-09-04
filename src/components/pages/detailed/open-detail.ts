import { setLocalStorageValue } from '../../app/localStorage/localStorage';
import { customRoute } from '../../app/router/router';
import { StpClientApi } from '../../shared/api/stpClient-api';

let productPath: string;
export const PRODUCT_BODY = 'product.body';
export const PRODUCT_KEY = 'productKey';

export const openDetail = async (key: string) => {
  setLocalStorageValue(PRODUCT_KEY, `${key}`);
  productPath = key;
  try {
    const client = new StpClientApi();
    const product = (await client.getProductByKey(key))?.body;
    const productBody = JSON.stringify(product);
    setLocalStorageValue(PRODUCT_BODY, productBody);
    customRoute(productPath, product);
  } catch {
    customRoute(productPath, 'Sorry but, product is finished');
  }
};
