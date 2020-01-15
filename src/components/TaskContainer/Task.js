import React, { useState } from 'react';
import { TaskItem } from '../../styles/tasks';
import {
  IoIosRadioButtonOff,
  IoIosCheckmarkCircle,
} from 'react-icons/io';
import { IconContext } from 'react-icons';

export const Task = ({ id, title, width, isChecked, priority }) => {
  const [state, setState] = useState({
    isChecked: !(!isChecked)
  });

  const style = {
    color: priority.color,
    fontSize: '24px',
    cursor: 'pointer',
    border: `1px solid ${priority.color}`,
    borderRadius: '50%'
  }

  const setChecked = () => setState({ ...state, isChecked: !state.isChecked });

  return (
    <TaskItem date-id={id} width={width} className="task__item">
      <IconContext.Provider value={{style}}>
        <span onClick={setChecked}>
          {!state.isChecked ? <IoIosRadioButtonOff /> : <IoIosCheckmarkCircle />}
        </span>
      </IconContext.Provider>
      <h4>{title}</h4>
    </TaskItem>
  );
};
