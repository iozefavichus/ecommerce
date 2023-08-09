export const customRoute = (event: MouseEvent): void => {
  const linkElem = event.target as HTMLElement;
  const href = linkElem.getAttribute('href') as string;
  window.history.pushState({}, '', href);
};
