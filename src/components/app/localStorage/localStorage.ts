export const setLocalStorageLogin = (key: string, value: boolean): void => {
  localStorage.setItem(key, `${value}`);
};

export const getLocalStorageLogin = (key: string): boolean => {
  const localValue = localStorage.getItem(key);
  if (localValue) {
    const value: boolean = JSON.parse(localValue);
    return value;
  }
  return false;
};

export const removeLocalStorageLogin = (key: string): void => {
  localStorage.removeItem(key);
};
