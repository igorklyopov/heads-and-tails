const getFromLocalStorage = (value) => {
  const savedValue = localStorage?.getItem(value);
  return savedValue ?? JSON.parse(savedValue);
};

const saveToLocalStorage = (key, value) => {
  if (typeof value != 'string') {
    localStorage.setItem(key, JSON.stringify(value));
    return;
  }

  localStorage.setItem(key, value);
};

export { getFromLocalStorage, saveToLocalStorage };
