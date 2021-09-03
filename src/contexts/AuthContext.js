import React, { useState, useEffect, createContext, useContext } from 'react';

import { FirebaseApp } from '../services'

export const AuthContext = createContext();
export const UseAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children, authUser: { authUser: user} }) => {
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    FirebaseApp.auth.onAuthStateChanged(setCurrentUser);
  }, [])

  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  )
};
