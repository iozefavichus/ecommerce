import { drawFooter } from '../../pages/footer/draw-footer';
import { drawHeader } from '../../pages/header/draw-header';
import { drawLogInPage } from '../../pages/log-in/log-in';
import { drawMain } from '../../pages/main/draw-main';
// import { drawNotFound } from '../../pages/notfound/draw-not-found';

export const render = (): void => {
  // drawNotFound();
  drawHeader();
  drawMain();
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
