import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

require('dotenv').config();

const firebaseConfig = {
  apiKey: "AIzaSyCyFvPHW4Ed4cGiwfvRTiWcPP8IhVcgsw4",
  authDomain: "dcrawler-1575237028508.firebaseapp.com",
  databaseURL: "https://dcrawler-1575237028508.firebaseio.com",
  projectId: "dcrawler-1575237028508",
  storageBucket: "dcrawler-1575237028508.appspot.com",
  messagingSenderId: "704305468060",
  appId: "1:704305468060:web:6800386a3cae6ac4869359",
  measurementId: "G-F9PGJWMKN4"
};

class FirebaseApp {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }
}

export default new FirebaseApp();
