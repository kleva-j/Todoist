import { compose, withHandlers, mapProps } from 'recompose';
import { ProjectItem } from './ProjectItem';
import { ComponentFromStreamWrapper } from '../../../Reuseables/Wrapper';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { push } from 'connected-react-router';
import { selectProject, selectTasks } from '../../../../selectors/projects';

const Component = ComponentFromStreamWrapper(ProjectItem);

const getId = (_state, props) => parseInt(props.match.params.id);

const projectSelector = createSelector(
  [selectProject, getId, selectTasks],
  (projects, id, tasks) => {
    const projectItem = Object.values(projects).filter(item => +item.id === +id)[0];
    const taskItems = Object.values(tasks).filter(item => +item.project_id === +id);
    return { project: projectItem, tasks: taskItems.length >= 1 ? taskItems : null };
  },
);

const mapProjectData = (props) => {
  const { data: { project }} = props;
  const result = { ...props };
  result.data.project = {
    ...project,
    date: (new Date(project.created_on.seconds * 1000).toUTCString()),
  };
  return result;
};

const mapState = (state, props) => ({ data: projectSelector(state, props) });

const connectToStore = connect(mapState, { push });

export const ProjectItemWrapper = compose(
  connectToStore,
  mapProps(mapProjectData),

  withHandlers({
    handleBack: ({ history, push }) => () => {
      push('/project/all');
      history.push('/project/all');
    }
  }),
)(Component);
