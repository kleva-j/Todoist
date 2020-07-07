import { compose, withState, withHandlers } from "recompose";
import { Dashboard } from '.';

import { ComponentFromStreamWrapper } from "../../../Reuseables/Wrapper";

const Component = ComponentFromStreamWrapper(Dashboard);

export const DashboardWrapper = compose(
  withState("state", "setState", { loading: false, modalIsVisible: false }),
  withHandlers({
    goToProjects: ({ history }) => () => history.push('/project/all'),
  }),
)(Component);
