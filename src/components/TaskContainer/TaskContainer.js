import React, { useContext, useEffect } from 'react';
import { TaskContainerStyles } from '../../styles/tasks';
import { Task } from './Task';
import { SettingsContext, TaskContext, AuthContext } from '../../contexts';
import { FirebaseApp } from '../../services'

export const TaskContainer = () => {
  const { taskContainer: { task }, dispatch } = useContext(TaskContext);
  const { settings: { isRow } } = useContext(SettingsContext);
  const { currentUser: { uid } } = useContext(AuthContext);

  const smallWidth = '280px';
  const fullWidth = '600px';

  useEffect(() => {
    const fetchTasks = () => {
      FirebaseApp.db.collection('tasks').where('userId', '==', `${uid}`).onSnapshot(snapshot => {
        const collection = snapshot.docChanges();
        collection
          .filter(item => item.type === 'added')
          .forEach(item => dispatch({ type: 'ADD_TASK', payload: item.doc.data() }));
      });
    }
    fetchTasks();
  }, [dispatch]);

  return (
    <TaskContainerStyles flex_direction={isRow ? 'row' : 'column'}>
      <div className="task__container">
        {task.map(({ id, title, priority }) => (
          <Task key={id} title={title} priority={priority} width={isRow?smallWidth:fullWidth} />
        ))}
      </div>
    </TaskContainerStyles>
  );
};
