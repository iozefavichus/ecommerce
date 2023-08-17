export const openCloseMenu = (): void => {
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav');

  menu?.classList.toggle('active');
  btn?.classList.toggle('open');
};
