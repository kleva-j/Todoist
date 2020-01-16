import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoMdAdd
} from 'react-icons/io';
import { SettingsContext, AuthContext } from '../../../contexts';
import { Toastr } from '../../../services';
import { SidebarSubSections } from '../../../styles/layout';

import { FirebaseApp } from '../../../services';

export const SubSection = withRouter(({ title, history }) => {
  const [state, setState] = useState({
    isTabOpen: false,
    title,
    children: [],
  });

  const { dispatch, settings: { subsections } } = useContext(SettingsContext);
  const { currentUser } = useContext(AuthContext);

  const fetchProjects = () => {
    const title = state.title.toLowerCase();
    if (currentUser) {
      FirebaseApp.db
        .collection(title)
        .where('userId', '==', `${currentUser.uid}`)
        .get()
        .then((snapshot) => {
          const snap = snapshot.docs.map(doc => doc.data());
          const length = snap.length;
          const snapTitles = snap.map(obj => obj.title);
          dispatch({
            type: 'SET_SECTIONS',
            payload: {
              key: state.title,
              value: {
                hasChildren: length>0 && true,
                children: snapTitles,
                length,
              }
            }
          });
          setState({ ...state, children: snapTitles });
        }).catch(error => {
          Toastr.error(error.message);
        });
    }
  }

  const handleClick = () => {
    setState({ ...state, isTabOpen: !state.isTabOpen });
  }

  useEffect(() => {
    if (state.title === 'Projects' || state.title === 'Labels') {
      fetchProjects();
    }
  }, []);

  return (
    <>
      <li>
        <div>
          <span onClick={handleClick}>
            {state.isTabOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </span>
          <span className="title" onClick={handleClick}>{title}</span>
          <span><IoMdAdd /></span>
        </div>
      </li>
      <SidebarSubSections isTabOpen={state.isTabOpen}>
        {subsections[state.title].children.map((section, index) => (
          <div className="sect" key={index}>{section}</div>
        ))}
      </SidebarSubSections>
    </>
  );
});
