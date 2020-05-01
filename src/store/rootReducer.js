import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

export const history = createBrowserHistory();

export const createRootReducer = () => combineReducers({
  router: connectRouter(history),
  firebase: firebaseReducer,
  firestore: firestoreReducer
});
