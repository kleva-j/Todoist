export const loadState = (state={}) => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return state;
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(err);
  }
};

export const saveToLocalStorage = (key, value) => localStorage.setItem(key, value);

export const getToken = () => localStorage.getItem('fcmToken');

export const clearStorage = () => localStorage.clear();
