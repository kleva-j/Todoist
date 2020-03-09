import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

import { projectReducer } from './reducers';

export const history = createBrowserHistory();

export const createRootReducer = () => combineReducers({
  router: connectRouter(history),
  project: projectReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});
