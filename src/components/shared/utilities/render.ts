import { loginValidation } from '../../app/validation/login-validation';
import { changePasswordDisplay } from '../../app/validation/open-password';
import { drawFooter } from '../../pages/footer/draw-footer';
import { drawHeader } from '../../pages/header/draw-header';
import { drawLogInPage } from '../../pages/log-in/login';
import { drawMain } from '../../pages/main/draw-main';
import { authorization } from '../api/server-authorization';
import { drawRegistration } from '../../pages/registration/draw-registration';
import { drawNotFound } from '../../pages/notfound/draw-not-found';

export const render = (): void => {
  drawHeader();
  drawMain();
  drawFooter();
};

const routes = ['/', '/shop', '/about', '/contact', '/registration', '/basket', '/profile', '/login'];

export const renderChangeContent = (path: string): void => {
  for (const route in routes) {
    if (Object.values(route)) {
      drawNotFound();
    }
  }
  const renderPage = path;

  if (renderPage === '/') {
    const body = document.querySelector('body') as HTMLElement;
    body.innerHTML = '';
    render();
  }
  if (renderPage === '/shop') {
    drawNotFound();
  }
  if (renderPage === '/about') {
    drawNotFound();
  }
  if (renderPage === '/contact') {
    drawNotFound();
  }
  if (renderPage === '/registration') {
    drawRegistration();
  }
  if (renderPage === '/basket') {
    drawNotFound();
  }
  if (renderPage === '/profile') {
    drawNotFound();
  }
  if (renderPage === '/login') {
    drawLogInPage();
    loginValidation();
    authorization();
    changePasswordDisplay();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  renderChangeContent(path);
});

window.addEventListener('popstate', (event) => {
  const windowOdj = event.target as Window;
  const path = windowOdj.location.pathname;
  renderChangeContent(path);
});
