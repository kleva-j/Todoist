import React, { createContext } from 'react';

export const ThemeContext = createContext(null);

export const ThemeContextProvider = (props) => {
  const theme = {
    dark: {},
    light: {},
    isLightTheme: true,
  };

  const changeTheme = () => !theme.isLightTheme

  return (
    <ThemeContext.Provider value={{ ...theme, changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
