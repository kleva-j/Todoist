import firebase from 'firebase/app';
import 'firebase/firestore';
require('dotenv').config();

const {
  apiKey, authDomain, databaseURL, projectId,
  storageBucket, messagingSenderId, appId, 
} = process.env;

const config = {
  apiKey, authDomain, databaseURL, appId,
  storageBucket, messagingSenderId, projectId
};

class FirebaseApp {

  constructor() {
    firebase.initializeApp(config);
  }

}

export { FirebaseApp as Firebase };
