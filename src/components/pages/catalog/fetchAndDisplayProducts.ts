import { ApiClient } from '../../shared/api/stp-client-api';
import { drawSortCard } from './draw-catalog';

const apiClient = new ApiClient();

const fetchAndDisplayProducts = async (pageNumber: number, itemsPerPage: number) => {
  const productWrapper = document.querySelector('.product__wrapper') as HTMLElement;

  const btnPagination = document.querySelector('.navigation__btn-active') as HTMLButtonElement;
  const btnPaginationPrev = document.querySelector('.navigation__btn-prev') as HTMLButtonElement;
  const btnPaginationNext = document.querySelector('.navigation__btn-next') as HTMLButtonElement;

  const offset = (pageNumber - 1) * itemsPerPage;

  const products = await new ApiClient().getProductsFromCatalog(itemsPerPage, offset);

  const minPage = 1;

  productWrapper.innerHTML = '';

  products.forEach((product) => {
    drawSortCard(product, productWrapper);
  });

  const totalProducts: number = (await apiClient.getTotalNumberOfProducts()) as number;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  if (btnPagination) {
    btnPagination.textContent = `${pageNumber}`;
  }

  if (btnPaginationPrev) {
    if (pageNumber <= minPage) {
      btnPaginationPrev.setAttribute('disabled', '');
      btnPaginationPrev.classList.add('disabled');
    } else {
      btnPaginationPrev.removeAttribute('disabled');
      btnPaginationPrev.classList.remove('disabled');
    }
  }

  if (btnPaginationNext) {
    if (pageNumber >= totalPages) {
      btnPaginationNext.setAttribute('disabled', '');
      btnPaginationNext.classList.add('disabled');
    } else {
      btnPaginationNext.removeAttribute('disabled');
      btnPaginationNext.classList.remove('disabled');
    }
  }
};

export default fetchAndDisplayProducts;
