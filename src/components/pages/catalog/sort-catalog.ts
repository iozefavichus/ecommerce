import { ProductProjection } from '@commercetools/platform-sdk';
import { StpClientApi } from '../../shared/api/stpClient-api';

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

export const searchValue = async (event: Event): Promise<ProductProjection[]> => {
  const searchEl = (event.target as HTMLInputElement).value;
  return await new StpClientApi().getProductSearchProjections(searchEl);
};