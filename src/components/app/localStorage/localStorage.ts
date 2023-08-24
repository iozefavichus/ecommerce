export const setLocalStorageLogin = (key: string, value: string | boolean): void => {
  localStorage.setItem(key, `${value}`);
};

export const getLocalStorage = (key: string) => {
  const localValue = localStorage.getItem(`${key}`);

  if (localStorage) {
    return localValue;
  }
  return null;
};

export const removeLocalStorageLogin = (key: string): void => {
  localStorage.removeItem(key);
};
