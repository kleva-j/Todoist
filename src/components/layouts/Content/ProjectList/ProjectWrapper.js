import { compose, withState, withHandlers } from 'recompose';

import { ProjectListContainer } from './index';
import { ComponentFromStreamWrapper } from '../../../Reuseables/Wrapper';

const Component = ComponentFromStreamWrapper(ProjectListContainer);

export const ProjectListWrapper = compose(
  withState('state', 'setState', { defaultView: 'cardview', isCardView: true }),
  withHandlers({
    handleViewClick: ({ state, setState }) => () => setState({ ...state, isCardView: !state.isCardView })
  }),
)(Component);
