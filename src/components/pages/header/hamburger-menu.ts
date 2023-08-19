const body = document.querySelector('body');
const btn = document.querySelector('.hamburger');
const menu = document.querySelector('.nav');

export const openCloseMenuToBtn = (): void => {
  menu?.classList.toggle('active');
  btn?.classList.toggle('open');
  body?.classList.toggle('open');
};

export const closeMenuToNav = (): void => {
  menu?.classList.remove('active');
  btn?.classList.remove('open');
  body?.classList.remove('open');
};
