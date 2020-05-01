import React from 'react';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { getUID } from '../../../selectors/user';

export const ProjectWrapper = ({ children }) => {
  const uid = useSelector(getUID);
  
  useFirestoreConnect([{
    collection: 'projects',
    where: ['creator_id', '==', `${uid}`]
  }]);

  useFirestoreConnect([{
    collection: 'tasks',
    where: ['creator_id', '==', `${uid}`]
  }]);

  return <>{children}</>;
};
