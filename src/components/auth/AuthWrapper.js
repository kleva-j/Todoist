import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Wrapper = ({ component: Component, redirect, isEmpty, ...rest }) => {

  return (
    <Route
      {...rest}
      render={(props) =>
        !isEmpty
          ? <Component {...props} />
          : <Redirect to={{ pathname: redirect.pathname, state: { from: props.location } }} />
      } />
  );
};

const mapStateToProps = ({ firebase: { auth: { isEmpty } } }) => ({ isEmpty });

export const AuthWrapper = connect(mapStateToProps)(Wrapper);
