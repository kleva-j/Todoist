import React from 'react';
import { Sidebar } from './Sidebar/Sidebar';
import { MainContent } from '../mainContent';
import { ContainerWrapper } from '../../styles/globalStyles';

export const Container = () => (
  <section>
    <ContainerWrapper>
      <div className="container">
        <Sidebar />
        <MainContent />
      </div>
    </ContainerWrapper>
  </section>
);
