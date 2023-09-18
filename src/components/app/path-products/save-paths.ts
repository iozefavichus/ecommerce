import { ApiClient } from '../../shared/api/stp-client-api';
import { setLocalStorageValue } from '../local-storage/local-storage';

export const PRODUCTS_PATH = 'products path';

export const savePathToProducts = async () => {
  const products = await new ApiClient().getProducts();
  const productsKey: string[] = [];
  products.forEach((product) => {
    const { key } = product;
    if (key) {
      productsKey.push(key);
    }
    setLocalStorageValue(PRODUCTS_PATH, productsKey.join(','));
  });
};
