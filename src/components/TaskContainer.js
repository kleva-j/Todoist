import React, { useContext } from 'react';
import { TaskContainerStyles } from '../styles/tasks';
import { tasks } from '../dummyTasks';
import { Task } from './Task';
import { SettingsContext } from '../contexts'

export const TaskContainer = () => {

  const { isRow } = useContext(SettingsContext);

  const smallWidth = '280px';
  const fullWidth = '600px';

  return (
    <TaskContainerStyles flex_direction={isRow ? 'row' : 'column'}>
      <div className="task__container">
        {tasks.map(({ id, title, timestamp }) => (
          <Task key={id} title={title} timestamp={timestamp} width={isRow?smallWidth:fullWidth} />
        ))}
      </div>
    </TaskContainerStyles>
  );
};
