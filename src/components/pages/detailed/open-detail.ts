import { setLocalStorageValue } from '../../app/localStorage/localStorage';
import { customRoute } from '../../app/router/router';
// import { AuthClientApi } from '../../shared/api/authClient-api';
import { StpClientApi } from '../../shared/api/stpClient-api';
// import { isLogin } from '../../shared/api/is-login';

let productPath: string;
export const PRODUCT_BODY = 'product.body';
export const PRODUCT_KEY = 'productKey';


export const openDetail = () => {
  const cards = document.querySelectorAll('.products__img');
  cards?.forEach((card) => {
    card.addEventListener('click', async (event) => {
      const targetElem = event.currentTarget as HTMLElement;
      if (targetElem.dataset.id) {
        const { id } = targetElem.dataset;
        setLocalStorageValue('productId', `${id}`);
        productPath = id;
        try {
          const response = await new StpClientApi().getProductById(id);
          const product = await response.body;
          // console.log(product);
          customRoute(productPath, product);
        } catch {
          throw Error('Product is not found');
        }
      }
    });
  });
};
