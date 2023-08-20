export const openCloseMenuToBtn = (): void => {
  const body = document.querySelector('body');
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav');

  menu?.classList.toggle('active');
  btn?.classList.toggle('open');
  body?.classList.toggle('open');
};

export const closeMenuToNav = (): void => {
  const body = document.querySelector('body');
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav');

  menu?.classList.remove('active');
  btn?.classList.remove('open');
  body?.classList.remove('open');
};
