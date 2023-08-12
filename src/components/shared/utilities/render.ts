import { loginValidation } from '../../app/validation/login-validation';
import { changePasswordDisplay } from '../../app/validation/open-password';
import { drawFooter } from '../../pages/footer/draw-footer';
import { drawHeader } from '../../pages/header/draw-header';
import { drawLogInPage } from '../../pages/log-in/log-in';
import { drawMain } from '../../pages/main/draw-main';
import { authorization } from '../api/server-authorization';

export const render = (): void => {
  drawHeader();
  drawMain();
  drawFooter();
};

export const renderChangeContent = (path: string): void => {
  const renderPage = path;
  if (renderPage === '/') {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.innerHTML = '';
    render();
  }
  if (renderPage === '/shope') {
    console.log(renderPage);
  }
  if (renderPage === '/about') {
    console.log(renderPage);
  }
  if (renderPage === '/contact') {
    console.log(renderPage);
  }
  if (renderPage === '/registration') {
    console.log(renderPage);
  }
  if (renderPage === '/basket') {
    console.log(renderPage);
  }
  if (renderPage === '/profile') {
    console.log(renderPage);
  }
  if (renderPage === '/login') {
    drawLogInPage();
    loginValidation();
    authorization();
    changePasswordDisplay();
  }
};

window.addEventListener('popstate', (event) => {
  const windowOdj = event.target as Window;
  const path = windowOdj.location.pathname;
  renderChangeContent(path);
});
