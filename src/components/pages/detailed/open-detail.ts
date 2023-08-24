import { customRoute } from '../../app/router/router';
import { StpClientApi } from '../../shared/api/stpClient-api';

const DETAIL_PATH = '/detail';

export const openDetail = () => {
  const cards = document.querySelectorAll('.products__img');
  cards?.forEach((card) => {
    card.addEventListener('click', async (event) => {
      const targetElem = event.currentTarget as HTMLElement;
      if (targetElem.dataset.id) {
        const { id } = targetElem.dataset;
        try {
          const response = await new StpClientApi().getProductById(id);
          const product = await response.body;
          console.log(product);
          customRoute(DETAIL_PATH, product);
        } catch {
          throw Error('Product error');
        }
      }
    });
  });
};
