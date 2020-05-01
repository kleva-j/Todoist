import { Dashboard } from ".";
import { ComponentFromStreamWrapper } from "../../../Reuseables/Wrapper";
import { compose, withState } from "recompose";

const Component = ComponentFromStreamWrapper(Dashboard);

export const DashboardWrapper = compose(
  withState('state', 'setState', {})
)(Component);
