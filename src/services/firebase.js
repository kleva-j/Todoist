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
    this.projectRef = this.db.collection('projects');
    this.taskRef = this.db.collection('tasks');
    this.app = app;
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  fetchTask(successCallback, errorCallback, { uid }) {
    return () => {
      this.db
        .collection('tasks')
        .where('userId', '==', `${uid}`)
        .where('deleted', '==', false)
        .onSnapshot(successCallback, errorCallback);
    }
  }

  updateTask(successCallback, errorCallback) {
    return (taskId, id, payload) => {
      this.db
        .collection('tasks')
        .doc(`${taskId}`)
        .update(payload)
        .then(successCallback(id))
        .catch(errorCallback);
    }
  }

  fetchProjects() {
    return this.projectRef;
  }

  loginUser(successCallback, errorCallback) {
    return (authType) => {
      const providers = [
        { type: 'github', provider: new app.auth.GithubAuthProvider() },
        { type: 'twitter', provider: new app.auth.TwitterAuthProvider() },
        { type: 'facebook', provider: new app.auth.FacebookAuthProvider() },
        { type: 'google', provider: new app.auth.GoogleAuthProvider() }
      ];
      const authProvider = providers.find(item => item.type === authType);
      if (authProvider) {
        const { provider } = authProvider;
        this.auth.signInWithPopup(provider)
          .then(successCallback)
          .catch(errorCallback)
      }
    }

  }

  logoutUser(callback) {
    this.auth.signOut();
    if (callback) callback();
  }
}

export default new FirebaseApp();
