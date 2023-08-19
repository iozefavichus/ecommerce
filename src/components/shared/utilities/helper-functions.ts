export const createCustomElement = (tag: string, classNames?: string[], adjHTML?: string): HTMLElement => {
  const element = document.createElement(tag);
  if (classNames) {
    element.className = classNames?.join(' ');
  }
  element.insertAdjacentHTML('beforeend', adjHTML ?? '');
  return element;
};
