import './index.less';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import { AppRouting } from './Routes';
import { history } from './store/rootReducer';
import { configureStore } from './store';
import { loadState, saveState } from './services/localstorage';
import { FirebaseApp } from './services';
import { createFirestoreInstance } from 'redux-firestore';

const persistedState = loadState();

const store = configureStore(persistedState, history);

store.subscribe(() => saveState(store.getState()));

const rootNode = document.getElementById('root');

const rrfProps = {
  firebase: FirebaseApp.app,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ReactReduxFirebaseProvider { ...rrfProps }>
        <AppRouting />
      </ReactReduxFirebaseProvider>
    </ConnectedRouter>
  </Provider>
  , rootNode
)
