import { Product } from '@commercetools/platform-sdk';
import { drawFooter } from '../../pages/footer/draw-footer';
import { drawHeader, links } from '../../pages/header/header';
import { drawLogInPage } from '../../pages/log-in/draw-login';
import { drawMain } from '../../pages/main/draw-main';
import { authorization } from '../api/server-authorization';
import { drawRegistration } from '../../pages/registration/draw-registration';
import { drawSuccess } from '../../pages/registration/success';
import { drawNotFound } from '../../pages/notfound/draw-not-found';
import { customRoute } from '../../app/router/router';
import { drawProfile } from '../../pages/profile/draw-profile';
import { drawCatalog } from '../../pages/catalog/draw-catalog';
import { PRODUCT_BODY, PRODUCT_KEY } from '../../pages/detailed/open-detail';
import { drawDetail } from '../../pages/detailed/draw-detail';
import { getLocalStorage } from '../../app/localStorage/localStorage';
import { isLogin } from '../api/is-login';
import { drawChangePassword } from '../../pages/profile/change-password';
import { drawSuccessPassword } from '../../pages/profile/successpassword';
import { drawSuccessUpdate } from '../../pages/profile/successupdate';

export const render = (isLogin: boolean): void => {
  drawHeader(isLogin);
  drawMain();
  drawFooter();
};

const routes = [
  '/',
  '/catalog',
  '/about',
  '/contact',
  '/registration',
  '/cart',
  '/profile',
  '/login',
  '/changepassword',
  '/successchangedpass',
  '/successupdate',
];

export const renderChangeContent = (path: string, product?: Product | string): void => {
  const renderPage = path;
  const isRouteLink = routes.find((link) => link === renderPage);

  if (!isRouteLink && !product) {
    drawNotFound();
  }

  if (renderPage === links.HOME) {
    const body = document.querySelector('body') as HTMLElement;
    body.innerHTML = '';
    render(isLogin());
  }
  if (renderPage === '/catalog') {
    drawCatalog();
  }
  if (renderPage === '/about') {
    drawNotFound();
  }
  if (renderPage === '/contact') {
    drawNotFound();
  }
  if (renderPage === '/changepassword') {
    drawChangePassword();
  }
  if (renderPage === '/registration') {
    if (isLogin()) {
      customRoute(links.HOME);
    } else {
      drawRegistration();
    }
  }
  if (renderPage === '/cart') {
    drawNotFound();
  }
  if (renderPage === '/profile') {
    drawProfile();
  }
  if (renderPage === '/success') {
    drawSuccess();
    setTimeout(() => {
      customRoute(links.HOME);
    }, 1500);
  }
  if (renderPage === '/successchangedpass') {
    drawSuccessPassword();
    setTimeout(() => {
      customRoute(links.HOME);
    }, 1500);
  }
  if (renderPage === '/successupdate') {
    drawSuccessUpdate();
    setTimeout(() => {
      customRoute('/profile');
    }, 1500);
  }
  if (renderPage === '/login') {
    if (isLogin()) {
      customRoute(links.HOME);
    } else {
      drawLogInPage();
      authorization();
    }
  }
  if (product) {
    drawDetail(product);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const clearPath = path.replace(/\//, '');
  const productPath = getLocalStorage(PRODUCT_KEY);
  const productInLocalStorage = getLocalStorage(PRODUCT_BODY);

  if (clearPath === productPath && productInLocalStorage) {
    customRoute(productPath, JSON.parse(productInLocalStorage));
  } else {
    renderChangeContent(path);
  }
});

window.addEventListener('popstate', (event) => {
  const windowOdj = event.target as Window;
  const path = windowOdj.location.pathname;
  const clearPath = path.replace(/\//, '');
  const productPath = getLocalStorage(PRODUCT_KEY);
  const productInLocalStorage = getLocalStorage(PRODUCT_BODY);

  if (clearPath === productPath && productInLocalStorage) {
    customRoute(path, JSON.parse(productInLocalStorage));
  } else {
    renderChangeContent(path);
  }
});
