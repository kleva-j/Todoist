import React from 'react';
import { render } from 'react-dom';

import { App } from './App';
import { SettingsContextProvider } from './contexts/SettingsContext';

render(
  <SettingsContextProvider>
    <App />
  </SettingsContextProvider>
, document.getElementById('root'));
