const getFromLocalStorage = (value) => {
  return localStorage.getItem(JSON.parse(value));
};

const saveToLocalStorage = (key, value) => {
  if (typeof value != 'string') {
    localStorage.setItem(key, JSON.stringify(value));
    return;
  }

  localStorage.setItem(key, value);
};

export { getFromLocalStorage, saveToLocalStorage };
