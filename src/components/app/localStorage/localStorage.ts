export const setLocalStorageValue = (key: string, value: string): void => {
  localStorage.setItem(key, `${value}`);
};

export const getLocalStorage = (key: string) => {
  const localValue = localStorage.getItem(`${key}`);

  if (localStorage) {
    return localValue;
  }
  return null;
};

export const removeLocalStorageValue = (key: string): void => {
  localStorage.removeItem(key);
};
