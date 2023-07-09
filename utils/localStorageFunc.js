const getFromLocalStorage = (value) => {
  return localStorage.getItem(value);
};

const saveToLocalStorage = (key, value) => {
  if (typeof value != 'string') {
    localStorage.setItem(key, JSON.stringify(value));
    return;
  }

  localStorage.setItem(key, value);
};

export { getFromLocalStorage, saveToLocalStorage };