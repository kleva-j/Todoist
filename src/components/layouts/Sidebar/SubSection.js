import React, { useState} from 'react';
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoMdAdd
} from 'react-icons/io';

export const SubSection = ({ title }) => {
  const [state, setState] = useState({
    isTabOpen: false
  });

  const handleClick = () => {
    setState({ ...state, isTabOpen: !state.isTabOpen });
  }

  return (
    <li onClick={handleClick}>
      <span>
        {state.isTabOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
      </span>
      <span>{title}</span>
      <span><IoMdAdd /></span>
    </li>
  );
};
