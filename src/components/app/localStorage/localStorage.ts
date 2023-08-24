export const setLocalStorageLogin = (key: string, value: string | boolean): void => {
  localStorage.setItem(key, `${value}`);
};

export const removeLocalStorageLogin = (key: string): void => {
  localStorage.removeItem(key);
};
