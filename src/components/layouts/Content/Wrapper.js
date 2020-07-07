import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import { getUID } from '../../../selectors/user';

export const ProjectWrapper = (props) => {
  const { children } = props;
  const { uid } = useSelector(getUID);
  useFirestoreConnect([{
    collection: 'projects',
    where: ['members', 'array-contains', `${uid}`],
  }]);

  return <>{children}</>;
};
