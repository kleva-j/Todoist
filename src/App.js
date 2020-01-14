import React from 'react';
import { IconContext } from 'react-icons';

import { Header } from './components/layouts/Header';
import { Container } from './components/layouts/container';
import { TaskContextProvider } from './contexts/TaskContext';
import { SettingsContextProvider } from './contexts/SettingsContext';

export const App = () => {

  const style = {
    fontSize: '20px',
    verticalAlign: 'middle',
    cursor: 'pointer',
    color: '#333'
  };

  return (
    <TaskContextProvider>
      <SettingsContextProvider>
        <IconContext.Provider value={{ style }}>
          <Header />
          <Container />
        </IconContext.Provider>
      </SettingsContextProvider>
    </TaskContextProvider>
  );
};
