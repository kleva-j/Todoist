import React from 'react';
import { render } from 'react-dom';
import { AppRouting } from './Routes';
import { FirebaseApp } from './services';

FirebaseApp.auth.onAuthStateChanged(user =>
  render(<AppRouting authUser={user} /> , document.getElementById('root'))
);
