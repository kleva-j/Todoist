import Firebase from 'firebase/app';
import shortId from 'short-unique-id';

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

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const generateUniqueId = (length=13, config={}) => {
  const uid = new shortId(config);
  return uid.randomUUID(length);
};

export const isEmpty = (obj) => {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
};
