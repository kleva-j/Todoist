import { routerMiddleware } from 'connected-react-router/immutable';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';

import { createRootReducer } from './rootReducer';
import { rootEpic } from './rootEpic';

const DevToolsProps = {
  trace: true,
  traceLimit: 25,
  shouldHotReload: false
};

const epicMiddleware = createEpicMiddleware();

const composeEnhancer =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(DevToolsProps)
    : compose

export const configureStore = (initialState = {}, history) => {
  const middlewares = [
    epicMiddleware,
    logger,
    routerMiddleware(history),
  ];

  const enhancers = composeEnhancer(
    applyMiddleware(...middlewares)
  );

  const store = createStore(createRootReducer(), initialState, enhancers);

  epicMiddleware.run(rootEpic);

  return store;
};
