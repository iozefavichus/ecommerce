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

export const filterPriceProducts = async (event: Event) => {
  const filterPrice = event.target as HTMLInputElement;
  const price = +filterPrice.value * 100;
  return await new StpClientApi().getProductFilterProjections(`variants.price.centAmount:range (${price} to *)`);
};
