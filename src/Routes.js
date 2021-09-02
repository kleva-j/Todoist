import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthWrapper } from './components/auth/AuthWrapper';
import { Login } from './components/auth/login/wrapper';
import { NotFound } from './components/NotFound';
import { App } from './App';

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
