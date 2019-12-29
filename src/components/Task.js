import React, { useState } from 'react';
import { TaskItem } from '../styles/tasks';
import {
  IoIosRadioButtonOff,
  IoIosCheckmarkCircleOutline,
} from 'react-icons/io'

export const Task = ({ id, title, width, isChecked }) => {
  const [state, setState] = useState({
    isChecked: !(!isChecked)
  });

  const setChecked = () => setState({ ...state, isChecked: !state.isChecked });

  return (
    <TaskItem date-id={id} width={width} className="task__item">
      <span onClick={setChecked}>
        {!state.isChecked ? <IoIosRadioButtonOff /> : <IoIosCheckmarkCircleOutline />}
      </span>
      <h4>{title}</h4>
    </TaskItem>
  );
};
