import { compose, withState } from 'recompose';

import { SecurityComponent } from '.'
import { ComponentFromStreamWrapper } from '../../../Reuseables/Wrapper';

const Component = ComponentFromStreamWrapper(SecurityComponent);

export const SecurityWrapper = compose(
  withState('state', 'setState', {})
)(Component);
