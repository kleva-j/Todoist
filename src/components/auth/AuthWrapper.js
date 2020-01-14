import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts';

export const AuthWrapper = ({ component: Component, redirect, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        !!currentUser
          ? <Component {...props} />
          : <Redirect to={{ pathname: redirect.pathname, state: { from: props.location} }} />
      } />
  );
};
