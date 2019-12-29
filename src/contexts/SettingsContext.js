import React, { useState, createContext } from 'react';

const defaultState = {
  isRow: true,
}

export const SettingsContext = createContext(defaultState);

export const SettingsContextProvider = (props) => {
  const [state, setState] = useState(defaultState);

  const setRow = () => setState({ ...state, isRow: !state.isRow })

  return (
    <SettingsContext.Provider value={{...state, setRow }}>
      {props.children}
    </SettingsContext.Provider>
  );
};
