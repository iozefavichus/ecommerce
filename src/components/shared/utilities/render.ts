import { drawFooter } from '../../pages/footer/draw-footer';
import { drawHeader } from '../../pages/header/draw-header';
import { drawLogInPage } from '../../pages/log-in/log-in';
import { drawMain } from '../../pages/main/draw-main';
// import { drawRegistration } from '../../pages/registration/draw-registration';

export const render = (): void => {
  drawHeader();
  drawMain();
  // drawRegistration();
  drawFooter();
};

export const renderChangeContent = (path: string): void => {
  const renderPage = path;
  if (renderPage === '/profile') {
    console.log(renderPage);
  }
  if (renderPage === '/login') {
    drawLogInPage();
  }
};
