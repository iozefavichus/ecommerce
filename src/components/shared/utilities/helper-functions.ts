const disableBtn = (btn: HTMLButtonElement) => {
  btn.classList.add('disable');
  btn.disabled = true;
};

const activeBtn = (btn: HTMLButtonElement) => {
  btn.classList.remove('disable');
  btn.disabled = false;
};

const createCustomElement = (tag: string, classNames?: string[], adjHTML?: string): HTMLElement => {
  const element = document.createElement(tag);
  if (classNames) {
    element.className = classNames?.join(' ');
  }
  element.insertAdjacentHTML('beforeend', adjHTML ?? '');
  return element;
};

export { createCustomElement, disableBtn, activeBtn };
