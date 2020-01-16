import React, { createContext, useReducer } from 'react';
import { TaskReducer } from '../Reducers';
import { fetchFromLocalStorage } from '../helpers';

export const TaskContext = createContext();

const defaultState = {
  activeTab: 'Inbox',
  prevActiveTab: 'Inbox',
  currentFilter: 'none',
  task: fetchFromLocalStorage('task') || [],
};

export const TaskContextProvider = ({ children }) => {

  const [taskContainer, dispatch] = useReducer(TaskReducer, defaultState);

  return (
    <TaskContext.Provider value={{taskContainer, dispatch}}>
      {children}
    </TaskContext.Provider>
  );
};
