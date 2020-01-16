import React, { useState, useRef } from 'react';
import { TaskItem } from '../../styles/tasks';
import {
  IoIosRadioButtonOff,
  IoIosCheckmarkCircle,
} from 'react-icons/io';
import { IconContext } from 'react-icons';
import { MdDelete } from 'react-icons/md';
import { FiMoreVertical } from 'react-icons/fi';
import { DeleteModal } from '../Modals/DeleteModal';

export const Task = (props) => {
  const { taskId, id, title, isChecked, priority, isRow, deleteTask } = props; 

  const [state, setState] = useState({
    isChecked: !(!isChecked),
  });

  const childRef = useRef();

  const style = {
    color: priority.color,
    fontSize: '24px',
    cursor: 'pointer',
    border: `1px solid ${priority.color}`,  
    borderRadius: '50%'
  }

  return (
    <TaskItem date-id={id} isRow={isRow} className="task__item">
      <IconContext.Provider value={{style}}>
        <span onClick={() => setState({ ...state, isChecked: !state.isChecked })}>
          {!state.isChecked ? <IoIosRadioButtonOff /> : <IoIosCheckmarkCircle />}
        </span>
      </IconContext.Provider>
      <h4 className="title">{title}</h4>
      <span className="delete__item">
        <IconContext.Provider value={{ className: !isRow ? 'delete__button' : 'more__options' }}>
          {
            !isRow ?
            <MdDelete title="Delete task" onClick={() => deleteTask(taskId, id, { deleted: true })} />  :
            <FiMoreVertical title="more options" onClick={() => childRef.current.focus()} />
          }
        </IconContext.Provider>
        <DeleteModal ref={childRef} id={id} taskId={taskId} deleteTask={deleteTask} />
      </span>
    </TaskItem>
  );
};
