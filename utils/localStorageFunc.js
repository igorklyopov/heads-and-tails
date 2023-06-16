const saveInLocalStorage = (key = '', value = null) => {
  if (typeof key !== 'string' || !value)
    return console.error(
      'typeof key mast be a string and value mast be not null'
    );

  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  if (!key || typeof key !== 'string')
    return console.error('typeof key mast be a string');

  if (localStorage) return JSON.parse(localStorage.getItem(key));
};

export { saveInLocalStorage, getFromLocalStorage };
