import { StpClientApi } from '../../shared/api/stpClient-api';
import { setLocalStorageValue } from '../localStorage/localStorage';

export const PRODUCTS_PATH = 'products path';

export const savePathToProducts = async () => {
  const products = await new StpClientApi().getProducts();
  const productsKey: string[] = [];
  products.forEach((product) => {
    const { key } = product;
    if (key) {
      productsKey.push(key);
    }
    setLocalStorageValue(PRODUCTS_PATH, productsKey.join(','));
  });
};
