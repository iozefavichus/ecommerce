import { StpClientApi } from '../../shared/api/stpClient-api';
import { drawSortCard } from './draw-catalog';

export const sortedValue = async (event: Event) => {
  const sortedEl = event.target as HTMLSelectElement;
  const value = sortedEl.options[sortedEl.selectedIndex].getAttribute('data-value');

  if (value === 'sortNameASC') {
    return await new StpClientApi().getProductProjections('name.en asc');
  }
  if (value === 'sortNameDESC') {
    return await new StpClientApi().getProductProjections('name.en desc');
  }
  if (value === 'sortPriceUp') {
    return await new StpClientApi().getProductProjections('price asc');
  }
  if (value === 'sortPriceDown') {
    return await new StpClientApi().getProductProjections('price desc');
  }
};

export const searchValue = async (event: Event) => {
  const searchEl = (event.target as HTMLInputElement).value;
  return await new StpClientApi().getProductSearchProjections(searchEl);
};

export const filterValue = async (event: Event) => {
  const filterEl = event.target as HTMLSelectElement;
  const value = filterEl.options[filterEl.selectedIndex].getAttribute('data-id');

  return await new StpClientApi().getProductFilterProjections(`categories.id: subtree("${value}")`);
};

export const filterProducts = async (event: Event) => {
  const filterName = event.target as HTMLSelectElement;
  const value = filterName.options[filterName.selectedIndex].getAttribute('data-key');

  return await new StpClientApi().getProductFilterProjections(`key:"${value}"`);
};

export const filterPriceProducts = async (minPriceDollar: string, maxPriceDollar: string) => {
  const productWrapper = document.querySelector('.product__wrapper') as HTMLElement;
  productWrapper.innerHTML = '';
  const minPriceCent = +minPriceDollar * 100;
  const maxPriceCent = +maxPriceDollar * 100;
  const products = await new StpClientApi().getProductFilterProjections(
    `variants.price.centAmount:range (${minPriceCent} to ${maxPriceCent})`,
  );
  products.forEach((product) => {
    drawSortCard(product, productWrapper);
  });
};

export const filterByColor = async (color: string) => {
  const productWrapper = document.querySelector('.product__wrapper') as HTMLElement;
  productWrapper.innerHTML = '';
  const response = await new StpClientApi().getProductByColor(`variants.attributes.color.key:"${color}"`);
  const products = response.body.results;
  products.forEach((product) => {
    drawSortCard(product, productWrapper);
  });
};
