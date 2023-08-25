import { Product } from '@commercetools/platform-sdk';
import { drawFooter } from '../../pages/footer/draw-footer';
import { drawHeader, links } from '../../pages/header/header';
import { drawLogInPage } from '../../pages/log-in/draw-login';
import { drawMain } from '../../pages/main/draw-main';
import { authorization, isLoginCustomer } from '../api/server-authorization';
import { drawRegistration } from '../../pages/registration/draw-registration';
import { drawSuccess } from '../../pages/registration/success';
import { drawNotFound } from '../../pages/notfound/draw-not-found';
import { logoutCustomer } from '../../pages/log-in/log-out';
import { customRoute } from '../../app/router/router';
import { drawProfile } from '../../pages/profile/draw-profile';
import { drawCatalog } from '../../pages/catalog/draw-catalog';
import { openDetail } from '../../pages/detailed/open-detail';
import { drawDetail } from '../../pages/detailed/draw-detail';
import { getLocalStorage, removeLocalStorageValue } from '../../app/localStorage/localStorage';
import { StpClientApi } from '../api/stpClient-api';

const PRODUCT_ID_KEY = 'productId';


export const render = (isLogin: boolean): void => {
  drawHeader(isLogin);
  drawMain();
  drawFooter();
  openDetail();
};

const routes = ['/', '/catalog', '/about', '/contact', '/registration', '/cart', '/profile', '/login'];

export const renderChangeContent = (path: string, product?: Product): void => {
  const renderPage = path;
  const isRouteLink = routes.find((link) => link === renderPage);

  if (isRouteLink) {
    removeLocalStorageValue(PRODUCT_ID_KEY);
  }

  for (const route in routes) {
    if (Object.values(route)) {
      drawNotFound();
    }
  }

  if (renderPage === links.HOME) {
    const body = document.querySelector('body') as HTMLElement;
    body.innerHTML = '';
    render(isLoginCustomer.isLogin);
    logoutCustomer();
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
  if (renderPage === '/registration') {
    if (isLoginCustomer.isLogin) {
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
  if (renderPage === '/login') {
    if (isLoginCustomer.isLogin) {
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

  const productPath = getLocalStorage(PRODUCT_ID_KEY);
  if (productPath) {
    new StpClientApi().getProductById(productPath).then((productData) => {
      customRoute(productPath, productData.body);
    });
  } else {
    renderChangeContent(path);
  }
});

window.addEventListener('popstate', (event) => {
  const windowOdj = event.target as Window;
  const path = windowOdj.location.pathname;
  renderChangeContent(path);
});
