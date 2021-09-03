import React, { createContext, useContext } from 'react';

export const ThemeContext = createContext(null);
export const UseThemeContext = () => useContext(ThemeContext);

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
