import { StpClientApi } from '../../shared/api/stpClient-api';

export const sortedValue = async (event: Event) => {
  const sortedEl = event.target as HTMLSelectElement;
  const value = sortedEl.options[sortedEl.selectedIndex].getAttribute('data-value');

  if (value === 'sortNameASC') {
    const product = await new StpClientApi().getProductProjections('name.en asc');
    console.log(product);
  }
  if (value === 'sortNameDESC') {
    const product = await new StpClientApi().getProductProjections('name.en desc');
    console.log(product);
  }
  if (value === 'sortPriceUp') {
    const product = await new StpClientApi().getProductProjections('price asc');
    console.log(product);
  }
  if (value === 'sortPriceDown') {
    const product = await new StpClientApi().getProductProjections('price asc');
    console.log(product);
  }
};

export const searchValue = async (event: Event) => {
  const searchEl = (event.target as HTMLInputElement).value;
  const product = await new StpClientApi().getProductSearchProjections(searchEl);
  console.log(product);
};
