import { compose, withState } from 'recompose';

import { TeamsComponent } from '.';
import { ComponentFromStreamWrapper } from "../../../Reuseables/Wrapper";

const Component = ComponentFromStreamWrapper(TeamsComponent);

export const TeamsWrapper = compose(
  withState('state', 'setState', { loading: false }),
)(Component);
