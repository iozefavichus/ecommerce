import { drawFooter } from '../../pages/footer/draw-footer';
import { drawHeader } from '../../pages/header/draw-header';
import { drawMain } from '../../pages/main/draw-main';

export const render = () => {
  drawHeader();
  drawMain();
  drawFooter();
};

document.addEventListener('beforeunload', render);
