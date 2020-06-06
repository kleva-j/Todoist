import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Login } from './components/auth/login/wrapper';
import { NotFound } from './components/NotFound';
import { App } from './App';
import { AuthWrapper } from './components/auth/AuthWrapper';

export const AppRouting = () => {
  return (
    <BrowserRouter>
      <AnimatePresence exitBeforeEnter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <AuthWrapper component={App} redirect={{ pathname: '/login' }} path="/" />
          <Route component={NotFound} />
        </Switch>
      </AnimatePresence>
    </BrowserRouter>
  );
};
