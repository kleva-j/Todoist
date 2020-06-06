import { compose, withState, withHandlers } from "recompose";
import { Dashboard } from '.';

import { ComponentFromStreamWrapper } from "../../../Reuseables/Wrapper";

const Component = ComponentFromStreamWrapper(Dashboard);

export const DashboardWrapper = compose(
  withState("state", "setState", { loading: false, modalIsVisible: false, modal: {} }),
  withHandlers({
    setModalVisibility: ({ state, setState }) => (value) => {
      setState({ ...state, modalIsVisible: value });
    },
    goToProjects: ({ history }) => () => history.push('/project/all')
  }),
  withHandlers({
    handleOk: ({ setModalVisibility }) => () => setModalVisibility(false),
    handleCancel: ({ setModalVisibility }) => () => setModalVisibility(false),
    toggleCreateModal: ({ setModalVisibility }) => () => setModalVisibility(true),
  }),
)(Component);
