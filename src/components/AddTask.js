import React, { useState, useEffect, useContext } from 'react';
import shortId from 'short-unique-id';
import { GoPlusSmall } from 'react-icons/go';
import { FirebaseApp } from '../services';
import { AuthContext } from '../contexts';

const uid = new shortId();

export const AddTask = () => {
  const [task, setTask] = useState('');
  const { currentUser: { uid: userId } } = useContext(AuthContext);

  const handleClick = event => {
    const { target } = event;
    const list = ['editable', 'input__add__item', 'options', '.add_project', 'add_label', 'small'];
    const classList = Array.from(target.classList);
    const clickMatch = classList.find(item => list.includes(item));
    if (clickMatch) {
      document.querySelector('.options').style.height = '35px';
    } else {
      document.querySelector('.options').style.height = '0px';
    }
  };

  const addNewTask = (event) => {
    event.preventDefault();
    if (task.length>=1) {
      FirebaseApp.db.collection('tasks').add({
        userId,
        priority: { type: 3, color: 'rgb(235, 137, 9)'},
        title: task,
        id: uid.randomUUID(10),
        archived: false,
        deleted: false
      });
      document.querySelector('.editable').textContent = '';
      setTask('');
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <form className="input__add__item">

      <input placeholder="+ Add new task..." value={task} spellCheck="false" className="editable"
           onChange={({ target: { value }}) => setTask(value)} onClick={handleClick} />
      {/* <div contentEditable="true" role="textbox" tabIndex="0"
           spellCheck="false" className="editable" data-text="+ Add new task..."
           onInput={(event) => setTask(event.currentTarget.textContent)} onClick={handleClick}></div> */}

      <div className="options">
        <div>
          <span className="add_project">
            <GoPlusSmall />
            <small className="small">Project</small>
          </span>
          <span className="add_label">
            <GoPlusSmall />
            <small className="small">Label</small>
          </span>
          <span className="add_label">
            <GoPlusSmall />
            <small className="small">Priority</small>
          </span>
        </div>

        <button className="done" onClick={addNewTask}>Done</button>
      </div>
    </form>
  );
};
