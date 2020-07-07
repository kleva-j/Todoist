import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { push } from 'connected-react-router';
import { useFirestoreConnect } from 'react-redux-firebase';
import { compose, withHandlers, mapProps } from 'recompose';

import { ProjectItem } from './ProjectItem';
import { ComponentFromStreamWrapper } from '../../../Reuseables/Wrapper';
import { selectProject, selectTasks } from '../../../../selectors/projects';

const getId = (_, { id }) => id;

const projectSelector = createSelector(
  [selectProject, getId, selectTasks],
  (project, id, tasks) => {
    const projectItem = Object.values(project || {}).filter(item => item.id === id)[0];
    const taskItems = Object.entries(tasks || {}).map(([uid, data]) => ({ uid, ...data }));
    return { project: projectItem, tasks: taskItems.length >= 1 ? taskItems : null };
  },
);

const mapStateToProps = (state, props) => ({ ...projectSelector(state, props) });

const connectToStore = connect(mapStateToProps, { push });

export const ProjectItemWrapper = compose(
  mapProps((props) => {
    const { match: { params: { id }}} = props;
    useFirestoreConnect([{
      collection: 'tasks',
      where: ['project_id', '==', `${id}`]
    }]);
    return ({ ...props, id })
  }),
  connectToStore,
  withHandlers({
    handleBack: ({ history, push }) => () => {
      push('/project/all');
      history.push('/project/all');
    }
  }),
)(ComponentFromStreamWrapper((props) => (<ProjectItem {...props} />)))
