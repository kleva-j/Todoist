import React, { useContext, useEffect } from 'react';
import { TaskContainerStyles } from '../../styles/tasks';
import { Task } from './Task';
import { SettingsContext, TaskContext, AuthContext } from '../../contexts';
import { FirebaseApp, Toastr } from '../../services';

export const TaskContainer = () => {
  const { taskContainer: { task }, dispatch } = useContext(TaskContext);
  const { settings: { isRow } } = useContext(SettingsContext);
  const { currentUser: { uid } } = useContext(AuthContext);

  const deleteTask = FirebaseApp.updateTask(
    (id) => () => dispatch({ type: 'DELETE_TASK', payload: { taskId: id } }),
    _ => Toastr.error('Failed to delete task')
  );

  const handleFetch = (snapshot) => {
    const collection = snapshot.docChanges();
    collection
      .filter(item => item.type === 'added' || item.type === 'modified')
      .forEach(item => dispatch({
        type: 'ADD_TASK',
        payload: { ...(item.doc.data()), taskId: item.doc.id } 
      }));
  }

  const fetchTaskFunc = FirebaseApp.fetchTask(
    handleFetch,
    _ => Toastr.error('Error occured while fetching your tasks.'),
    { uid }
  );


  useEffect(() => {
    fetchTaskFunc();
  }, []);

  return (
    <TaskContainerStyles flex_direction={isRow ? 'row' : 'column'}>
      <div className="task__container">
        {task.map(({ taskId, id, title, priority }) => (
          <Task taskId={taskId} key={id} id={id} title={title} priority={priority} isRow={isRow} deleteTask={deleteTask} />
        ))}
      </div>
    </TaskContainerStyles>
  );
};
