import { createPageTitle } from '../../shared/utilities/title';

const drawCartPage = () => {
  const mailWrapper = document.querySelector('.main__wrapper') as HTMLElement;
  mailWrapper.innerHTML = '';
  const title = createPageTitle('Cart');

  mailWrapper.append(title);
};

export { drawCartPage };
