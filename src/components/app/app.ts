import { savePathToProducts } from './path-products/save-paths';
import { routing } from './router/router';

export const app = (): void => {
  routing();
  savePathToProducts();
};
