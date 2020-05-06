import React from 'react';
import { useSelector } from 'react-redux';

import { getUser, getProfile } from '../selectors/user'

export const UserContext = React.createContext();

const { Provider, Consumer } = UserContext;

export const UserContextConsumer = Consumer;

export const UserProvider = ({ children }) => {
  const {
    providerData,
    email, emailVerified, phoneNumber,
    lastLoginAt, createdAt, uid, photoURL,
  } = useSelector(getUser);

  const { name, bio, gender } = useSelector(getProfile);
  const lastLogin = new Date(+lastLoginAt).toUTCString();
  const createdOn = new Date(+createdAt).toUTCString();
  const user = {
    email, isVerified: emailVerified, name, bio,
    lastLogin, createdOn, id: uid, phoneNumber, gender,
    pic: photoURL, provider: providerData[0].providerId,
  };

  return (
    <Provider value={{ user }}>
      {children}
    </Provider>
  );
};
