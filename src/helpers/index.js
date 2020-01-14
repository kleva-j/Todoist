import Firebase from 'firebase/app';

export const isLoggedIn = () => {
  return Firebase.auth().currentUser || true;
};

export const verifyLogin = () => {
  let isAuthorized;
  Firebase.auth().onAuthStateChanged(user=>isAuthorized=user)
  return isAuthorized;
};

export const fetchFromLocalStorage = key => {
  return localStorage.getItem(key);
};

export const addToLocalStorage = ({key, value}) => {
  return localStorage.setItem(key, value);
};

export const removeFromLocalStorage = key => {
  return localStorage.removeItem(key);
};
