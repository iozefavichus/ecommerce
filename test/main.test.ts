import * as main from '../src/components/pages/main/draw-main';

describe('It create main', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('It should create main with the coreect structure', () => {
    main.drawMain();
    const mainEl = document.querySelector('main');
    expect(mainEl).not.toBeNull();
  });
});
