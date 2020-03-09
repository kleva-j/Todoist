import React, { createContext } from 'react';
import { DummyProjectList } from '../dummyTasks';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  return (
    <AppContext.Provider value={{ projects: DummyProjectList }}>
      {children}
    </AppContext.Provider>
  );
};
