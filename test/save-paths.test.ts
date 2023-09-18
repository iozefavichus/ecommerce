import { getLocalStorage } from '../src/components/app/local-storage/local-storage';
import { savePathToProducts } from '../src/components/app/path-products/save-paths';

describe('Save path module', () => {
  test('This shows that the paths are saved in the local storage', () => {
    savePathToProducts();

    const paths = getLocalStorage('products path');
    expect(paths?.length !== 0).toBe(true);
  });
});
