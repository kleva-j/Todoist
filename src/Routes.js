import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login } from './components/auth/login';
import { NotFound } from './components/NotFound';
import { App } from './App';
import { GlobalStyle } from './styles/globalStyles';
import { AuthWrapper } from './components/auth/AuthWrapper';
import { AuthContextProvider } from './contexts/AuthContext';

export const AppRouting = (authUser) => {
  return (
    <AuthContextProvider authUser={authUser}>
      <BrowserRouter>
        <GlobalStyle />
        <Switch>
          <AuthWrapper component={App} redirect={{ pathname: '/login' }} exact path="/" />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  );
};
