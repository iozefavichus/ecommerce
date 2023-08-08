import { drawHeader } from '../../pages/header/draw-header';
import { drawMain } from '../../pages/main/draw-main';

export const render = () => {
  drawHeader();
  drawMain();
};

document.addEventListener('beforeunload', render);
