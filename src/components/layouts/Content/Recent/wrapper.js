import { Recent } from ".";
import { ComponentFromStreamWrapper } from "../../../Reuseables/Wrapper";
import { compose, withState } from "recompose";

const Component = ComponentFromStreamWrapper(Recent);

export const RecentWrapper = compose(
  withState('state', 'setState', {})
)(Component);
