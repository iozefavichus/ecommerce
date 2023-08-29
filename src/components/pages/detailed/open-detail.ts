import { setLocalStorageValue } from '../../app/localStorage/localStorage';
import { customRoute } from '../../app/router/router';
import { StpClientApi } from '../../shared/api/stpClient-api';

let productPath: string;

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
