export const isLogin = (): boolean => {
  const localValue = localStorage.getItem('token');
  if (localValue) {
    return true;
  }
  return false;
};
