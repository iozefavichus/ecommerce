import { drawHeader } from '../../pages/header/draw-header';
import { drawMain } from '../../pages/main/draw-main';
// import { drawRegistration } from '../../pages/registration/draw-registration';

export const render = () => {
  drawHeader();
  drawMain();
  // drawRegistration();
};

document.addEventListener('beforeunload', render);
