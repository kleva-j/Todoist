import React from 'react';
import { MainContentWrapper } from '../styles/layout';
import { TaskContainer } from './TaskContainer';

export const MainContent = () => {
  return (
    <MainContentWrapper>    
      <div className="main">
        <input type="text" className="input__add__item" placeholder="+ Add new task" />
        <TaskContainer />
      </div>
    </MainContentWrapper>
  );
};
