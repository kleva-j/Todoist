import { compose, withState } from "recompose";

import { Recent } from ".";
import { ComponentFromStreamWrapper } from "../../../Reuseables/Wrapper";

const Component = ComponentFromStreamWrapper(Recent);

export const RecentWrapper = compose(
  withState('state', 'setState', {})
)(Component);
