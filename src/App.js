import React from 'react';
import { Header } from './components/layouts/Header';
import { Container } from './components/layouts/container';
import { GlobalStyle } from './styles/globalStyles';
import { IconContext } from 'react-icons';

export const App = () => (
  <div>
    <GlobalStyle />
    <IconContext.Provider value={{ style: { fontSize: '20px', verticalAlign: 'middle', cursor: 'pointer', color: '#333' } }}>
      <Header />
      <Container />
    </IconContext.Provider>
  </div>
);
