export const setLoginInLocalStorage = (key: string, value: boolean): void => {
  localStorage.setItem(key, `${value}`);
};

export const getLoginInLocalStorage = (key: string): boolean => {
  const localValue = localStorage.getItem(key);
  if (localValue) {
    const value = JSON.parse(localValue);
    return value;
  }
  return false;
};

export const removeLoginInLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
