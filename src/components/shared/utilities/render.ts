import { drawHeader } from '../../pages/header/draw-header';

export const render = () => {
  drawHeader();
};

document.addEventListener('beforeunload', render);
