import { StpClientApi } from '../../shared/api/stpClient-api';

export const sortedValue = async (event: Event) => {
  const sortedEl = event.target as HTMLSelectElement;
  const value = sortedEl.options[sortedEl.selectedIndex].getAttribute('data-value');

  if (value === 'sortNameASC') {
    const response = await new StpClientApi().getProductProjections('name.en asc');
    const product = response;
    console.log(product);
  }
  if (value === 'sortNameDESC') {
    const response = await new StpClientApi().getProductProjections('name.en desc');
    const product = response;
    console.log(product);
  }
  if (value === 'sortPriceUp') {
    const response = await new StpClientApi().getProductProjections('price asc');
    const product = response;
    console.log(product);
  }
  if (value === 'sortPriceDown') {
    const response = await new StpClientApi().getProductProjections('price asc');
    const product = response;
    console.log(product);
  }
};
