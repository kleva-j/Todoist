import React, { createContext, useContext, useReducer } from 'react';
import { SettingReducer } from '../Reducers';

const defaultState = {
  isRow: true,

  subsections: {
    'Projects': {
      hasChildren: false,
      children: [],
      length: 0,
    },
    'Labels': {
      children: []
    },
    'Filters': {
      children: ['Priority 1', 'Priority 2', 'Priority 3', 'Priority 4']
    }
  }
}

export const SettingsContext = createContext();
export const UseSettingsContext = () => useContext(SettingsContext);

export const SettingsContextProvider = (props) => {
  const [settings, dispatch] = useReducer(SettingReducer, defaultState);

  return (
    <SettingsContext.Provider value={{settings, dispatch}}>
      {props.children}
    </SettingsContext.Provider>
  );
};
