import React from 'react';

import { MainContentWrapper } from '../styles/layout';
import { TaskContainer } from './TaskContainer/TaskContainer';
import { AddTask } from './AddTask';

export const MainContent = () => {
  return (
    <MainContentWrapper>
      <div className="main">
        <AddTask />
        <TaskContainer />
      </div>
    </MainContentWrapper>
  );
};
